# GitLab Pages Deployment Guide — WiseCases
## WiseAiTechs — For All Medicos

Deploy WiseCases for free using **GitLab Pages**.

---

### Step 1: Create a GitLab Project
1. Log in to [https://gitlab.com](https://gitlab.com).
2. Click **New project** $\rightarrow$ **Create blank project**.
3. Set the Project name to:
   ```text
   wisecases
   ```
4. Set Visibility Level to **Public**.
5. Click **Create project**.

---

### Step 2: Upload Files & Commit
1. In your new GitLab project, click the **+** icon $\rightarrow$ **Upload file** (or push via Git).
2. Ensure you include:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `config.js`
   - `404.html`
   - `.gitlab-ci.yml` (Pre-configured in the repository)
   - `data/` directory
3. Commit your changes to the default branch (`main`).

---

### Step 3: Automatic Pipeline & Pages URL
1. GitLab will immediately detect `.gitlab-ci.yml` and launch a pipeline job under **Build** $\rightarrow$ **Pipelines**.
2. When the job finishes, navigate to:
   ```text
   Deploy ➔ Pages
   ```
3. Your live application URL will be displayed:
   ```text
   https://[your-username].gitlab.io/wisecases
   ```
4. Open the link to start clinical deduction!
