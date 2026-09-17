// Temporary dev-only preview capture helper (not part of the app bundle).
// Launches headless Edge, waits in REAL time (not virtual time), reports
// console errors / failed network requests, then screenshots the page.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const url = process.argv[2] ?? 'http://localhost:3000/';
const outFile = process.argv[3] ?? 'preview.png';
const waitMs = Number(process.argv[4] ?? 15000);
const width = Number(process.argv[5] ?? 1440);
const height = Number(process.argv[6] ?? 1000);
const port = 9400 + Math.floor(Math.random() * 300);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-cdp-'));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const child = spawn(
  EDGE,
  [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--no-first-run',
    '--hide-scrollbars',
    `--window-size=${width},${height}`,
    `--user-data-dir=${profile}`,
    'about:blank',
  ],
  { stdio: 'ignore' },
);

async function waitForDevtools() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (r.ok) return;
    } catch {
      /* not ready yet */
    }
    await sleep(250);
  }
  throw new Error('DevTools endpoint never became ready');
}

await waitForDevtools();

const target = await (
  await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })
).json();

const ws = new WebSocket(target.webSocketDebuggerUrl);
const pending = new Map();
let nextId = 1;
const consoleMsgs = [];
const exceptions = [];
const failedRequests = [];

await new Promise((res, rej) => {
  ws.addEventListener('open', res, { once: true });
  ws.addEventListener('error', rej, { once: true });
});

ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
    return;
  }
  if (msg.method === 'Runtime.consoleAPICalled') {
    consoleMsgs.push(
      `${msg.params.type}: ` +
        msg.params.args
          .map((a) => a.value ?? a.description ?? a.type)
          .join(' ')
          .slice(0, 300),
    );
  }
  if (msg.method === 'Runtime.exceptionThrown') {
    const d = msg.params.exceptionDetails;
    exceptions.push((d.exception?.description ?? d.text ?? '').slice(0, 400));
  }
  if (msg.method === 'Network.loadingFailed') {
    failedRequests.push(`${msg.params.errorText}${msg.params.canceled ? ' (canceled)' : ''}`);
  }
});

function send(method, params = {}) {
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        reject(new Error(`timeout: ${method}`));
      }
    }, 45000);
  });
}

async function evaluate(expression) {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return r.result?.value;
}

await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');
await send('Network.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width,
  height,
  deviceScaleFactor: 1,
  mobile: width < 600,
});

await send('Page.navigate', { url });

// Poll in real time until the splash disappears or the budget runs out.
const splashText = 'Verifying secure session';
let innerText = '';
const started = Date.now();
while (Date.now() - started < waitMs) {
  await sleep(1000);
  innerText = (await evaluate('(document.getElementById("root")||document.body).innerText || ""')) ?? '';
  if (innerText && !innerText.includes(splashText)) break;
}

const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
fs.writeFileSync(outFile, Buffer.from(shot.data, 'base64'));

console.log('URL:', url);
console.log('root.innerText (first 600 chars):');
console.log(innerText.slice(0, 600));
console.log('--- still_on_splash:', innerText.includes(splashText));
console.log('--- console messages:', consoleMsgs.length ? consoleMsgs.slice(0, 15) : 'none');
console.log('--- exceptions:', exceptions.length ? exceptions.slice(0, 10) : 'none');
console.log(
  '--- failed requests:',
  failedRequests.length ? [...new Set(failedRequests)].slice(0, 12) : 'none',
);
console.log('screenshot:', outFile, fs.existsSync(outFile) ? fs.statSync(outFile).size + ' bytes' : 'MISSING');

ws.close();
child.kill();
process.exit(0);
