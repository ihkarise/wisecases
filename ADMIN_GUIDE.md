# WiseCases Administrator & Curriculum Guide
## WiseAiTechs — For All Medicos

This guide covers all administrative and curriculum authoring functions in WiseCases.

---

### Accessing the Case Manager
Click **Case Manager** in the top navigation bar (or navigate to `#admin`).

---

### 1. Creating a New Case
1. Click **+ New Case** in the admin toolbar.
2. In the Case Editor modal:
   - **Basic Information**: Enter Case ID (e.g. `CASE-010`), Title, Category, Subcategory, Difficulty, and Status (`Published` or `Draft`).
   - **Patient Profile**: Enter Age, Sex, and Brief Clinical Vignette.
   - **Dynamic Stages**: Add clinical clues stage by stage. You can reorder stages with the Up/Down arrows or add stages with **+ Add Stage**.
   - **Diagnosis & Synonyms**: Enter the canonical diagnosis, display title, accepted synonyms (one per line), detailed rationale, and decisive findings.
   - **Differential Diagnoses**: Enter conditions considered and rejected.
   - **Cognitive Pitfalls**: Enter common cognitive biases (anchoring, premature closure).
3. Click **Save Clinical Case**.

---

### 2. Editing an Existing Case
1. In the Case Manager table, locate the case and click **Edit**.
2. Update any fields or stages.
3. Click **Save Clinical Case**. The case version increments automatically.

---

### 3. Duplicating a Case
1. In the table, click **Duplicate** on any case.
2. A new case with ID `CASE-XXX-COPY` will be created immediately without overwriting the original.

---

### 4. Previewing a Case (Safe Author Mode)
1. In the table, click **Preview**.
2. The game opens with a distinct blue `PREVIEW MODE` badge.
3. You can test stage clues, test diagnosis evaluation, and verify debrief screens.
4. Preview attempts are **never** logged to player statistics or leaderboard scores.

---

### 5. Publishing & Archiving
- **Published**: The case appears in the public Case Library for all learners.
- **Draft**: Hidden from normal learners; only visible to administrators.
- **Archived**: Deactivated and hidden from active curricula.

---

### 6. Exporting & Backing Up
- **Export Single Case**: Click **Export** in the table to download that case's JSON.
- **Export All Cases**: Click **Export JSON** in the toolbar to download `wisecases-curriculum.json`.
- **Export Case Inventory (CSV)**: Click **Case Inventory** $\rightarrow$ **Export Case Inventory (CSV)**.
- **Backup Everything**: Click **Backup All** in the toolbar to generate `wisecases-backup-[YYYY-MM-DD].json` containing all cases and all learner test history.
