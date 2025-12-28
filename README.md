# Kubik – Ride Booking Application

Kubik is a full-stack ride booking platform that enables users to book rides with verified drivers. It includes real-time tracking, secure authentication, and an intuitive booking experience. The application demonstrates modern web development with real-time communication and API integrations.

---

## Overview

Kubik is built using the MERN stack and supports real-time features such as live driver location tracking and ride status updates using Socket.io. The backend handles authentication, ride management, and API integrations for mapping and payments.

---

## Features

### User Functionality
- Search and select pickup and drop-off locations
- Real-time driver tracking and ride updates
- Multiple vehicle categories
- Fare estimates before booking
- Ride history and digital receipts
- Profile management

### Driver (Captain) Functionality
- Live ride request notifications
- Navigation assistance with Google Maps
- Earnings tracking and ride history
- Real-time location sharing with users
- Ride status updates and payment notifications

---

## Tech Stack

### Frontend
- React with Vite
- Tailwind CSS for responsive UI
- React Router for navigation
- Google Maps API for location services
- Socket.io for real-time communication

### Backend
- Node.js with Express
- MongoDB for data storage
- Socket.io for real-time updates
- JWT for authentication
- Google Maps API for geolocation services
- Razorpay API for payment processing

---

## Live Demo

**Frontend:** https://kuber-tau.vercel.app  
> Note: Some external APIs (Google Maps, Razorpay) are on limited free plans and may require your own API keys if usage limits are exceeded.

---

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Google Maps API key
- Razorpay API keys

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/Kunal-Gupta28/Kubik.git
cd Kubik


## Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/kubik.git
cd kubik
```

### 2. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Environment variables

#### Backend `.env`
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

#### Frontend `.env`
```env
VITE_BASE_URL=http://localhost:5000
VITE_RAZORPAY_API_KEY=your_razorpay_api_key
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## Running the Application

### Start backend server
```bash
cd backend
npm run dev
```

### Start frontend development server
```bash
cd frontend
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
kubik/
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── context/           # React context providers
│   │   ├── pages/             # Page components
│   │   ├── utils/             # Utility functions
│   │   └── App.jsx            # Main app entry
│   └── package.json
├── backend/
│   ├── controllers/           # Business logic
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API routes
│   ├── middleware/            # Custom middlewares
│   ├── utils/                 # Helper functions
│   └── server.js              # Server entry point
└── README.md
```
