#!/bin/bash

# Auto-Setup Script for O.P. Veteran
echo "================================================"
echo "   🚀 O.P. Veteran Automated Setup"
echo "================================================"
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "✅ Environment file found"
else
    echo "❌ .env.local not found"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install Firebase tools globally if not installed
if ! command -v firebase &> /dev/null; then
    echo "🔧 Installing Firebase CLI..."
    npm install -g firebase-tools
fi

echo ""
echo "================================================"
echo "   ✅ Setup Complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Run this command to login to Firebase:"
echo "   firebase login"
echo ""
echo "2. Select your project:"
echo "   firebase use op-veteran-dynamic"
echo ""
echo "3. Deploy security rules:"
echo "   firebase deploy --only firestore:rules,storage:rules"
echo ""
echo "4. Start the development server:"
echo "   npm run dev"
echo ""
echo "5. Create your admin account at:"
echo "   http://localhost:3000/admin/setup"
echo ""
echo "Your Firebase config is ready to use!"
