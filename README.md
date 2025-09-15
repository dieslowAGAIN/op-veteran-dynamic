# O.P. Veteran Dynamic Website

A modern, fully dynamic veteran support website with a comprehensive admin panel for complete content management.

## Features

### Public Website
- 🏠 Dynamic homepage with hero section, pillars of support, team, and partners
- 📱 Fully responsive design
- 🎨 Customizable themes and colors
- 📊 Financial transparency section
- 🎥 Media/press section
- 📝 Blog/news system
- 🗓️ Events calendar
- 📧 Contact forms
- 🔍 SEO optimized

### Admin Panel
- 🔐 Secure authentication with role-based access
- 📝 Content Management System (CMS)
  - Page builder with drag-and-drop
  - Rich text editor
  - Media library
  - SEO management
- 👥 Team member management
- 🤝 Partner organization management
- 📰 Blog/news post editor
- 🗓️ Event management
- 📊 Analytics dashboard
- 🎨 Theme customization
- 📧 Form submissions viewer
- 💾 Database backup/restore
- 🔄 Real-time content updates

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Auth, Storage, Functions)
- **Admin Panel**: Custom-built with React
- **Editor**: TipTap (rich text editor)
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI + Custom components
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Deployment**: Vercel/Firebase Hosting

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/op-veteran-dynamic.git
cd op-veteran-dynamic
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a new Firebase project
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Enable Storage
   - Get your configuration keys

4. Configure environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Firebase configuration

5. Initialize Firebase (first time only):
```bash
npm run firebase:init
```

6. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin panel.

### Using Docker

1. Build and run with Docker Compose:
```bash
docker-compose up
```

This will start:
- Next.js app on port 3000
- Firebase emulators on ports 4000 (UI), 8080 (Firestore), 9099 (Auth), 9199 (Storage)

## Project Structure

```
op-veteran-dynamic/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── (public)/        # Public website routes
│   │   ├── admin/           # Admin panel routes
│   │   ├── api/            # API routes
│   │   └── layout.tsx      # Root layout
│   ├── components/         # Reusable components
│   │   ├── ui/            # UI components
│   │   ├── admin/         # Admin-specific components
│   │   └── public/        # Public site components
│   ├── lib/               # Utility functions
│   │   ├── firebase/      # Firebase configuration
│   │   ├── auth/          # Authentication helpers
│   │   └── utils/         # General utilities
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript type definitions
│   └── styles/            # Global styles
├── public/                # Static assets
├── firebase/              # Firebase configuration files
└── docker/                # Docker configuration
```

## Admin Panel Features

### Content Management
- Edit any text, image, or section on the website
- Preview changes before publishing
- Version history and rollback
- Draft/publish workflow

### Media Management
- Upload and organize images/videos
- Automatic image optimization
- CDN delivery via Firebase Storage

### User Management
- Create admin accounts
- Role-based permissions (Super Admin, Editor, Viewer)
- Activity logs

### Analytics
- Page views and user statistics
- Form submission tracking
- Event attendance tracking
- Custom reports

### SEO Management
- Meta tags editor
- Open Graph settings
- Sitemap generation
- Schema.org markup

## Deployment

### Deploy to Vercel
```bash
npm run build
vercel
```

### Deploy to Firebase Hosting
```bash
npm run build
firebase deploy
```

## Security

- Firebase Security Rules for database and storage
- Environment variables for sensitive data
- GitGuardian integration for secret scanning
- Regular dependency updates
- SQL injection prevention
- XSS protection
- CSRF tokens

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@opveteran.org or open an issue in the GitHub repository.