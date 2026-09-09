#!/usr/bin/env node

const axios = require('axios');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Configuration from environment variables
const config = {
  username: process.env.SHAREPOINT_USERNAME,
  password: process.env.SHAREPOINT_PASSWORD,
  tenant: 'snapfinancellc',
  site: 'Snap-Finance',
  folderPath: "Process Improvement and Program Development/PIPD Team Files/Process Documentation",
  fileName: 'CSAT Reporting.xlsx',
};

console.log('📥 Starting CSAT download and conversion...\n');

// Validate credentials
if (!config.username || !config.password) {
  console.error('❌ Missing SharePoint credentials in environment variables');
  process.exit(1);
}

async function downloadFromSharePoint() {
  try {
    console.log('🔗 Connecting to SharePoint...');
    
    const siteUrl = `https://${config.tenant}.sharepoint.com/sites/${config.site}`;
    const encodedPath = config.folderPath
      .split('/')
      .map(part => encodeURIComponent(part))
      .join('/');
    
    const fileUrl = `${siteUrl}/_api/web/GetFolderByServerRelativeUrl('${encodedPath}')/Files('${config.fileName}')/$value`;
    
    const auth = Buffer.from(`${config.username}:${config.password}`).toString('base64');
    
    const response = await axios.get(fileUrl, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/octet-stream',
      },
      responseType: 'arraybuffer',
      timeout: 30000,
    });
    
    console.log(`✓ Downloaded: ${config.fileName}`);
    return response.data;
    
  } catch (error) {
    if (error.response?.status === 401) {
      console.error('❌ Authentication failed - check your SharePoint username/password');
    } else if (error.response?.status === 404) {
      console.error('❌ File not found - check folder path and filename');
    } else {
      console.error(`❌ Download failed: ${error.message}`);
    }
    process.exit(1);
  }
}

function convertToCSV(excelBuffer) {
  try {
    console.log('📊 Converting Excel to CSV...');
    
    const workbook = XLSX.read(excelBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const csv = XLSX.utils.sheet_to_csv(sheet);
    
    console.log(`✓ Converted sheet: "${sheetName}"`);
    return csv;
    
  } catch (error) {
    console.error(`❌ Conversion failed: ${error.message}`);
    process.exit(1);
  }
}

function saveCSV(csvContent) {
  try {
    const date = new Date().toISOString().split('T')[0];
    const fileName = `CSAT_Reporting_${date}.csv`;
    const filePath = path.join(process.cwd(), 'data', fileName);
    
    // Ensure data directory exists
    if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
      fs.mkdirSync(path.join(process.cwd(), 'data'), { recursive: true });
    }
    
    fs.writeFileSync(filePath, csvContent, 'utf-8');
    
    console.log(`✓ Saved to: ${fileName}`);
    console.log(`\n✅ Success! CSV is ready for analysis.\n`);
    
  } catch (error) {
    console.error(`❌ Save failed: ${error.message}`);
    process.exit(1);
  }
}

async function main() {
  try {
    const excelBuffer = await downloadFromSharePoint();
    const csvContent = convertToCSV(excelBuffer);
    saveCSV(csvContent);
  } catch (error) {
    console.error(`❌ Unexpected error: ${error.message}`);
    process.exit(1);
  }
}

main();
