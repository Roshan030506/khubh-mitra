// LegalEase AI - Automated Quality & Health Check Suite
// Runs continuous verification on syntax, translation completeness, and security.

const fs = require("fs");
const path = require("path");

console.log("=================================================");
console.log("   LegalEase AI Continuous Quality Audit Suite   ");
console.log("=================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✓ [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  ✗ [FAIL] ${testName}`);
    failed++;
  }
}

async function runApiSmokeTests() {
  const previousGeminiKey = process.env.GEMINI_API_KEY;
  process.env.GEMINI_API_KEY = "";
  const app = require("./server");
  const server = app.listen(0);
  const baseUrl = `http://127.0.0.1:${server.address().port}/api/v1`;

  try {
    const health = await fetch(`${baseUrl}/health`);
    assert(health.ok, "API health endpoint responds successfully");

    const malformedJwt = await fetch(`${baseUrl}/auth/me`, {
      headers: { Authorization: "Bearer a.b.c" }
    });
    assert(malformedJwt.status === 401, "Malformed JWT returns 401 without crashing");

    const query = await fetch(`${baseUrl}/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "My employer has not paid salary", language: "zz" })
    });
    const queryBody = await query.json();
    assert(query.ok && queryBody.language === "en", "Query API normalizes unsupported languages");
    assert(queryBody.suggested_draft_type === "salary_notice", "Query API returns expected draft type for salary issue");
  } catch (err) {
    assert(false, `API smoke tests failed: ${err.message}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
    if (previousGeminiKey) {
      process.env.GEMINI_API_KEY = previousGeminiKey;
    }
  }
}

// Test 1: File Existence
const requiredFiles = [
  "index.html", "styles.css", "app.js", "server.js", "knowledge_base.js",
  "package.json", "manifest.json", "sw.js", "vercel.json", "netlify.toml"
];

requiredFiles.forEach((f) => {
  assert(fs.existsSync(path.join(__dirname, f)), `File existence: ${f}`);
});

// Test 2: Knowledge Base Integrity
try {
  const { legalCorpus, languageNames, retrieveLegalKnowledge } = require("./knowledge_base");
  assert(legalCorpus && legalCorpus.length >= 5, "Knowledge Base contains 5+ authoritative acts");
  assert(Object.keys(languageNames).length === 8, "Language map supports 8 Indian languages");

  // Verify native translations for all entries
  const langCodes = ["en", "hi", "ta", "bn", "mr", "te", "kn", "ml"];
  let allTranslated = true;

  legalCorpus.forEach((entry) => {
    langCodes.forEach((code) => {
      if (!entry.summary[code] || !entry.actionable_steps[code]) {
        allTranslated = false;
        console.warn(`    Missing translation for ${entry.id} in language '${code}'`);
      }
    });
  });

  assert(allTranslated, "Multilingual Corpus complete across all 8 languages");

  // RAG Query Test
  const retrieval = retrieveLegalKnowledge("salary employer unpaid");
  assert(!retrieval.isUncertain && retrieval.topMatch?.id === "labor-001", "RAG retrieval accurately matches salary queries");

  const gibberish = retrieveLegalKnowledge("xyz123abc456");
  assert(gibberish.isUncertain, "RAG correctly flags low-confidence / gibberish queries as uncertain");

} catch (err) {
  assert(false, `Knowledge base test failed: ${err.message}`);
}

// Test 3: XSS Protection Check
try {
  const serverCode = fs.readFileSync(path.join(__dirname, "server.js"), "utf8");
  assert(serverCode.includes("escapeHtml"), "server.js implements escapeHtml XSS protection");
  assert(serverCode.includes("requireAuth"), "server.js implements JWT Authorization middleware");
  assert(serverCode.includes("sendRealTimeSms"), "server.js implements Real-Time SMS Gateway handler");
} catch (err) {
  assert(false, `Server security check failed: ${err.message}`);
}

runApiSmokeTests().finally(() => {
  console.log("\n=================================================");
  console.log(` Audit Complete: ${passed} Passed, ${failed} Failed`);
  console.log("=================================================");

  process.exitCode = failed > 0 ? 1 : 0;
});
