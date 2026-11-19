/**
 * ================================================================================
 * KYDRO OFFICIAL WEB PORTAL & DISTRIBUTION SERVER
 * Engineered by Kavyansh Gautam (KG)
 * ================================================================================
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Serve static frontend files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Explicit Direct Download Endpoint for KYDRO Android APK
app.get('/download/apk', (req, res) => {
  const apkPath = path.join(__dirname, 'public', 'downloads', 'KYDRO.apk');
  if (fs.existsSync(apkPath)) {
    res.setHeader('Content-Disposition', 'attachment; filename="KYDRO.apk"');
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    return res.sendFile(apkPath);
  }
  return res.status(404).json({ error: 'KYDRO APK not found' });
});

// App update metadata endpoint
app.get('/api/updates', (req, res) => {
  const jsonPath = path.join(__dirname, 'public', 'update.json');
  if (fs.existsSync(jsonPath)) {
    return res.sendFile(jsonPath);
  }
  return res.status(404).json({ error: 'Update metadata not found' });
});

// Route for Web App
app.get('/web', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'web.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    service: 'KYDRO Web Distribution Hub',
    timestamp: new Date().toISOString(),
    cloudBackend: 'https://kynx-backend.onrender.com'
  });
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`💧 KYDRO Web Portal & Hub is Live!`);
    console.log(`🔗 Local URL: http://localhost:${PORT}`);
    console.log(`📱 Web App:  http://localhost:${PORT}/web`);
    console.log(`📥 Download: http://localhost:${PORT}/download/apk`);
    console.log(`======================================================\n`);
  });
}

module.exports = app;
