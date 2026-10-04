# GitHub Pages Deployment Guide — WiseCases
## WiseAiTechs — For All Medicos

Deploy your own live instance of WiseCases for free using **GitHub Pages**. No servers, credit cards, or command lines required.

---

### Step 1: Create a GitHub Account & Repository
1. Go to [https://github.com](https://github.com) and sign in (or create a free account).
2. Click the **+** icon in the top right corner and select **New repository**.
3. Set the repository name to:
   ```text
   wisecases
   ```
4. Choose **Public**.
5. Click **Create repository**.

---

### Step 2: Upload Application Files
1. On the repository page, click **uploading an existing file** (or use Git CLI if you prefer).
2. Drag and drop all files from this `wisecases` directory into the GitHub upload area:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `config.js`
   - `404.html`
   - `.nojekyll`
   - The `.github/` folder containing `workflows/deploy-pages.yml`
   - The `data/` folder
   - The documentation guides
3. In the "Commit changes" box, type: `Initial deployment of WiseCases v2.5`
4. Click **Commit changes**.

---

### Step 3: Enable GitHub Pages
1. In your GitHub repository, click **Settings** (tab with the gear icon).
2. In the left sidebar, click **Pages** (under "Code and automation").
3. Under **Build and deployment**:
   - For **Source**, select:
     ```text
     GitHub Actions
     ```
4. GitHub will automatically detect `.github/workflows/deploy-pages.yml` and trigger a deployment!

---

### Step 4: Access Your Live Application
1. Click the **Actions** tab at the top of your repository.
2. You will see the workflow **Deploy WiseCases to GitHub Pages** running.
3. Once completed (usually 45-60 seconds), your live website URL will be displayed:
   ```text
   https://[your-username].github.io/wisecases/
   ```
4. Share this link with students, residents, and medicos!

---

### Step 5: How to Update Your Application in Future
Whenever you add new clinical cases or modify files:
1. In GitHub, open the file (e.g. `data/cases.json`).
2. Click the pencil icon to edit.
3. Click **Commit changes**.
4. GitHub Actions will automatically re-deploy the updated application in under a minute!
