# WiseCases Security & Privacy Architecture
## WiseAiTechs — For All Medicos

### 1. Zero-Credential Architecture
WiseCases is designed with strict security boundaries:
- **No Hard-Coded Secrets**: Neither `index.html`, `app.js`, `config.js`, nor any committed file contains API keys, Google service account credentials, OAuth tokens, or database passwords.
- **Serverless Admin Keys**: In Google Sheets Mode, the administrator key is stored exclusively within **Google Apps Script Script Properties** (`PropertiesService.getScriptProperties()`) on Google's cloud infrastructure.

---

### 2. Player Privacy & Anonymous Identity
- **No PII Collected**: WiseCases does not require user registration, passwords, emails, or personal identifying information.
- **Anonymous Player ID**: Each learner is assigned an anonymous pseudorandom token formatted as `WC-XXXXXXXX` stored locally in browser storage.
- **Session Isolation**: Preview sessions are completely isolated and never recorded in persistent performance history.

---

### 3. Server-Side Answer Obfuscation (Google Mode)
When connected to Google Sheets:
- The full accepted answer array (`ANSWERS` sheet) is **never** downloaded into the player's browser prior to diagnostic submission.
- Answers are verified server-side inside Google Apps Script, preventing cheating or inspecting browser devtools to find the diagnosis key.

---

### 4. Educational Clinical Disclaimer
WiseCases is an interactive educational simulation platform engineered for medical students, resident physicians, and healthcare practitioners to hone clinical reasoning and diagnostic deduction skills.

> **IMPORTANT**: WiseCases is designed solely for educational and simulation purposes. It is **not** a diagnostic medical device, does not provide clinical advice for live patients, and must never substitute for individualized clinical judgment, hospital protocols, or qualified medical consultation.
