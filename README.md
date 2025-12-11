Project Description

The Personal Data Privacy Dashboard is a web application that provides users with a clear overview of their Google account’s privacy and security status. Many users are unaware of how many third-party applications have access to their account, what permissions those apps hold, or where their account has recently been used. This project organizes that information into a simple dashboard to help users identify potential risks and understand how their data is being accessed.

The application uses Google OAuth to retrieve safe, non-sensitive metadata such as connected applications, device sessions, login activity, and high-level tracking settings. The system then analyzes this data to generate a basic Privacy Score and highlight areas that may require attention. The goal is to make account privacy easier to understand, even for non-technical users.

Features
• Google Authentication

Secure login using Google OAuth 2.0. The application only accesses metadata required for the privacy analysis.

• Connected Applications Overview

Displays all third-party apps linked to the user’s Google account, along with their permission scopes, connection dates, and simple risk indicators.

• Privacy Score

Calculates a score (0–100) based on:

Number of connected apps

High-risk permissions

Old or unknown devices

Tracking settings

Two-factor authentication status

• Login Activity

Shows recent login events with device type and approximate location. Highlights unusual or unfamiliar activity.

• Active Devices

Lists all devices currently logged into the user’s Google account and marks any that appear inactive or unrecognized.

• Tracking & Personalization Overview

Indicates the status of major tracking options such as ad personalization, Web & App Activity, and YouTube History.

• Action Center

Provides straightforward recommendations based on the user’s privacy status, with direct links to the appropriate Google settings pages.

• User Profile Summary

Displays basic account information such as name, email, profile photo, and account age.

• Information Pages

Includes simple explanations about how permissions, tracking features, and device sessions work, helping users understand their privacy data.
