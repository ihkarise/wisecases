# WiseCases Data Ingestion & Import Guide
## WiseAiTechs — For All Medicos

WiseCases provides a multi-format Content Ingestion Engine. You can upload clinical cases formatted as JSON, CSV spreadsheets, Excel workbooks (.xlsx), or Google Sheets.

---

### Choosing the Right Ingestion Format

| Format | Best Suited For | Technical Level | Key Advantages |
| :--- | :--- | :--- | :--- |
| **Excel (.xlsx)** | Doctors, clinical faculty, educators | Non-coder friendly | Familiar interface, visual editing, multi-stage columns |
| **CSV Spreadsheet** | Bulk uploads, batch curriculum generation | Simple spreadsheet | Portable, opens in any spreadsheet tool, supported offline |
| **JSON Bundle** | Software developers, automated pipelines | Technical | Full Schema 2.0 expressiveness, nested differentials & rationale |
| **Google Sheets** | Collaborative curriculum authoring teams | Zero-coding cloud | Real-time multi-user editing, server-side answer hiding |

---

### 1. CSV Format Specification

WiseCases dynamically scans CSV column headers. You can author single-stage or multi-stage cases (up to 20 stages).

#### Required Columns
- `id`: Unique identifier (e.g. `CASE-009`)
- `title`: Case title
- `category`: Medical specialty (e.g. `Cardiology`, `Neurology`, `Medicine`)
- `canonical_diagnosis`: The definitive condition name (e.g. `Myasthenia Gravis`)
- `accepted_answers`: Semicolon-separated list of synonyms and abbreviations (e.g. `Myasthenia Gravis;Generalized MG;MG`)

#### Stage Columns
Use progressive numbered columns for each stage:
- `stage1_title`, `stage1_clue`, `stage1_reasoning`
- `stage2_title`, `stage2_clue`, `stage2_reasoning`
- `stage3_title`, `stage3_clue`, `stage3_reasoning`
- ... up to any number of stages.

#### Sample CSV Row
```csv
"id","title","category","difficulty","status","canonical_diagnosis","accepted_answers","stage1_title","stage1_clue","stage1_reasoning"
"CASE-009","The Silent Chest","Pulmonology","Progressive","Published","Acute Severe Asthma","Acute Severe Asthma;Asthma Attack;Status Asthmaticus","The Worsening Dyspnea","A 22-year-old student presents with acute shortness of breath and wheezing refractory to salbutamol.","Expiratory wheezing indicates severe bronchospasm."
```

A complete multi-stage test CSV file is available at `data/demo-import.csv`.

---

### 2. Excel (.xlsx) Format

When importing an Excel workbook:
1. Open Microsoft Excel and create a workbook.
2. In Row 1, use the column headers listed in the CSV specification above.
3. In Rows 2+, enter your patient cases (one row per case).
4. Save the file as `.xlsx`.
5. In WiseCases, go to **Import Center**, select **Excel Workbook**, and drag the file into the upload zone.

---

### 3. JSON Schema 2.0 Format

For technical users or bulk export/import, use JSON:
- Either a single case object matching `data/case-template.json`.
- Or an array of case objects: `[ { "id": "CASE-001", ... }, { "id": "CASE-002", ... } ]`.
- Or a curriculum package: `{ "cases": [ ... ] }`.

---

### 4. Duplicate Case Handling

When importing records that have the same Case ID as an existing case, you can select one of three policies:
1. **Create Unique Copies (Recommended)**: Automatically appends `-COPY` or `-COPY-2` to the ID and imports the case safely.
2. **Replace Existing Cases**: Overwrites the existing case in your local curriculum.
3. **Skip Duplicate Cases**: Leaves existing cases untouched and ignores the incoming duplicates.
