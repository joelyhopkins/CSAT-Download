# GitHub Setup Instructions

You need to add these files to your GitHub repo. Here's how:

## Option 1: Using GitHub Web Interface (Easier)

### Step 1: Add the Workflow File

1. Go to your repo on GitHub
2. Click **Add file** → **Create new file**
3. In the filename field, type: `.github/workflows/csat-download.yml`
4. Copy and paste the contents from the `csat-download.yml` file below
5. Click **Commit changes**

### Step 2: Add the Conversion Script

1. Click **Add file** → **Create new file**
2. In the filename field, type: `scripts/convert.js`
3. Copy and paste the contents from the `convert.js` file below
4. Click **Commit changes**

### Step 3: Add package.json

1. Click **Add file** → **Create new file**
2. In the filename field, type: `package.json`
3. Copy and paste the contents from the `package.json` file below
4. Click **Commit changes**

### Step 4: Add .gitignore

1. Click **Add file** → **Create new file**
2. In the filename field, type: `.gitignore`
3. Copy and paste the contents from the `.gitignore` file below
4. Click **Commit changes**

---

## Option 2: Using Git Command Line (Faster)

If you have Git installed locally:

```bash
# Clone your repo
git clone https://github.com/your-username/csat-automation
cd csat-automation

# Create directories
mkdir -p .github/workflows scripts

# Copy the files (you'll have these from me)
# Then run:
git add .
git commit -m "Add CSAT automation workflow"
git push
```

---

## Test the Workflow

Once files are added:

1. Go to your GitHub repo
2. Click **Actions** (top menu)
3. You should see "Download and Convert CSAT Report"
4. Click it → **Run workflow** (green button)
5. It should download and convert your file within seconds

---

## File Contents

Here are the files you need to add:

### File 1: `.github/workflows/csat-download.yml`
[Copy the content from csat-download.yml in the files below]

### File 2: `scripts/convert.js`
[Copy the content from convert.js in the files below]

### File 3: `package.json`
[Copy the content from package.json in the files below]

### File 4: `.gitignore`
[Copy the content from .gitignore in the files below]

---

## Next Steps

1. Add all 4 files to your GitHub repo
2. Test by manually running the workflow
3. The CSV will appear in the `data/` folder
4. Download and analyze in Claude!
