#!/bin/bash

# O.P. Veteran - Quick Setup Script
# This script automates the Firebase setup process

echo "================================================"
echo "   🚀 O.P. Veteran Quick Setup"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm is installed${NC}"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo ""
    echo -e "${YELLOW}Firebase CLI not found. Installing...${NC}"
    npm install -g firebase-tools
fi

echo -e "${GREEN}✅ Firebase CLI is ready${NC}"

# Create .env.local file
echo ""
echo "🔧 Setting up environment variables..."
echo ""
echo "Please provide your Firebase configuration:"
echo "(You can find these in Firebase Console > Project Settings)"
echo ""

read -p "Firebase API Key: " API_KEY
read -p "Firebase Auth Domain [op-veteran-dynamic.firebaseapp.com]: " AUTH_DOMAIN
AUTH_DOMAIN=${AUTH_DOMAIN:-op-veteran-dynamic.firebaseapp.com}

read -p "Firebase Project ID [op-veteran-dynamic]: " PROJECT_ID
PROJECT_ID=${PROJECT_ID:-op-veteran-dynamic}

read -p "Firebase Storage Bucket [op-veteran-dynamic.appspot.com]: " STORAGE_BUCKET
STORAGE_BUCKET=${STORAGE_BUCKET:-op-veteran-dynamic.appspot.com}

read -p "Firebase Messaging Sender ID: " SENDER_ID
read -p "Firebase App ID: " APP_ID

# Create .env.local
cat > .env.local << EOF
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=$API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=$PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=$SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=$APP_ID

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=O.P. Veteran
EOF

echo -e "${GREEN}✅ Environment variables configured${NC}"

# Firebase login
echo ""
echo "🔐 Logging into Firebase..."
firebase login

# Use Firebase project
echo ""
echo "📌 Setting Firebase project..."
firebase use $PROJECT_ID

# Deploy Firebase rules
echo ""
echo "🚀 Deploying Firebase security rules..."
firebase deploy --only firestore:rules,storage:rules,firestore:indexes

echo ""
echo "================================================"
echo -e "${GREEN}   ✅ Setup Complete!${NC}"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. Run 'npm run dev' to start the development server"
echo "2. Open http://localhost:3000/admin/setup"
echo "3. Create your admin account"
echo "4. Start customizing your website!"
echo ""
echo "Quick commands:"
echo "  npm run dev        - Start development server"
echo "  npm run build      - Build for production"
echo "  vercel             - Deploy to Vercel"
echo "  firebase deploy    - Deploy to Firebase"
echo ""
echo "Need help? Check out:"
echo "  - FIREBASE_SETUP.md for detailed Firebase setup"
echo "  - DEPLOYMENT.md for deployment instructions"
echo "  - README.md for general documentation"
echo ""
