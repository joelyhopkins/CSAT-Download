# CSAT Automation

Automatically downloads your CSAT Reporting.xlsx file from SharePoint every Monday at 9 AM (MST) and converts it to CSV.

## How It Works

1. **Every Monday at 9 AM MST**, GitHub Actions automatically:
   - Logs into your SharePoint
   - Downloads `CSAT Reporting.xlsx`
   - Converts it to CSV
   - Saves it to the `data/` folder in this repo
   - Commits and pushes the new CSV

2. **You can then**:
   - Download the CSV from the repo
   - Upload it to Claude for analysis
   - Share it with your team

## Setup Complete ✅

Your secrets are already configured:
- `CLAUDE_API_KEY`
- `SHAREPOINT_USERNAME`
- `SHAREPOINT_PASSWORD`

## Manual Trigger

Want to download the CSAT file right now instead of waiting for Monday?

1. Go to your repo on GitHub
2. Click **Actions** (top menu)
3. Click **"Download and Convert CSAT Report"** on the left
4. Click **"Run workflow"**
5. The CSV will be downloaded and saved within seconds

## Next Steps

1. Wait for Monday at 9 AM, or manually trigger it now
2. The CSV file will appear in the `data/` folder
3. Download it and upload to Claude for analysis
4. Share with your team!

## Troubleshooting

If the workflow fails:
1. Go to **Actions** in your repo
2. Click the failed workflow
3. Look at the error message
4. Common issues:
   - Wrong SharePoint credentials
   - File path doesn't exist
   - Network timeout

Let me know if you need help!
