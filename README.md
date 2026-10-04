# WiseCases — Progressive Clinical Diagnosis Platform
## WiseAiTechs — For All Medicos

[![WiseCases CI](https://img.shields.io/badge/WiseCases-v2.5.0-243E8F.svg)](https://github.com)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-16A34A.svg)](https://github.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Backend](https://img.shields.io/badge/Backend-Serverless%20%2F%20Offline-D61F4B.svg)](README.md)

**WiseCases** is a progressive clinical deduction and medical education application created by **WiseAiTechs — For All Medicos**.

Unlike superficial multiple-choice quizzes, WiseCases simulates realistic diagnostic decision-making:
1. Patients present with vague chief complaints and initial vital signs.
2. Learners evaluate the case stage by stage, submitting diagnostic hypotheses.
3. Every incorrect attempt provides targeted clinical feedback (*Why not the best answer*, *What did you miss?*, *Next decision*), deducts a life, and unlocks deeper clinical clues (labs, imaging, pathology).
4. Solved or completed cases culminate in a comprehensive **Complete Clinical Answer** debrief—featuring the sequential case timeline, diagnostic reasoning chains, structured investigations tables, and differential diagnosis analyses.

---

### Key Capabilities

- **100% Serverless & Offline-Safe**: Runs entirely in modern web browsers with zero installation, zero server costs, and zero required build steps.
- **Two-Layer Architecture**:
  - **Layer A (Player Interface)**: Progressive stage gameplay, lives counter, scoring engine, autocomplete input, and clinical reasoning debriefs.
  - **Layer B (Data Repository)**: Abstracted data layer supporting **Local Mode** (`localStorage` & JSON) and **Google Sheets Mode** (Google Apps Script Web App).
- **Multi-Format Ingestion Engine**: Bulk import patient cases from Excel (`.xlsx`), CSV spreadsheets, or JSON curriculum bundles with automatic duplicate handling.
- **Case Authoring Studio**: Create, edit, duplicate, and preview cases with accordion-style Schema 2.0 editors without touching code.
- **Privacy First**: Assigns anonymous player tokens (`WC-XXXXXXXX`) with zero personal tracking.

---

### Repository Structure

```text
wisecases/
│
├── index.html                   # Core single-page application markup
├── styles.css                   # WiseAiTechs design system styling
├── app.js                       # Game engine, repositories, UI controllers
├── config.js                    # Layer B environment & gameplay configuration
├── 404.html                     # Custom styled 404 error page
│
├── .gitignore                   # Git ignore file
├── .nojekyll                    # GitHub Pages asset routing bypass
├── .gitlab-ci.yml               # Automated GitLab Pages deployment pipeline
│
├── .github/
│   └── workflows/
│       └── deploy-pages.yml     # Automated GitHub Pages Actions workflow
│
├── data/
│   ├── cases.json               # Default clinical cases curriculum
│   ├── case-template.json       # Official Schema 2.0 authoring template
│   ├── conditions.json          # Standardized medical condition dictionary
│   └── demo-import.csv          # Sample multi-stage spreadsheet for testing imports
│
├── apps-script/                 # Complete Google Apps Script cloud backend
│   ├── Code.gs                  # Web App entrypoint (doGet & doPost)
│   ├── Config.gs                # Sheet definitions and admin security
│   ├── Sheets.gs                # setupDatabase() automated table initializer
│   ├── Cases.gs                 # Case reading and answer-obfuscation logic
│   ├── Game.gs                  # Server-side state machine and scoring
│   ├── Results.gs               # Learner performance logging
│   ├── Admin.gs                 # Bulk ingestion, export, and settings
│   ├── Utils.gs                 # JSON response and normalization helpers
│   ├── appsscript.json          # Google Apps Script manifest
│   └── README.md                # Fast setup guide for Google Sheets
│
├── docs/                        # Technical documentation
│   ├── ARCHITECTURE.md          # System architecture and layer breakdown
│   ├── CASE_SCHEMA.md           # Authoritative Schema 2.0 reference
│   ├── API.md                   # Google Apps Script Web App API reference
│   └── TROUBLESHOOTING.md       # Common FAQs and resolution steps
│
├── tests/                       # Automated test suites
│   ├── test-runner.js           # Comprehensive unit and logic test runner (205+ tests)
│   └── e2e-browser-test.mjs     # Headless Google Chrome E2E browser tests
│
├── assets/
│   └── README.md                # Media assets guidelines
│
├── README.md                    # Primary repository overview
├── SETUP_NON_CODER.md           # Step-by-step beginner guide for non-programmers
├── GOOGLE_SHEETS_SETUP.md       # Step-by-step Google Sheets backend setup
├── DATA_IMPORT_GUIDE.md         # Ingestion guide for CSV, Excel, and JSON
├── ADMIN_GUIDE.md               # Case authoring and curriculum management
├── DEPLOYMENT_GITHUB.md         # 1-click GitHub Pages deployment instructions
├── DEPLOYMENT_GITLAB.md         # GitLab Pages deployment instructions
├── SECURITY.md                  # Security, zero-secrets rule, and medical disclaimer
├── CHANGELOG.md                 # Full release history
└── LICENSE                      # MIT Open Source License
```

---

### Quickstart

#### 1. Instant Local Launch
- Double-click `index.html` to open in any browser.
- Or launch via Python local server:
  ```bash
  python -m http.server 8000
  ```
  Then open `http://localhost:8000`.

#### 2. Deploy to GitHub Pages
1. Push this repository to GitHub.
2. Go to **Settings** $\rightarrow$ **Pages** $\rightarrow$ select **GitHub Actions**.
3. Your site is live at `https://[your-username].github.io/wisecases/`!
*(See [DEPLOYMENT_GITHUB.md](DEPLOYMENT_GITHUB.md) for full instructions).*

#### 3. Connect Google Sheets Cloud Mode (Optional)
1. Create a blank Google Sheet named **WiseCases Database**.
2. Go to **Extensions** $\rightarrow$ **Apps Script**, paste the files from `apps-script/`, and run `setupDatabase()`.
3. Deploy as **Web app** with access set to **Anyone**.
4. In WiseCases, go to **Settings** $\rightarrow$ **Data Mode** $\rightarrow$ **Google Sheets**, paste your Web App URL, and click **Test Connection**!
*(See [GOOGLE_SHEETS_SETUP.md](GOOGLE_SHEETS_SETUP.md) for step-by-step guidance).*

---

### Running the Automated Test Suite

WiseCases includes extensive unit and browser integration testing.

```bash
# Run unit and logic tests (205+ assertions)
node tests/test-runner.js

# Run Headless Google Chrome interactive E2E tests
node tests/e2e-browser-test.mjs
```

---

### Medical Disclaimer
WiseCases is an interactive clinical simulation and educational tool for medical professionals, residents, and healthcare students. It is **not** a clinical diagnostic system for live patients and must never replace individualized clinical assessment or qualified medical judgment.
