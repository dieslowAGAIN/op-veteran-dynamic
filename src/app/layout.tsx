import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { AuthProvider } from '@/lib/auth/context';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
});

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'O.P. Veteran - Taking Care of Our Own',
  description: 'Reconnecting and supporting our nation\'s heroes through community, mental health support, and social connection.',
  keywords: 'veteran support, military, community, mental health, non-profit',
  authors: [{ name: 'O.P. Veteran' }],
  openGraph: {
    title: 'O.P. Veteran - Taking Care of Our Own',
    description: 'Reconnecting and supporting our nation\'s heroes',
    type: 'website',
    locale: 'en_US',
    siteName: 'O.P. Veteran',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'O.P. Veteran',
    description: 'Supporting our nation\'s heroes',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#10B981',
                },
              },
              error: {
                style: {
                  background: '#EF4444',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}