# 🚀 Complete Setup Guide for O.P. Veteran Website

## Step-by-Step Firebase Configuration

### 1. Enable Firebase Services

Go to your Firebase Console: https://console.firebase.google.com/project/op-veteran-dynamic/

#### A. Enable Authentication
1. Click on **Authentication** in the left menu
2. Click **Get started**
3. Go to **Sign-in method** tab
4. Click on **Email/Password**
5. Toggle **Enable** to ON
6. Click **Save**

#### B. Create Firestore Database
1. Click on **Firestore Database** in the left menu
2. Click **Create database**
3. Select **Start in production mode**
4. Choose location: **nam5 (us-central)** or nearest to you
5. Click **Enable**

#### C. Setup Storage
1. Click on **Storage** in the left menu
2. Click **Get started**
3. Click **Next** (keep default rules for now)
4. Choose same location as Firestore
5. Click **Done**

### 2. Get Your Configuration

1. Click the **gear icon** ⚙️ next to Project Overview
2. Select **Project settings**
3. Scroll down to **Your apps**
4. Click **</> (Web)** icon
5. App nickname: **OP Veteran Web**
6. Check **Also set up Firebase Hosting**
7. Click **Register app**
8. You'll see your config - SAVE THIS:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "op-veteran-dynamic.firebaseapp.com",
  projectId: "op-veteran-dynamic",
  storageBucket: "op-veteran-dynamic.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Local Project Setup

Open your terminal/command prompt:

```bash
# 1. Clone the repository
git clone https://github.com/dieslowAGAIN/op-veteran-dynamic.git
cd op-veteran-dynamic

# 2. Install dependencies
npm install

# 3. Install Firebase CLI globally
npm install -g firebase-tools

# 4. Login to Firebase
firebase login

# 5. Select your project
firebase use op-veteran-dynamic
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory with your Firebase config:

```env
# Replace these with your actual values from Firebase Console
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY_HERE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=op-veteran-dynamic.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=op-veteran-dynamic
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=op-veteran-dynamic.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID_HERE
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID_HERE

# App Configuration (keep as is)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=O.P. Veteran
```

### 5. Deploy Security Rules

```bash
# Deploy Firestore and Storage rules
firebase deploy --only firestore:rules,storage:rules
```

### 6. Start the Development Server

```bash
npm run dev
```

### 7. Create Your Admin Account

1. Open your browser and go to: http://localhost:3000/admin/setup
2. Enter your admin email and password
3. Click "Create Admin"
4. The setup will automatically create default content

### 8. Access Your Site

- **Public Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

---

## 🎨 Step 2: Adding Custom Features

Let me create some additional admin panel pages for better content management:
