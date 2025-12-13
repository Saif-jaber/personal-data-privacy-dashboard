# DataLens
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![OAuth](https://img.shields.io/badge/Auth-OAuth%202.0-green?logo=google)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-In%20Development-orange)

### Personal Data Privacy Dashboard

> Visualize how your Google account data is accessed, used, and exposed.

---

## 📘 Overview

**DataLens** is a web-based **Personal Data Privacy Dashboard** designed to help users **understand, monitor, and evaluate how their Google account data is accessed and used**.

Many users are unaware of which third-party applications are connected to their accounts, what permissions they have granted, how tracking settings affect their privacy, or whether suspicious activity has occurred.  
DataLens addresses this problem by providing a **clear, user-friendly dashboard** that visualizes privacy risks and offers **actionable recommendations**.

This project focuses on **visibility and awareness**, not enforcement or protection, empowering users to make informed privacy decisions.

---

## 🎯 Project Goals

- Increase user awareness of personal data access and tracking
- Visualize account activity and privacy risks in a clear dashboard
- Provide meaningful privacy insights without accessing sensitive content
- Demonstrate full-stack development, API integration, and authentication skills

---

## 🔐 Authentication & Data Access

DataLens uses **Google OAuth 2.0** for secure authentication.

- Secure Google sign-in
- Accesses **non-sensitive metadata only**
- No emails, files, or private content are read or stored
- All data is used strictly for visualization and analysis

---

## ✨ Core Features

### 🔑 Google Login (OAuth 2.0)
- Secure authentication via Google
- Permission-based access to account metadata
- User-controlled sign-in and sign-out

---

### 📱 Connected Apps Scanner
- Lists third-party applications linked to the Google account
- Displays:
  - Permission scopes
  - Connection dates
  - Risk indicators
- Highlights outdated or unnecessary app permissions

---

### 📊 Privacy Score
A calculated score from **0 to 100** based on:
- Number of connected applications
- Presence of high-risk permissions
- Two-factor authentication status
- Device activity and age
- Tracking and personalization settings

---

### 🛡️ Login Activity Overview
- Displays recent login events
- Shows device type and approximate country
- Flags unusual or suspicious login behavior

---

### 💻 Device List
- Lists all devices currently signed into the account
- Marks inactive devices (60+ days)
- Highlights unknown or potentially suspicious devices

---

### 👁️ Tracking & Personalization Insights
- Visual overview of Google tracking settings:
  - Ad Personalization
  - Web & App Activity
  - YouTube History
- Clear explanations of what each setting means
- Suggestions for reducing tracking

---

### ⚠️ Action Center
A centralized list of recommended actions, such as:
- Removing high-risk connected apps
- Enabling two-factor authentication
- Reviewing suspicious login activity
- Adjusting tracking settings

Each action includes:
- Risk level
- Clear explanation
- Direct link to relevant Google settings

---

### 👤 User Profile Summary
- Displays:
  - Name
  - Email
  - Profile picture
  - Account age
- Shows overall privacy and security status at a glance

---

### ⚙️ Settings
- Light / Dark mode
- Manual data refresh
- Manage connected accounts

---

### 📘 Privacy Tips & Education
- Simple explanations of:
  - App permissions
  - Tracking mechanisms
  - Online privacy concepts
- Educational content to help users make informed decisions

---

## 🧠 Why DataLens?

- Focuses on **privacy visibility**, not enforcement
- User-friendly and educational
- Scalable to support additional platforms in the future
- Suitable for portfolio and real-world use cases

---

## 🛠️ Technologies Used

- **Frontend:** React
- **Backend:** Node.js / Express
- **Authentication:** Google OAuth 2.0
- **APIs:** Google Account & Activity APIs
- **Database:** MongoDB or PostgreSQL
- **Styling:** CSS (Responsive Design)

---

## 🚀 Future Improvements

- Support for additional platforms (GitHub, Meta, Apple ID)
- Historical privacy score trends
- Exportable privacy reports
- Notification system for unusual account activity
- Admin dashboard for analytics (demo mode)

---

## 📄 Disclaimer

DataLens is an educational and analytical tool.  
It does **not** modify Google account settings directly and does **not** provide active protection or security enforcement.

---

## 👨‍💻 Author

Developed as a portfolio project to demonstrate skills in:

- Full-stack web development  
- Secure authentication  
- API integration  
- Privacy-focused UI/UX design  
