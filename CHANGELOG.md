# WiseCases Changelog
## WiseAiTechs — For All Medicos

All notable releases and architectural updates to the **WiseCases** platform.

---

### [2.5.0] — 2026-10-04 (Final Master Build)
#### Added
- **Multi-Format Ingestion Engine (Import Center)**: Full bulk import support for Microsoft Excel (`.xlsx`), CSV spreadsheets, and JSON bundles.
- **Dynamic Multi-Stage CSV Ingestion**: Scans column patterns (`stage1_title`, `stage1_clue`, `stage1_reasoning` up to 20 stages) with sample demo CSV `data/demo-import.csv`.
- **Duplicate Detection & Policy Engine**: Configurable strategies (`Skip`, `Replace`, `Create Copy`) for imported cases.
- **Google Sheets Cloud Backend**: Production-ready Google Apps Script API (`apps-script/`) with 10 database tabs, `setupDatabase()` initializer, and server-side answer key obfuscation.
- **Dedicated Settings View (`#view-settings`)**: Toggle between Local Mode and Google Sheets Mode, test connection endpoints, adjust simulation defaults, and manage anonymous player tokens.
- **Complete Deployment Automation**: Pre-configured workflows for GitHub Pages (`.github/workflows/deploy-pages.yml`) and GitLab Pages (`.gitlab-ci.yml`) plus custom `404.html`.
- **Non-Coder Documentation Suite**: Crystal-clear step-by-step guides (`SETUP_NON_CODER.md`, `GOOGLE_SHEETS_SETUP.md`, `DATA_IMPORT_GUIDE.md`, `ADMIN_GUIDE.md`, `DEPLOYMENT_GITHUB.md`, `DEPLOYMENT_GITLAB.md`).

---

### [2.0.0] — 2026-10-04
#### Added
- **Complete Clinical Answer Debrief**: 10-part longform clinical debrief featuring Diagnostic Reasoning Chains, Structured Investigations table, and Differential Diagnoses cards.
- **Locked Diagnostic Action Workflow**:
  - `SUBMIT DIAGNOSIS`
  - Targeted clinical feedback (`Why not best answer`, `What did you miss?`, `Next decision`)
  - Dynamic button states (`SHOW THE ANSWER` vs `CONTINUE TO NEXT STAGE`)
  - Correct answer debrief (`WHY THIS IS CORRECT` and `DECISIVE FINDINGS`)
- **Official Cases**: Added `CASE-005` (Autoimmune Hepatitis) and `CASE-006` (Decompensated Alcoholic Liver Disease).
- **Schema 2.0 Case Editor**: Accordion sections for comprehensive case authoring.

---

### [1.0.0] — 2026-10-03
#### Added
- Initial standalone HTML/CSS/JavaScript progressive clinical deduction prototype.
- Core cases (`CASE-001` through `CASE-004`).
- Local storage persistence, lives counter, scoring engine, and case manager.
