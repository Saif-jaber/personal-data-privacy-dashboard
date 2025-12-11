# ⭐ Personal Data Privacy Dashboard (PDPD)

## 📘 Project Idea
The Personal Data Privacy Dashboard (PDPD) is a web application that helps users understand how their Google account data is accessed, used, and potentially exposed. Many users are unaware of which apps are connected to their accounts, how tracking works, or whether suspicious activity has occurred. PDPD provides a clear, user-friendly dashboard that visualizes privacy risks and offers actionable recommendations.

## 📝 Project Description
Using secure Google OAuth authentication, PDPD scans a user’s Google account and retrieves non-sensitive metadata such as connected applications, permissions, login activity, device history, and tracking settings.  
The system analyzes this information to generate a privacy score, highlight vulnerabilities, and suggest steps for improving account safety.

This project demonstrates skills in API integration, full-stack development, authentication, and designing user-focused privacy tools. It is simple enough for early developers to build, yet strong enough to feature in portfolios.

## ✨ Core Functionalities

### 🔐 Google Login (OAuth 2.0)
- Secure Google sign-in  
- Accesses metadata only  
- Allows the app to scan connected apps and account activity  

### 📱 Connected Apps Scanner
- Lists third-party apps linked to the Google account  
- Shows permission scopes, risk levels, and connection dates  
- Highlights outdated or unnecessary permissions  

### 📊 Privacy Score
- Calculates a score (0–100) based on:  
  - Number of connected apps  
  - High-risk permissions  
  - Missing two-factor authentication  
  - Old or unknown devices  
  - Tracking settings  

### 🛡️ Login Activity Overview
- Displays recent login events  
- Shows device type and approximate country  
- Flags unusual login behavior  

### 💻 Device List
- Lists all devices logged into the account  
- Marks old devices (inactive for 60+ days)  
- Identifies unknown or suspicious devices  

### 👁️ Tracking & Personalization Overview
- Shows tracking settings:  
  - Ad Personalization  
  - Web & App Activity  
  - YouTube History  
- Explains what each setting means  
- Suggests ways to reduce tracking  

### ⚠️ Action Center
- Centralized list of recommended security actions  
- Examples:  
  - Remove high-risk apps  
  - Enable 2FA  
  - Review suspicious logins  
  - Adjust tracking settings  
- Each action includes a description, risk level, and link to Google settings  

### 👤 User Profile Summary
- Shows name, email, profile picture, and account age  
- Displays overall privacy and security status  

### ⚙️ Settings
- Light/Dark mode  
- Refresh scan data  
- Manage connected accounts  

### 📘 Tips & Information
- Simple explanations of permissions, tracking, and online safety  
- Educational content to help users stay secure  

