#!/bin/bash

# Firebase Setup Script for O.P. Veteran Dynamic Website
# This script will help you set up Firebase services and create your first admin

echo "================================================"
echo "   O.P. Veteran Firebase Setup Assistant"
echo "================================================"
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
else
    echo "✅ Firebase CLI is installed"
fi

# Login to Firebase
echo ""
echo "📝 Logging into Firebase..."
echo "A browser window will open for authentication."
firebase login

# Select project
echo ""
echo "🎯 Selecting Firebase project..."
firebase use op-veteran-dynamic --add

# Create .env.local file
echo ""
echo "📋 Let's set up your environment variables"
echo "Please provide your Firebase configuration values:"
echo ""

read -p "Enter your Firebase API Key: " API_KEY
read -p "Enter your Auth Domain: " AUTH_DOMAIN
read -p "Enter your Project ID: " PROJECT_ID
read -p "Enter your Storage Bucket: " STORAGE_BUCKET
read -p "Enter your Messaging Sender ID: " SENDER_ID
read -p "Enter your App ID: " APP_ID
read -p "Enter your Measurement ID (optional, press enter to skip): " MEASUREMENT_ID

# Create .env.local file
cat > .env.local << EOF
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=$API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=$PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=$APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$MEASUREMENT_ID

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=O.P. Veteran
EOF

echo "✅ Environment file created"

# Deploy Firebase rules and indexes
echo ""
echo "📤 Deploying Firebase security rules and indexes..."
firebase deploy --only firestore:rules,storage:rules,firestore:indexes

echo ""
echo "================================================"
echo "   Firebase Setup Complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Run 'npm install' to install dependencies"
echo "2. Run 'npm run dev' to start the development server"
echo "3. We'll create your admin account next"
echo ""
