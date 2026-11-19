# 💧 KYDRO - Official Web Portal & Release Distribution Hub

> **TRACK EVERY DROP.**  
> Real-Time Drinking Water Delivery Attendance, Multi-Home Sync & Hisaab Calculator.  
> Engineered by **Kavyansh Gautam (KG)**.

---

## 🌟 Key Features

1. **Futuristic 3D Obsidian Neon Landing Page:**
   - 3D Neon Metallic Logo & Liquid Cyan Aesthetics.
   - Interactive Water Bill Hisaab Simulator (₹25 per 20L Camper).
   - 1-Click Direct Android APK Download.
   - Feature Grid: 10+ Phones Cloud Sync, Zero Conflict Guard, Multi-Home Switching.

2. **KYDRO Web Portal (`/web`):**
   - Full functional live web version of KYDRO!
   - Real-time WebSocket connection to Render Cloud (`wss://kynx-backend.onrender.com`).
   - Works on any Laptop, Mac, iPhone or Android browser without installing the app.
   - Live Today Status, PAANI AA GAYA / ABSENT actions with conflict warnings.
   - Monthly Hisaab & bill calculation with WhatsApp Share.

3. **Cloud Endpoints:**
   - `/` - Official Landing Page
   - `/web` - Live Web App Portal
   - `/download/apk` - Direct APK download (`KYDRO.apk`)
   - `/api/updates` - JSON metadata for APK updates
   - `/api/health` - Server health status

---

## 🚀 Quick Start (Local Run)

```bash
cd KYDRO-Website
npm install
node server.js
```

Open browser at `http://localhost:3002` (Landing Page) or `http://localhost:3002/web` (Live Web App).

---

## 🌐 Deploy to Vercel (1-Click)

This project has a pre-configured `vercel.json`:

```bash
npm i -g vercel
vercel --prod
```

Or connect the repository on [vercel.com](https://vercel.com) to deploy automatically!
