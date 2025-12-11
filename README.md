# 🛡️ Personal Data Privacy Dashboard (PDPD)

A modern web application that helps users understand and manage their digital privacy.  
The dashboard scans your Google account to analyze connected apps, login activity, device sessions, and tracking preferences.  
It then generates a Privacy Score and provides clear recommendations to improve your account security.

---

## 🚀 Features

### 🔐 Google OAuth Login
- Secure sign-in using Google.
- Only safe metadata is accessed (no sensitive content).

### 🧩 Connected Apps Scanner
- Lists all third-party apps connected to the user's Google account.
- Shows permission scopes, risk level, and connection date.
- Highlights apps with excessive or outdated permissions.

### ⭐ Privacy Score
- Generates a score (0–100) using simple evaluation rules.
- Considers:
  - Number of connected apps
  - High-risk permissions
  - Missing 2FA
  - Old/unknown devices
  - Tracking settings

### 📍 Login Activity Overview
- Displays recent login events with device type and location.
- Flags unknown or suspicious login attempts.

### 💻 Active Devices List
- Shows all devices currently logged in to the user's account.
- Marks old or unused devices.
- Helps the user identify risky sessions.

### 👁️ Tracking & Personalization Overview
- Displays high-level tracking settings:
  - Ad personalization
  - Web & App Activity
  - YouTube History
- Provides explanations and recommendations.

### 🧭 Action Center
- Central place listing recommended security improvements.
- Includes direct links to Google Settings pages.
- Prioritized by risk: High / Medium / Low.

### 🙋 User Profile Page
- Shows basic user info (name, email, profile picture).
- Displays account age and security overview.

### ⚙️ Settings Page
- Toggle for dark/light mode.
- Enable or disable notifications.
- Refresh data.

### 📘 Tips & Information Page
- Educational page explaining:
  - Why privacy matters
  - How permissions work
  - How to reduce tracking

---

## 🏗️ System Flow

1. User signs in via Google OAuth.  
2. Backend retrieves metadata using Google APIs.  
3. Data is analyzed and scored.  
4. Dashboard displays insights and warnings.  
5. User views details in the Connected Apps, Devices, or Login Activity pages.  
6. Action Center suggests improvements.  
7. User can follow direct links to update their account settings.

---

## 🛠️ Tech Stack

### Frontend
- React or Next.js  
- Tailwind CSS  
- Recharts / Chart.js  
- Axios  

### Backend
- Node.js + Express  
- Google OAuth 2.0  
- Google People API  
- Google Account Activity endpoints  

### Optional Database
- MongoDB  

### Third-Party Services
- ipinfo.io / ip-api.com (login location)  
- Cron jobs (scheduled scans, optional)

---

## 📦 Installation & Setup

### Clone the repository
```bash
git clone https://github.com/YOUR-USERNAME/personal-data-privacy-dashboard.git
cd personal-data-privacy-dashboard
```

### Install dependencies
Frontend:
```bash
cd client
npm install
```

Backend:
```bash
cd server
npm install
```

### Add environment variables
Create a `.env` file with:
```
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
SESSION_SECRET=your_secret_key
MONGO_URI=your_mongo_connection (optional)
```

### Run the project
Frontend:
```bash
npm run dev
```
Backend:
```bash
npm start
```

---

## 📌 Roadmap (Future Enhancements)
- AI Privacy Advisor  
- Monthly PDF reports  
- More detailed tracking insights  
- Multi-account support  

---

## 📄 License
MIT License — free to use and modify.

---

## ⭐ Acknowledgements
- Google People API  
- Google OAuth 2.0  
- ipinfo.io  
- Chart.js / Recharts  

---

### 🎉 If you like this project, consider giving it a ⭐ on GitHub!
