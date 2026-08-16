# UI Design Requirement Document
## LegalEase AI – Law & Rights Assistant in Regional Languages
**Version:** 2.0 — Visual & Interaction Design Spec

---

## 1. Design Thesis

LegalEase AI should feel like a **clean, modern web product** — light, airy, effortless to trust — closer to a well-designed SaaS tool than a government portal or a generic chatbot. The interface leads with whitespace, a single confident accent color, and purposeful motion that makes the product feel alive and responsive, not static or form-like.

**Signature element:** A **Verify Pulse** — a thin animated ring that traces around the citation badge on every AI answer, "confirming" the response the moment it's grounded in a real legal source. It's a small, recurring motion detail that becomes the product's visual fingerprint without relying on heavy imagery or color.

---

## 2. Design Token System

### 2.1 Color Palette — Light & Minimal

| Token | Hex | Use |
|---|---|---|
| `--bg-canvas` | `#FBFCFE` | Page background — soft off-white, not stark white |
| `--bg-surface` | `#FFFFFF` | Cards, chat bubbles, panels |
| `--bg-subtle` | `#F1F4F9` | Secondary surfaces, input fields, hover backgrounds |
| `--border-subtle` | `#E3E8EF` | Hairline borders, dividers |
| `--text-primary` | `#0F172A` | Headings, primary text |
| `--text-secondary` | `#64748B` | Supporting text, captions |
| `--accent-primary` | `#4F46E5` | Primary actions, links, active states (Indigo) |
| `--accent-success` | `#10B981` | Verified/high-confidence indicator, success states |
| `--accent-warm` | `#F59E0B` | Low-confidence flag, gentle warnings |

One dominant accent (indigo), used sparingly, keeps the interface feeling light rather than busy. Success and warning colors are used **only** as small indicators (dots, rings, badges), never as large fills.

### 2.2 Typography

| Role | Typeface | Reasoning |
|---|---|---|
| **Display / Headings** | *Space Grotesk* or *General Sans* | Clean, modern, geometric — reads as a contemporary web product |
| **Body / UI** | *Inter* | Neutral, highly legible workhorse for interface text |
| **Regional Scripts** | *Noto Sans* (per-script subset) | Matched x-height and weight pairing with Inter for Hindi, Tamil, Bengali, etc. |
| **Citations / Data** | *IBM Plex Mono* | Small, distinct treatment for legal section references |

### 2.3 Layout Concept

```
┌───────────────────────────────────────────┐
│  LegalEase        [🌐 English ▾]   Sign in │  ← persistent top bar,
├───────────────────────────────────────────┤     language switcher always visible
│                                             │
│      Ask about your rights in seconds       │  ← light, large heading
│      Plain-language legal help, in your     │
│      own language.                          │
│                                             │
│   ┌─────────────────────────────────────┐  │
│   │  🎤  Type or speak your question...   │  │  ← primary input, soft shadow,
│   └─────────────────────────────────────┘  │     subtle border, animates on focus
│                                             │
│   [Labor]  [Consumer]  [Rent]  [RTI]        │  ← pill buttons, hover-lift
│                                             │
└───────────────────────────────────────────┘
```

- **Grid:** 8pt spacing, 4-column mobile / 12-column desktop, generous margins (min 24px mobile, 80px+ desktop).
- **Corners:** 10–14px radius — soft but not overly rounded.
- **Elevation:** Very light shadows (`0 1px 3px rgba(15,23,42,0.06)`) instead of heavy card borders — keeps the light theme feeling airy rather than boxed-in.

---

## 3. Motion & Interactivity

The product should feel like a responsive, modern **website** — every interactive element gives quiet visual feedback. Motion is subtle and fast (150–300ms), never delays the user.

| Element | Interaction |
|---|---|
| **Buttons / pills** | Hover: slight lift (`translateY(-2px)`) + shadow increase; active: scale down to 0.98 |
| **Input field** | Border transitions from `--border-subtle` to `--accent-primary` on focus, with a soft glow ring |
| **Page/section load** | Content fades and slides up slightly (8–12px) on scroll into view — staggered for lists of cards |
| **AI "thinking" state** | Three-dot typing indicator with soft pulsing opacity, or a thin animated progress line under the input |
| **Answer arrival** | Text streams in (typewriter or fade-in-by-line), citation badge appears last with the **Verify Pulse** ring animation (a ring expands and fades once, ~600ms) |
| **Language switcher** | Dropdown expands with a smooth height/opacity transition; selected language highlights with a soft background fill |
| **Navigation between screens** | Cross-fade + slight horizontal slide (20px) rather than a hard cut |
| **Cards (Rights Library, document types)** | Hover: background shifts to `--bg-subtle`, icon nudges slightly |
| **Toggle/switches** (voice/text mode, dark mode) | Smooth sliding thumb with color transition |
| **Reduced motion** | All transitions collapse to simple opacity fades when `prefers-reduced-motion` is set |

This level of interactivity should make the product feel like a **living, responsive web app** rather than a static document — every tap, hover, and state change has a small, intentional animation.

---

## 4. Language Switching Requirements

- **Default language: English.** The product loads in English for all first-time and unauthenticated sessions.
- A **persistent language switcher** lives in the top navigation bar on every screen (not buried in settings), showing the current language (e.g., "English") with a globe icon and dropdown chevron.
- The dropdown lists supported languages **in their own native script** alongside the English name (e.g., "हिन्दी (Hindi)", "தமிழ் (Tamil)") so users can find their language even if they can't read English well.
- Include a **search/filter field** at the top of the dropdown once the language list grows beyond ~6 options.
- Selecting a language should:
  - Instantly re-render all static UI text (buttons, labels, navigation)
  - Not require a page reload
  - Persist as the user's preference for future sessions (stored locally / on their account)
- Voice input/output language can be set independently from the display language (e.g., someone may want an English interface but Hindi voice responses) — expose this as a secondary option inside Settings, not in the main switcher.
- First-run experience: a lightweight, dismissible prompt ("Prefer another language? Switch anytime from the top bar.") rather than a forced language-selection wall — since English is the default, users should be able to start immediately.

---

## 5. Screen-by-Screen UI Requirements

### 5.1 Landing / Home
- Light hero section: short, confident headline in English by default, primary input front and center.
- Language switcher visible top-right at all times.
- Quick-topic pills (Labor, Consumer, Tenancy, RTI) below the input, hover-interactive.

### 5.2 Chat / Response View
- Answer text on a clean white card (`--bg-surface`) with soft shadow, generous padding, 16px+ body text, 1.6 line-height.
- Citation badge (small pill, monospace text, `--accent-success` outline) with the **Verify Pulse** animation on arrival.
- Confidence shown as a small colored dot next to the citation badge — green (`--accent-success`) for high confidence, amber (`--accent-warm`) for "recommend expert review" — not a heavy visual treatment.
- "Read aloud" icon button and thumbs up/down feedback icons sit inline below the answer, all with hover states.

### 5.3 Document Drafting Wizard
- Single-question-per-step layout with a thin animated progress bar at the top (fills smoothly as steps complete).
- Live preview panel updates with a soft cross-fade as fields change.
- Final "document ready" card has a light celebratory micro-animation (subtle checkmark draw-in) before showing download/share actions.

### 5.4 Rights Library
- Responsive card grid, icon-led, plain-language question titles.
- Cards lift and shift background color on hover to reinforce interactivity.

### 5.5 Find Legal Help
- Map view with location pins in `--accent-primary`; list view alternative for low-bandwidth users.
- Prominent call-to-action button, consistent hover/active states matching the rest of the system.

### 5.6 Empty & Error States
- Empty states use light illustration or icon plus a direct, actionable prompt — never a blank page.
- Error messages state what happened and the next step in plain language, styled with the `--accent-warm` indicator, not alarming red tones.

---

## 6. Accessibility Requirements

- WCAG 2.1 **AA** contrast minimum for all text/background combinations (verified: `--text-primary` on `--bg-canvas` = 15.1:1; `--accent-primary` on `--bg-canvas` = 5.9:1).
- All interactive elements ≥ 44×44px touch target.
- Full keyboard navigation with visible focus rings (`--accent-primary` outline).
- Screen-reader labels for all icon-only controls (mic, speaker, language globe, confidence dot).
- `prefers-reduced-motion` respected across every animation listed in Section 3.
- Font scaling up to 200% without layout breakage.

---

## 7. Design Deliverables Checklist

- [ ] Token system (colors, type scale, spacing, shadow levels) as CSS custom properties / Figma variables
- [ ] Component library: buttons, input field, citation badge, confidence indicator, language switcher, pills, cards, progress bar, toggle
- [ ] Hi-fi mockups: Home, Chat/Response View, Drafting Wizard, Rights Library, Find Help, Settings — each in default (English) and one localized language for QA
- [ ] Motion prototype covering all interactions in Section 3
- [ ] Language switcher interactive prototype (empty state, search/filter, selection persistence)
- [ ] Accessibility audit (contrast, focus states, screen-reader pass)
- [ ] Dark mode variant (optional, using inverted light-neutral tones with the same accent logic)
