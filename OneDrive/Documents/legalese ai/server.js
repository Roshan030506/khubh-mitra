// LegalEase AI - Production API Server
// Microservice architecture with Multilingual Output Generation (HI, TA, BN, MR, TE, KN, ML, EN), Gemini API, JWT & Security

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { legalCorpus, languageNames, retrieveLegalKnowledge } = require("./knowledge_base");

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "legalease_secure_jwt_secret_key_2026_sih";
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const SUPPORTED_LANGUAGES = new Set(Object.keys(languageNames));
const DEFAULT_LANGUAGE = "en";
const MAX_QUERY_LENGTH = 2000;
const MAX_DRAFT_FIELD_LENGTH = 1200;
const MAX_FEEDBACK_COMMENT_LENGTH = 1000;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, "data");
const STORE_FILE = process.env.STORE_FILE || path.join(DATA_DIR, "legalease-store.json");

if (IS_PRODUCTION && !process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be set in production.");
}

// In-memory security rate limiters and stores, hydrated from a local JSON store in development.
const rateLimitMap = new Map();
const otpStore = new Map();
const documentStore = new Map();
const userStore = new Map();
const feedbackStore = [];
const queryLogStore = [];

function loadStore() {
  if (process.env.DISABLE_FILE_STORE === "true") return;
  try {
    if (!fs.existsSync(STORE_FILE)) return;
    const raw = JSON.parse(fs.readFileSync(STORE_FILE, "utf8"));
    (raw.documents || []).forEach((doc) => documentStore.set(doc.id, doc));
    (raw.users || []).forEach((user) => userStore.set(user.phone_number, user));
    feedbackStore.push(...(raw.feedback || []));
    queryLogStore.push(...(raw.query_logs || []));
  } catch (err) {
    console.warn("Local data store could not be loaded:", err.message);
  }
}

function persistStore() {
  if (process.env.DISABLE_FILE_STORE === "true") return;
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const payload = {
      documents: Array.from(documentStore.values()).slice(-250),
      users: Array.from(userStore.values()).slice(-500),
      feedback: feedbackStore.slice(-1000),
      query_logs: queryLogStore.slice(-1000)
    };
    fs.writeFileSync(STORE_FILE, JSON.stringify(payload, null, 2));
  } catch (err) {
    console.warn("Local data store could not be saved:", err.message);
  }
}

loadStore();

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()) : true
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname)));

function normalizeLanguage(language) {
  const langCode = String(language || DEFAULT_LANGUAGE).toLowerCase();
  return SUPPORTED_LANGUAGES.has(langCode) ? langCode : DEFAULT_LANGUAGE;
}

function normalizePhoneNumber(phoneNumber) {
  return String(phoneNumber || "").replace(/[^\d+]/g, "");
}

function generateOtp() {
  return crypto.randomInt(100000, 1000000).toString();
}

function generatePublicId(prefix, byteLength = 6) {
  return `${prefix}-${Date.now()}-${crypto.randomBytes(byteLength).toString("hex")}`;
}

function shouldExposeDemoOtp(smsResult) {
  return !smsResult.success && !IS_PRODUCTION && process.env.EXPOSE_DEMO_OTP !== "false";
}

function clampText(value, fallback = "", maxLength = MAX_DRAFT_FIELD_LENGTH) {
  const text = String(value || fallback).trim();
  return text.slice(0, maxLength);
}

function getRequestUser(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  return verifyJwt(authHeader.split(" ")[1]);
}

function hashSensitiveValue(value) {
  return crypto.createHash("sha256").update(String(value || "")).digest("hex");
}

// Real-Time SMS Gateway Integrations (Twilio & Fast2SMS)
async function sendRealTimeSms(phoneNumber, otp) {
  const message = `Your LegalEase AI security verification OTP is ${otp}. Valid for 5 minutes. Do not share this code with anyone.`;

  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    try {
      const auth = Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString("base64");
      const formattedPhone = phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber}`;

      const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          To: formattedPhone,
          From: process.env.TWILIO_PHONE_NUMBER,
          Body: message
        })
      });

      const data = await res.json();
      if (res.ok) {
        console.log(`[REAL-TIME SMS SENT via Twilio] SID: ${data.sid} to ${formattedPhone}`);
        return { success: true, provider: "Twilio", sid: data.sid };
      }
    } catch (err) {
      console.error("[Twilio SMS Exception]", err.message);
    }
  }

  if (process.env.FAST2SMS_API_KEY) {
    try {
      const rawPhone = phoneNumber.replace(/[^\d]/g, "").slice(-10);
      const res = await fetch("https://www.fast2sms.com/dev/bulkV2", {
        method: "POST",
        headers: {
          "authorization": process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          route: "otp",
          variables_values: otp,
          numbers: rawPhone
        })
      });

      const data = await res.json();
      if (data.return) {
        console.log(`[REAL-TIME SMS SENT via Fast2SMS] Request ID: ${data.request_id} to ${rawPhone}`);
        return { success: true, provider: "Fast2SMS", requestId: data.request_id };
      }
    } catch (err) {
      console.error("[Fast2SMS Exception]", err.message);
    }
  }

  console.log(`[SIMULATED SMS] OTP for ${phoneNumber} is: ${otp}`);
  return { success: false, provider: "Simulated" };
}

// Rate Limiter
function checkRateLimit(ipKey, limit = 30, windowMs = 60000) {
  const now = Date.now();
  const record = rateLimitMap.get(ipKey) || { count: 0, resetAt: now + windowMs };

  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + windowMs;
  } else {
    record.count += 1;
  }

  rateLimitMap.set(ipKey, record);
  return record.count <= limit;
}

// XSS Protection HTML Escape
function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// HMAC-SHA256 JWT Implementation
function base64UrlEncode(str) {
  return Buffer.from(str).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function base64UrlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return Buffer.from(str, "base64").toString("utf8");
}

function signJwt(payload, expiresInSeconds = 86400) {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const body = base64UrlEncode(JSON.stringify({ ...payload, exp }));
  const signature = base64UrlEncode(
    crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest()
  );
  return `${header}.${body}.${signature}`;
}

function verifyJwt(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [header, body, signature] = parts;
  const expectedSignature = base64UrlEncode(
    crypto.createHmac("sha256", JWT_SECRET).update(`${header}.${body}`).digest()
  );

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(body));
    if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
      return null;
    }
    return payload;
  } catch (err) {
    return null;
  }
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Missing authentication token" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyJwt(token);
  if (!decoded) {
    return res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
  }

  req.user = decoded;
  next();
}

// Generate Multilingual Grounded Response
async function generateLegalResponse(query, language = "en") {
  const langCode = normalizeLanguage(language);
  const langName = languageNames[langCode] || "English";
  const retrieval = retrieveLegalKnowledge(query);

  if (retrieval.isUncertain || !retrieval.topMatch) {
    const fallbackMsgs = {
      en: "We could not find a close match for your query. For specialized legal advice, please consult a free legal aid clinic or DLSA desk.",
      hi: "हम आपके प्रश्न का सटीक मिलान नहीं खोज सके। किसी भी कानूनी सहायता के लिए कृपया नजदीकी जिला विधिक सेवा प्राधिकरण (DLSA) या 15100 पर संपर्क करें।",
      ta: "உங்கள் கேள்விக்கான சரியான சட்டத் தகவலைக் கண்டுபிடிக்க முடியவில்லை. இலவச சட்ட உதவி பெற DLSA அல்லது 15100 ஐத் தொடர்பு கொள்ளவும்.",
      bn: "আমরা আপনার প্রশ্নের সঠিক উত্তর খুঁজে পাইনি। বিনামূল্যের আইনি সহায়তার জন্য অনুগ্রহ করে জেলা আইনি পরিষেবা কর্তৃপক্ষ (DLSA) বা ১৫১০০ এ যোগাযোগ করুন।",
      mr: "आम्हाला तुमच्या प्रश्नाचे अचूक उत्तर सापडले नाही. मोफत कायदेशीर मदतीसाठी कृपया जिल्हा विधिक सेवा प्राधिकरणाशी (DLSA) संपर्क साधा.",
      te: "మీ ప్రశ్నకు మేము సరైన సమాధానం కనుగొనలేకపోయాము. దయచేసి DLSA లేదా హెల్ప్‌లైన్ 15100ను సంప్రదించండి.",
      kn: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಸೂಕ್ತ ಉತ್ತರ ಸಿಕ್ಕಿಲ್ಲ. ಉಚಿತ ಕಾನೂನು ನೆರವಿಗಾಗಿ DLSA ಅಥವಾ 15100 ಅನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      ml: "നിങ്ങളുടെ ചോദ്യത്തിന് അനുയോജ്യമായ മറുപടി കണ്ടെത്താനായില്ല. സൗജന്യ നിയമസഹായത്തിനായി DLSA യുമായി ബന്ധപ്പെടുക."
    };

    return {
      response_text: fallbackMsgs[langCode] || fallbackMsgs["en"],
      citations: [{ act: "Legal Services Authorities Act, 1987", section: "Section 12", title: "Free Legal Aid Desk" }],
      confidence: 0.40,
      escalation_recommended: true,
      intent: "escalate",
      actionable_steps: [
        "Call National Legal Aid Helpline 15100.",
        "Visit your nearest District Legal Services Authority (DLSA) office."
      ],
      draft_type: "general_notice",
      match_ids: []
    };
  }

  const topMatch = retrieval.topMatch;
  const nativeSummary = topMatch.summary[langCode] || topMatch.summary["en"];
  const nativeSteps = topMatch.actionable_steps[langCode] || topMatch.actionable_steps["en"];

  const citations = retrieval.matches.map((m) => ({
    act: m.act,
    section: m.section,
    title: m.title,
    url: "https://www.indiacode.nic.in"
  }));

  // Call Gemini API with strict language output mandate
  if (process.env.GEMINI_API_KEY) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are LegalEase AI, an authoritative Indian legal rights assistant.
              CRITICAL INSTRUCTION: You MUST write your entire response exclusively in the user's selected language: ${langName} (Code: ${langCode}). Do NOT use English unless the requested language code is 'en'.
              
              Mandatory legal context:
              Act: ${topMatch.act}
              Section: ${topMatch.section}
              Grounded Legal Summary: ${nativeSummary}
              
              User Query: "${query}"
              
              Answer clearly in 3-4 sentences in plain ${langName}.`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API returned ${response.status}`);
      }

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return {
          response_text: data.candidates[0].content.parts[0].text,
          citations,
          confidence: retrieval.confidence,
          escalation_recommended: retrieval.confidence < 0.72,
          intent: retrieval.queryIntent,
          actionable_steps: nativeSteps,
          draft_type: topMatch.draft_type,
          match_ids: retrieval.matches.map((match) => match.id)
        };
      }
    } catch (err) {
      console.warn("Gemini API call failed, using native grounded corpus fallback:", err.message);
    }
  }

  // Native Multilingual Fallback
  return {
    response_text: `${nativeSummary} (${topMatch.act} - ${topMatch.section}).`,
    citations,
    confidence: retrieval.confidence,
    escalation_recommended: retrieval.confidence < 0.72,
    intent: retrieval.queryIntent,
    actionable_steps: nativeSteps,
    draft_type: topMatch.draft_type,
    match_ids: retrieval.matches.map((match) => match.id)
  };
}

// REST API Endpoints

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "online", service: "LegalEase AI API Gateway", version: "3.0.0", multilingual: true });
});

app.post("/api/v1/auth/otp/request", async (req, res) => {
  const clientIp = req.ip || req.socket.remoteAddress;
  if (!checkRateLimit(`otp_req_${clientIp}`, 5, 300000)) {
    return res.status(429).json({ error: "Too many OTP requests. Please wait 5 minutes." });
  }

  const { phone_number } = req.body;
  const cleanPhone = normalizePhoneNumber(phone_number);

  if (!/^[6-9]\d{9}$/.test(cleanPhone) && !/^\+[1-9]\d{7,14}$/.test(cleanPhone)) {
    return res.status(400).json({ error: "Invalid phone number format. Enter a valid 10-digit mobile number." });
  }

  const otp = generateOtp();
  const expiresAt = Date.now() + 5 * 60 * 1000;

  otpStore.set(cleanPhone, { otp, expiresAt, attempts: 0 });
  const smsResult = await sendRealTimeSms(cleanPhone, otp);

  res.json({
    status: "success",
    message: smsResult.success
      ? `Real-time OTP dispatched to ${cleanPhone} via ${smsResult.provider}.`
      : `OTP generated for ${cleanPhone}.`,
    phone_number: cleanPhone,
    expires_in_seconds: 300,
    sms_sent: smsResult.success,
    demo_otp: shouldExposeDemoOtp(smsResult) ? otp : undefined
  });
});

app.post("/api/v1/auth/otp/verify", (req, res) => {
  const { phone_number, otp } = req.body;
  const cleanPhone = normalizePhoneNumber(phone_number);
  const record = otpStore.get(cleanPhone);

  if (!record) {
    return res.status(400).json({ error: "OTP expired or not requested. Please request a new OTP." });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(cleanPhone);
    return res.status(400).json({ error: "OTP has expired. Please request a new OTP." });
  }

  if (record.attempts >= 3) {
    otpStore.delete(cleanPhone);
    return res.status(429).json({ error: "Too many failed attempts. Please request a new OTP." });
  }

  if (record.otp !== otp?.trim()) {
    record.attempts += 1;
    return res.status(401).json({ error: `Invalid OTP. ${3 - record.attempts} attempt(s) remaining.` });
  }

  otpStore.delete(cleanPhone);

  let user = userStore.get(cleanPhone);
  if (!user) {
    user = {
      id: generatePublicId("usr", 4),
      phone_number: cleanPhone,
      role: "citizen",
      created_at: new Date().toISOString()
    };
    userStore.set(cleanPhone, user);
    persistStore();
  }

  const accessToken = signJwt({ sub: user.id, phone: user.phone_number, role: user.role }, 86400);
  const refreshToken = signJwt({ sub: user.id, type: "refresh" }, 7 * 86400);

  res.json({
    status: "authenticated",
    access_token: accessToken,
    refresh_token: refreshToken,
    user: {
      id: user.id,
      phone_number: user.phone_number,
      role: user.role
    }
  });
});

app.get("/api/v1/auth/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

app.post("/api/v1/query", async (req, res) => {
  try {
    const clientIp = req.ip || req.socket.remoteAddress;
    if (!checkRateLimit(`query_${clientIp}`, 60, 60000)) {
      return res.status(429).json({ error: "Rate limit exceeded. Max 60 queries per minute." });
    }

    const { content, language = "en", channel = "web" } = req.body;
    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return res.status(400).json({ error: "Missing required field: content" });
    }
    if (content.length > MAX_QUERY_LENGTH) {
      return res.status(413).json({ error: `Query is too long. Maximum length is ${MAX_QUERY_LENGTH} characters.` });
    }

    const normalizedLanguage = normalizeLanguage(language);
    const result = await generateLegalResponse(content.trim(), normalizedLanguage);
    const queryId = generatePublicId("q");
    const user = getRequestUser(req);

    queryLogStore.push({
      id: queryId,
      user_id: user?.sub || null,
      channel: clampText(channel, "web", 40),
      language: normalizedLanguage,
      content_hash: hashSensitiveValue(content.trim()),
      content_preview: content.trim().slice(0, 120),
      confidence: result.confidence,
      escalation_recommended: result.escalation_recommended,
      matched_corpus_ids: result.match_ids || [],
      created_at: new Date().toISOString()
    });
    persistStore();

    res.json({
      query_id: queryId,
      channel,
      language: normalizedLanguage,
      response_text: result.response_text,
      citations: result.citations,
      confidence: result.confidence,
      escalation_recommended: result.escalation_recommended,
      intent: result.intent,
      actionable_steps: result.actionable_steps,
      suggested_draft_type: result.draft_type
    });
  } catch (error) {
    console.error("Error processing query:", error);
    res.status(500).json({ error: "Internal server error processing query" });
  }
});

app.post("/api/v1/documents/draft", (req, res) => {
  try {
    const { doc_type = "salary_notice", form_data = {} } = req.body;
    const docId = generatePublicId("doc");
    const dateStr = new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });

    const allowedDocTypes = new Set(["salary_notice", "consumer_complaint", "tenant_notice", "rti_application"]);
    const safeDocType = allowedDocTypes.has(doc_type) ? doc_type : "salary_notice";
    const recipient = clampText(form_data.recipient, "Management / Opposite Party");
    const issue = clampText(form_data.issue, "Non-fulfillment of statutory obligations");
    const relief = clampText(form_data.relief, "Immediate compliance and resolution within 15 days");
    const subject = clampText(form_data.subject, "Formal Demand Notice", 300);

    let title = "LEGAL NOTICE";
    let content = "";

    if (safeDocType === "rti_application") {
      title = "FORM A - APPLICATION UNDER RIGHT TO INFORMATION ACT, 2005";
      content = `
TO THE PUBLIC INFORMATION OFFICER (PIO),
Department / Office: ${recipient}

1. Full Name of Applicant: Citizen Applicant
2. Subject Matter of Information: ${subject}
3. Specific Information Requested:
   - Particulars of official records regarding: ${issue}
   - Certified copies of relevant files, decisions, and notifications.
4. Period to which information relates: Recent Calendar Year
5. Application Fee Details: Rs. 10 Court Fee Stamp / Postal Order attached.
6. Demanded Action: ${relief}

Date: ${dateStr}
Place: India
Signature of Applicant
      `.trim();
    } else if (safeDocType === "consumer_complaint") {
      title = "BEFORE THE DISTRICT CONSUMER DISPUTES REDRESSAL COMMISSION";
      content = `
FORMAL COMPLAINT UNDER SECTION 35 OF CONSUMER PROTECTION ACT, 2019

BETWEEN:
Complainant: Citizen
AND
Opposite Party: ${recipient}

SUBJECT: COMPLAINT REGARDING DEFICIENCY OF SERVICE / DEFECTIVE PRODUCT
1. That the Complainant purchased/availed services regarding ${subject}.
2. Statement of Facts: ${issue}
3. That the Opposite Party committed unfair trade practice by denying resolution.
4. RELIEF CLAIMED: ${relief}

Date: ${dateStr}
Complainant Signature
      `.trim();
    } else {
      title = "LEGAL DEMAND NOTICE";
      content = `
BY REGISTERED POST A.D. / SPEED POST / EMAIL

Date: ${dateStr}

TO:
${recipient}

SUBJECT: LEGAL NOTICE FOR ${subject.toUpperCase()}

Sir / Madam,

Under instructions from my client, I hereby issue this Legal Notice:

1. That my client had official dealings with you regarding: ${issue}.
2. That despite repeated demands, you have failed to resolve the matter.
3. You are hereby called upon to fulfill the following within 15 days: ${relief}.
4. Failing compliance, legal proceedings will be initiated before the competent Court of Law at your sole risk and expense.

Yours faithfully,
Advocate / Authorized Representative
      `.trim();
    }

    const docRecord = {
      id: docId,
      doc_type: safeDocType,
      title,
      content,
      recipient,
      issue,
      relief,
      subject,
      user_id: getRequestUser(req)?.sub || null,
      created_at: new Date().toISOString()
    };

    documentStore.set(docId, docRecord);
    persistStore();

    res.json({
      document_id: docId,
      title,
      preview: content,
      download_url: `/api/v1/documents/download/${docId}`
    });
  } catch (error) {
    console.error("Error creating draft:", error);
    res.status(500).json({ error: "Failed to generate document draft" });
  }
});

app.get("/api/v1/documents/download/:id", (req, res) => {
  const doc = documentStore.get(req.params.id);
  if (!doc) {
    return res.status(404).send("Document not found or expired.");
  }

  const safeTitle = escapeHtml(doc.title);
  const safeContent = escapeHtml(doc.content);

  const htmlOutput = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${safeTitle}</title>
  <style>
    body { font-family: 'Times New Roman', Times, serif; line-height: 1.6; padding: 40px; color: #111; max-width: 800px; margin: 0 auto; }
    h1 { text-align: center; font-size: 20px; text-decoration: underline; margin-bottom: 30px; }
    pre { font-family: inherit; white-space: pre-wrap; font-size: 15px; }
    .footer { margin-top: 50px; font-size: 12px; color: #666; border-top: 1px solid #ccc; padding-top: 10px; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body onload="window.print()">
  <h1>${safeTitle}</h1>
  <pre>${safeContent}</pre>
  <div class="footer">Generated via LegalEase AI • Grounded in Indian Law</div>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Disposition", `inline; filename="${doc.doc_type}_${doc.id}.html"`);
  res.send(htmlOutput);
});

app.get("/api/v1/legal-aid", (req, res) => {
  const { city = "" } = req.query;

  const centers = [
    {
      id: "dlsa-1",
      name: "District Legal Services Authority (DLSA)",
      category: "Free Legal Aid & Counsel",
      address: "District & Sessions Court Complex, Metro Circle",
      city: "Central",
      distance_km: "1.8 km",
      phone: "+91 11 2338 4500",
      helpline: "15100",
      open_hours: "10:00 AM - 5:00 PM (Mon-Sat)"
    },
    {
      id: "women-1",
      name: "Women Support & Legal Helpline Desk",
      category: "Women & Child Safety",
      address: "State Commission for Women, Civic Center",
      city: "Central",
      distance_km: "2.4 km",
      phone: "1091",
      helpline: "1091",
      open_hours: "24/7 Helpline"
    },
    {
      id: "consumer-forum-1",
      name: "District Consumer Disputes Redressal Commission",
      category: "Consumer Rights",
      address: "Institutional Area, Administrative Block",
      city: "North",
      distance_km: "4.1 km",
      phone: "1915",
      helpline: "1915",
      open_hours: "9:30 AM - 4:30 PM (Mon-Fri)"
    },
    {
      id: "labor-help-1",
      name: "Shramik Suvidha / Labor Commissioner Office",
      category: "Labor Rights",
      address: "Employment Exchange Building, Industrial Estate",
      city: "South",
      distance_km: "5.6 km",
      phone: "1800-180-1111",
      helpline: "14434",
      open_hours: "9:30 AM - 6:00 PM"
    }
  ];

  let filtered = centers;
  if (city) {
    const q = city.toLowerCase();
    filtered = centers.filter((c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.address.toLowerCase().includes(q) || c.city.toLowerCase().includes(q));
  }

  res.json({ centers: filtered });
});

app.get("/api/v1/library", (req, res) => {
  res.json({ articles: legalCorpus });
});

app.post("/api/v1/feedback", (req, res) => {
  const { response_id, rating, comment, flag } = req.body;
  const normalizedRating = Number(rating);
  if (!response_id || !Number.isInteger(normalizedRating) || normalizedRating < 1 || normalizedRating > 5) {
    return res.status(400).json({ error: "Feedback requires response_id and rating from 1 to 5." });
  }

  const record = {
    id: generatePublicId("fb"),
    response_id: clampText(response_id, "", 100),
    rating: normalizedRating,
    comment: clampText(comment, "", MAX_FEEDBACK_COMMENT_LENGTH),
    flag: Boolean(flag),
    user_id: getRequestUser(req)?.sub || null,
    created_at: new Date().toISOString()
  };

  feedbackStore.push(record);
  persistStore();
  res.json({ status: "success", feedback_id: record.id, message: "Feedback received. Thank you for improving LegalEase AI!" });
});

app.get("/api/v1/compliance", (req, res) => {
  res.json({
    disclaimer: "LegalEase AI provides legal information, not legal advice. For decisions about your case, consult a licensed lawyer or legal aid authority.",
    privacy: {
      sensitive_data_notice: "Legal queries may contain personal or sensitive details. Query logs store a short preview and hash for quality review; production deployments should connect a compliant encrypted database.",
      retention: "Local demo data is retained in the configured data store until deleted by the operator.",
      deletion_requests: "Users can request deletion through the support contact configured for deployment."
    },
    emergency: {
      safety_risk: "If someone is in immediate danger, contact local emergency services, police, or a verified crisis helpline before using this app."
    }
  });
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` LegalEase AI Backend Gateway running on port ${PORT}`);
    console.log(` Multilingual AI Output: Active across 8 Indian Languages`);
    console.log(` Base URL: http://localhost:${PORT}`);
    console.log(`====================================================`);
  });
}
