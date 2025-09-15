# O.P. Veteran Dynamic Website - Setup Guide

## Prerequisites

- Node.js 18+ and npm installed
- Git installed
- VS Code (recommended)
- Firebase CLI installed globally: `npm install -g firebase-tools`

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/dieslowAGAIN/op-veteran-dynamic.git
cd op-veteran-dynamic
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

#### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "op-veteran" or similar
4. Follow the setup wizard

#### Enable Required Services

1. **Authentication**
   - Go to Authentication > Sign-in method
   - Enable "Email/Password"

2. **Firestore Database**
   - Go to Firestore Database
   - Click "Create database"
   - Start in production mode
   - Choose your region

3. **Storage**
   - Go to Storage
   - Click "Get started"
   - Start in production mode

#### Get Your Configuration

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click "Add app" > Web (</> icon)
4. Register your app with a nickname
5. Copy the configuration object

### 4. Environment Configuration

1. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Fill in your Firebase configuration in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 5. Firebase CLI Setup

1. Login to Firebase:

```bash
firebase login
```

2. Initialize Firebase in your project:

```bash
firebase init
```

Select:
- Firestore
- Hosting
- Storage
- Emulators (optional, for local development)

3. Deploy Firebase rules:

```bash
firebase deploy --only firestore:rules,storage:rules
```

### 6. Create Initial Admin User

1. Start the development server:

```bash
npm run dev
```

2. Go to Firebase Console > Authentication
3. Click "Add user"
4. Enter email and password for your admin account
5. Copy the User UID

6. Go to Firestore Database and create a collection called `admin_users`
7. Add a document with the User UID as the document ID
8. Add these fields:
   - `email`: (your admin email)
   - `role`: `super_admin`
   - `isActive`: `true`
   - `createdAt`: (timestamp)
   - `updatedAt`: (timestamp)

### 7. Initialize Default Content (Optional)

Create a file called `scripts/initialize-content.js` and run it:

```javascript
const admin = require('firebase-admin');

// Initialize admin SDK with your service account
admin.initializeApp();

const db = admin.firestore();

async function initializeContent() {
  // Create default hero section
  await db.collection('hero_content').add({
    title: 'Welcome to O.P. Veteran',
    subtitle: 'Taking care of our own. Reconnecting and supporting our nation\'s heroes.',
    ctaText: 'Join Our Community',
    ctaLink: '/get-involved',
    isActive: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Create default pillars
  const pillars = [
    {
      title: 'Social Connection',
      description: 'Reconnect with fellow veterans through online communities, social media groups, and local events.',
      icon: 'users',
      order: 1,
      isActive: true,
    },
    {
      title: 'Community Involvement',
      description: 'Get involved in your local community through volunteering and shared activities.',
      icon: 'heart',
      order: 2,
      isActive: true,
    },
    {
      title: 'Mental Health',
      description: 'Seeking help is a sign of strength. We provide resources and support.',
      icon: 'shield',
      order: 3,
      isActive: true,
    },
  ];

  for (const pillar of pillars) {
    await db.collection('pillars').add({
      ...pillar,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  console.log('Default content initialized successfully!');
}

initializeContent();
```

## Development

### Running Locally

```bash
npm run dev
```

Visit:
- Website: http://localhost:3000
- Admin Panel: http://localhost:3000/admin

### Using Docker

```bash
docker-compose up
```

This will start:
- Next.js app on port 3000
- Firebase emulators (if configured)

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard

### Deploy to Firebase Hosting

1. Build the application:
```bash
npm run build
npm run export
```

2. Deploy to Firebase:
```bash
firebase deploy --only hosting
```

## Admin Panel Features

### Content Management
- Edit homepage sections
- Manage blog posts
- Update team members
- Manage partners
- Upload media

### User Management
- Create admin accounts
- Set user roles:
  - `super_admin`: Full access
  - `admin`: Most features except user management
  - `editor`: Content editing only
  - `viewer`: Read-only access

### Analytics
- View page statistics
- Track form submissions
- Monitor user activity

## Security

### GitGuardian Setup

1. Sign up at [GitGuardian](https://www.gitguardian.com/)
2. Install the GitHub app
3. It will automatically scan for secrets

### Best Practices

- Never commit `.env.local` or any file with secrets
- Use Firebase Security Rules properly
- Regularly update dependencies
- Enable 2FA on Firebase and GitHub accounts
- Regularly backup Firestore data

## Troubleshooting

### Common Issues

1. **"Firebase app not initialized"**
   - Check your environment variables
   - Ensure `.env.local` exists and is filled

2. **"Permission denied" in Firestore**
   - Check Firebase security rules
   - Ensure user has proper role in `admin_users`

3. **Images not loading**
   - Check Firebase Storage rules
   - Ensure domains are added to Next.js config

4. **Build errors**
   - Clear `.next` folder: `rm -rf .next`
   - Clear node_modules: `rm -rf node_modules && npm install`

## Support

For issues or questions:
1. Check the documentation
2. Open an issue on GitHub
3. Contact the development team

## License

MIT License - See LICENSE file for details