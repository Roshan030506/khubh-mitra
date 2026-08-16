# LegalEase AI — Law & Rights Assistant in Regional Languages

> **Team SPIRIT | Smart India Hackathon 2025**  
> *Production-Ready Web Application & Progressive Web App (PWA)*

LegalEase AI is a plain-language legal rights assistant built for India, grounded in real legal sources (BNS 2023, IPC, Consumer Protection Act 2019, Labor Codes, RTI Act 2005, and Model Tenancy Act).

---

## 🌟 Key Features

1. **Grounded Legal RAG Engine**: Instant plain-language guidance with verified citations, section numbers, confidence badges (`High Confidence` vs `Expert Review Recommended`), and actionable steps.
2. **8+ Indian Regional Languages**: Seamless display & voice language switching (English, Hindi, Tamil, Bengali, Marathi, Telugu, Kannada, Malayalam).
3. **Voice-to-Text & Text-to-Speech**: Hands-free speech recognition (mic recording) and regional language read-aloud support for low-literacy accessibility.
4. **Interactive Document Drafting Wizard**: Generate legal demand notices (unpaid salary, consumer complaint, tenant dispute, RTI application) with live preview and PDF/print export.
5. **Find Legal Help Directory**: Locate nearby District Legal Services Authorities (DLSA), Women Helplines, and Consumer Forums with direct one-tap calling.
6. **Publishing-Ready PWA**: Service Worker (`sw.js`) and Web App Manifest (`manifest.json`) for standalone mobile & desktop installation.

---

## 🚀 How to Publish & Deploy

### Option 1: Deploy on Vercel (1-Click)
1. Push this repository to GitHub.
2. Go to [Vercel.com](https://vercel.com) -> New Project -> Select your repo.
3. Click **Deploy**. Vercel will automatically build the static assets and deploy the backend serverless endpoints using `vercel.json`.

### Option 2: Deploy on Netlify
1. Connect your repository to [Netlify.com](https://netlify.com).
2. Publish directory: `.` (root).
3. Netlify will configure routes via `netlify.toml`.

### Option 3: Deploy on GitHub Pages
1. Push to GitHub.
2. Go to Repository **Settings** -> **Pages** -> Source: `main` branch.
3. Save! The application will run 100% autonomously on GitHub Pages.

---

## 💻 Local Running

```bash
# Install dependencies
npm install

# Start production server
npm start
```
Open your browser at `http://localhost:3000`.

---

## 📂 Project Structure

- `index.html` — Accessible, high-contrast HTML5 UI shell.
- `styles.css` — Modern design system with Verify Pulse animation, responsive tokens, and print media query.
- `app.js` — Client-side engine with RAG retriever, multi-language switcher, Web Speech STT/TTS, and document wizard.
- `knowledge_base.js` — Authoritative Indian legal corpus and vector matching logic.
- `server.js` — Express backend API microservice for RAG query processing and PDF document downloads.
- `vercel.json` / `netlify.toml` — Deployment manifests.
- `manifest.json` / `sw.js` — Progressive Web App configuration.
