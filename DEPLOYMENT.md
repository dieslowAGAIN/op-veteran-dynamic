# 🚀 Deployment Guide

## Option 1: Deploy to Vercel (Recommended)

Vercel provides the easiest deployment with automatic SSL, global CDN, and seamless Next.js integration.

### Prerequisites
- Vercel account (free at vercel.com)
- GitHub account connected to Vercel

### Step 1: Prepare for Deployment

1. Ensure all your changes are committed:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy: Y
# - Which scope: Select your account
# - Link to existing project: N
# - Project name: op-veteran
# - Directory: ./
# - Build settings: Use defaults
```

### Step 3: Configure Environment Variables in Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add all variables from your `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=op-veteran-dynamic.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=op-veteran-dynamic
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=op-veteran-dynamic.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_NAME=O.P. Veteran
```

### Step 4: Set Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., opveteran.org)
3. Follow DNS configuration instructions

### Step 5: Production Deployment

For production:
```bash
vercel --prod
```

Your site will be live at:
- Vercel URL: https://op-veteran.vercel.app
- Custom domain: https://yourdomain.com (if configured)

---

## Option 2: Deploy to Firebase Hosting

Firebase Hosting is included with your Firebase project and provides good performance.

### Step 1: Build the Application

```bash
# Build for production
npm run build
```

### Step 2: Configure Firebase Hosting

Update `firebase.json`:
```json
{
  "hosting": {
    "public": ".next",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "function": "nextServer"
      }
    ]
  }
}
```

### Step 3: Deploy to Firebase

```bash
# Deploy everything
firebase deploy

# Or just hosting
firebase deploy --only hosting
```

Your site will be live at:
- https://op-veteran-dynamic.web.app
- https://op-veteran-dynamic.firebaseapp.com

### Step 4: Custom Domain (Optional)

1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow the DNS verification steps

---

## Option 3: Deploy with Docker

For self-hosting or cloud providers like AWS, Azure, or DigitalOcean.

### Step 1: Build Docker Image

```bash
# Build the image
docker build -t op-veteran:latest .

# Test locally
docker run -p 3000:3000 --env-file .env.local op-veteran:latest
```

### Step 2: Push to Container Registry

```bash
# Tag for your registry
docker tag op-veteran:latest your-registry/op-veteran:latest

# Push
docker push your-registry/op-veteran:latest
```

### Step 3: Deploy to Cloud Provider

#### AWS ECS
```bash
# Create task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Update service
aws ecs update-service --cluster your-cluster --service op-veteran --task-definition op-veteran:latest
```

#### DigitalOcean App Platform
1. Connect GitHub repository
2. Select Docker as build type
3. Add environment variables
4. Deploy

---

## Post-Deployment Checklist

### 1. Update Firebase Authorized Domains

1. Go to Firebase Console → Authentication → Settings
2. Add your production domain to Authorized domains:
   - your-domain.vercel.app
   - yourdomain.com

### 2. Update Environment Variables

Update `NEXT_PUBLIC_APP_URL` in your deployment:
```
NEXT_PUBLIC_APP_URL=https://your-production-url.com
```

### 3. Configure Firebase Security Rules

Ensure production rules are deployed:
```bash
firebase deploy --only firestore:rules,storage:rules
```

### 4. Set up Monitoring

#### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `src/app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Firebase Performance Monitoring
Already integrated with Firebase SDK.

### 5. Enable Backups

#### Firestore Backups
```bash
# Set up daily backups
gcloud firestore export gs://your-backup-bucket/$(date +%Y%m%d)
```

### 6. SSL Certificate

- **Vercel**: Automatic SSL included
- **Firebase**: Automatic SSL included
- **Custom hosting**: Use Let's Encrypt with Certbot

### 7. Performance Optimization

1. Enable Next.js Image Optimization:
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['firebasestorage.googleapis.com'],
    formats: ['image/avif', 'image/webp'],
  },
};
```

2. Enable Firestore offline persistence:
```javascript
// src/lib/firebase/config.ts
import { enableIndexedDbPersistence } from 'firebase/firestore';

if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log('Multiple tabs open, persistence enabled in first tab only');
    } else if (err.code == 'unimplemented') {
      console.log('Browser doesn't support persistence');
    }
  });
}
```

### 8. SEO Optimization

1. Update metadata in `src/app/layout.tsx`
2. Add sitemap generator:

```javascript
// src/app/sitemap.ts
export default function sitemap() {
  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://yourdomain.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Add more pages
  ];
}
```

3. Add robots.txt:
```txt
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://yourdomain.com/sitemap.xml
```

---

## Monitoring & Maintenance

### Daily Tasks
- Check Firebase Console for errors
- Review contact form submissions
- Monitor site performance

### Weekly Tasks
- Review analytics
- Update blog content
- Check for security updates

### Monthly Tasks
- Review and optimize Firebase usage
- Update team/partner information
- Backup important data
- Security audit

---

## Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Firebase Connection Issues
- Check Firebase project settings
- Verify environment variables
- Check Firebase status: https://status.firebase.google.com

### Performance Issues
- Enable caching headers
- Optimize images
- Use Firebase CDN for static assets
- Enable Firestore indexes

---

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Firebase Docs**: https://firebase.google.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Issues**: https://github.com/dieslowAGAIN/op-veteran-dynamic/issues

---

## Quick Deploy Commands

```bash
# Vercel (Production)
vercel --prod

# Firebase (All services)
firebase deploy

# Firebase (Hosting only)
firebase deploy --only hosting

# Docker Build & Run
docker build -t op-veteran . && docker run -p 3000:3000 op-veteran
```

---

## Congratulations! 🎉

Your O.P. Veteran website is now live and ready to serve the veteran community!

For questions or support, please open an issue on GitHub.
