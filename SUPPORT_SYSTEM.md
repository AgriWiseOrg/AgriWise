# AgriWise Support System v2.0

Comprehensive multi-role support ecosystem for Farmers, Buyers, and Administrators.

## Overview
The AgriWise Support System is a sophisticated, multilingual platform designed to bridge the gap between agricultural producers and enterprise buyers. It integrates real-time weather intelligence, market diagnostics, and a robust dispute resolution mechanism.

---

## Key Components

### 1. Unified Backend (/backend/routes/support.js)
- **Weather API Integration**: Fetches real-time localized weather from Open-Meteo.
- **Agricultural Intelligence Engine**: Generates crop-specific advisories based on thermodynamic logic.
- **Complaint Management**: Handles POST requests for general queries and transaction disputes.
- **Multilingual Support**: Built-in translation layer for 8+ Indian languages.

### 2. Farmer Dashboard (/frontend/src/components/Support.jsx)
- **Diagnostic Assistant**: AI-driven weather alerts and localized advisories.
- **Resource Center**: Links to Government schemes and market intelligence.
- **Multilingual UI**: Toggle between Hindi, Telugu, Tamil, Kannada, Marathi, Malayalam, and Bengali.

### 3. Buyer Portal (/frontend/src/components/BuyerSupport.jsx)
- **Procurement Engine**: Specialized support for bulk bidding and e-auctions.
- **Logistics Integration**: Real-time fleet tracking and cold-chain monitoring.
- **Quality Standards**: Access to grading charts (A+, A, B) and certification protocols.

### 4. Admin Command Center (/frontend/src/components/AdminSupport.jsx)
- **Live Monitoring**: Real-time ticker for pending reports.
- **RBAC Filtering**: Categorize incoming issues into "Queries" or "Disputes".
- **Resolution Workflow**: Dedicated tools for auditing and closing support tickets.

---

## Features

- **Precision Advisories**: Weather alerts tailored to specific crops (Rice, Wheat, Tomato, etc.).
- **Smart TTS**: Integrated Text-to-Speech for localized agricultural advice.
- **Secure Disputes**: Multi-signature ready escrow conflict resolution reporting.
- **Premium UI**: Built with Tailwind CSS and Framer Motion for a glassmorphic/modern aesthetic.

---

## API Endpoints

### Support & Grievances
- `POST /api/support/query`: Register a general inquiry.
- `POST /api/support/dispute`: Raise a transaction issue.
- `GET /api/support/all-reports`: (Admin) Fetch all history.

### Intelligence
- `GET /api/support/weather`: Regional weather + crop advisory.
- `GET /api/support/advisory`: General farmer announcements.

---

## Data Models

### Complaint Schema (/backend/models/Complaint.js)
```javascript
{
  type: { enum: ['query', 'dispute'] },
  userName: String,
  userEmail: String,
  subject: String,
  details: Mixed (Generic Message or Order Details),
  status: { enum: ['pending', 'in-progress', 'resolved'] },
  createdAt: Date
}
```

---

## Tech Stack
- **Frontend**: React 18, Vite, Framer Motion, Lucide Icons, Tailwind CSS.
- **Backend**: Node.js, Express, Mongoose.
- **API Support**: Axios, Open-Meteo SDK.
- **Icons/Visuals**: SVGs, Lottie-style CSS animations.
