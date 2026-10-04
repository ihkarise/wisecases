# Non-Coder Complete Setup Guide — WiseCases
## WiseAiTechs — For All Medicos

Welcome to **WiseCases**! You do **NOT** need any coding experience, servers, or paid subscriptions to run or manage this medical learning platform.

Follow these simple steps:

---

### OPTION 1: Run WiseCases on Your Computer (Fastest — 30 Seconds)

#### STEP 1
Open the `wisecases` folder on your computer.

#### STEP 2
Double-click the file named:
```text
index.html
```

#### STEP 3
WiseCases will open directly in Google Chrome, Microsoft Edge, Safari, or Firefox!

> **DO NOT DO THIS**: Do not open individual JavaScript or CSS files in a text editor to play. Simply open `index.html` in your web browser.

---

### OPTION 2: Run Using Local Python Server (Recommended for Full Media Support)

If your computer has Python installed:

#### STEP 1
Open your command terminal or PowerShell inside the `wisecases` folder.

#### STEP 2
**COPY THIS**:
```bash
python -m http.server 8000
```
Paste it into your terminal and press **Enter**.

#### STEP 3
Open your web browser and navigate to:
```text
http://localhost:8000
```

---

### OPTION 3: How to Play a Case as a Learner

#### STEP 1
On the Home screen, **CLICK THIS**:
```text
START A CASE
```
or choose **Case Library** from the top menu.

#### STEP 2
Select any patient scenario (for example, *CASE-005: The Hidden Liver Disease*) and **CLICK THIS**:
```text
PLAY CASE
```

#### STEP 3
Read the Stage 1 clinical clue carefully.

#### STEP 4
In the diagnosis box, type your working diagnosis and **CLICK THIS**:
```text
SUBMIT DIAGNOSIS
```

#### STEP 5
- If your answer is incorrect: Read the targeted feedback explaining what you missed. Then **CLICK THIS** to see the next clue:
  ```text
  CONTINUE TO NEXT STAGE
  ```
  or **CLICK THIS** to see the final answer immediately:
  ```text
  SHOW THE ANSWER
  ```
- If your answer is correct: **CLICK THIS** to review the full debrief:
  ```text
  SHOW COMPLETE ANSWER
  ```

---

### OPTION 4: How to Create a New Case (No Coding Required)

#### STEP 1
In the top menu, **CLICK THIS**:
```text
Case Manager
```

#### STEP 2
**CLICK THIS**:
```text
+ New Case
```

#### STEP 3
Fill in the form:
- Enter Case ID (e.g. `CASE-009`)
- Enter Case Title
- Enter Patient Age, Sex, and Chief Complaint
- Add progressive stages with clues
- Enter the canonical diagnosis and accepted synonyms
- Add diagnostic reasoning steps and differential diagnoses

#### STEP 4
**CLICK THIS**:
```text
Save Clinical Case
```
Your case is now saved and available in your library!
