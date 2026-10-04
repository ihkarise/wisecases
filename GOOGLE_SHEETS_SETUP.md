# Google Sheets Backend Setup Guide — WiseCases
## WiseAiTechs — For All Medicos

WiseCases can operate with an optional, 100% free Google Sheets database powered by Google Apps Script. This enables centralized curriculum management and cloud results tracking without paid database servers.

---

### Step 1: Create a New Google Spreadsheet
1. Open your web browser and navigate to [https://sheets.new](https://sheets.new).
2. Name your spreadsheet:
   ```text
   WiseCases Database
   ```

---

### Step 2: Open Google Apps Script
1. In the Google Sheets top menu, click:
   ```text
   Extensions ➔ Apps Script
   ```
2. A new tab will open with the Google Apps Script project editor.
3. Rename the project in the top left to:
   ```text
   WiseCases Backend API
   ```

---

### Step 3: Copy the Generated Apps Script Files
In the Apps Script editor, open the left files list:
1. Delete the default empty function in `Code.gs`.
2. Copy and paste the contents from each file in the `apps-script/` directory into Apps Script:
   - `Code.gs` $\rightarrow$ paste into `Code.gs`
   - Click the **+** icon $\rightarrow$ **Script** $\rightarrow$ name it `Config` $\rightarrow$ paste `apps-script/Config.gs`
   - Click **+** $\rightarrow$ **Script** $\rightarrow$ name it `Sheets` $\rightarrow$ paste `apps-script/Sheets.gs`
   - Click **+** $\rightarrow$ **Script** $\rightarrow$ name it `Utils` $\rightarrow$ paste `apps-script/Utils.gs`
   - Click **+** $\rightarrow$ **Script** $\rightarrow$ name it `Cases` $\rightarrow$ paste `apps-script/Cases.gs`
   - Click **+** $\rightarrow$ **Script** $\rightarrow$ name it `Game` $\rightarrow$ paste `apps-script/Game.gs`
   - Click **+** $\rightarrow$ **Script** $\rightarrow$ name it `Results` $\rightarrow$ paste `apps-script/Results.gs`
   - Click **+** $\rightarrow$ **Script** $\rightarrow$ name it `Admin` $\rightarrow$ paste `apps-script/Admin.gs`
3. Click the **Save Project** (floppy disk) icon or press `Ctrl + S` / `Cmd + S`.

---

### Step 4: Run Database Initializer (`setupDatabase`)
1. At the top of the Apps Script toolbar, locate the function dropdown (where it says `select function`).
2. Select **`setupDatabase`**.
3. Click **Run**.
4. A popup will appear asking for **Authorization Required**:
   - Click **Review permissions**.
   - Select your Google account.
   - Click **Advanced** $\rightarrow$ click **Go to WiseCases Backend API (unsafe)**.
   - Click **Allow**.
5. Return to your Google Sheet: All 10 required database tabs (`CASES`, `STAGES`, `ANSWERS`, `EXPLANATIONS`, `LEARNING_POINTS`, `REFERENCES`, `INVESTIGATIONS`, `DIFFERENTIALS`, `RESULTS`, `SETTINGS`) have been automatically constructed with headers and formatted colors!

---

### Step 5: Deploy as Web App
1. In Apps Script, click the blue button in the top right:
   ```text
   Deploy ➔ New deployment
   ```
2. In the modal, click the gear icon next to "Select type" and choose:
   ```text
   Web app
   ```
3. Configure the following settings:
   - **Description**: `WiseCases Production API v2.5`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Crucial so learners can submit diagnostic answers)*
4. Click **Deploy**.
5. Copy the generated **Web app URL** (it ends with `/exec`).

---

### Step 6: Connect WiseCases Frontend to Your Google Backend
1. Open WiseCases in your web browser.
2. Click **Settings** in the top navigation bar.
3. Under **Data Persistence Mode**, select:
   ```text
   Google Sheets Mode
   ```
4. In the **Google Apps Script Web App URL** input box, paste the URL you copied in Step 5.
5. Click:
   ```text
   Test Connection
   ```
6. You will see:
   ```text
   CONNECTED ✓
   ```
   with the live server response.

You are now running on Google Sheets Cloud Mode!
