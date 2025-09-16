'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { COLLECTIONS } from '@/lib/firebase/collections';
import { Shield, Check, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const createFirstAdmin = async () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Add to admin_users collection
      await setDoc(doc(db, COLLECTIONS.ADMIN_USERS, user.uid), {
        email: formData.email,
        displayName: formData.displayName || formData.email.split('@')[0],
        role: 'super_admin',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Create default content
      await initializeDefaultContent();
      
      setStep(3);
      setTimeout(() => {
        router.push('/admin');
      }, 3000);
    } catch (err: any) {
      console.error('Setup error:', err);
      setError(err.message || 'Failed to create admin account');
    } finally {
      setLoading(false);
    }
  };

  const initializeDefaultContent = async () => {
    // Site settings
    await setDoc(doc(db, COLLECTIONS.SITE_SETTINGS, 'default'), {
      siteName: 'O.P. Veteran',
      tagline: 'Taking care of our own',
      ein: '81-4477452',
      email: 'info@opveteran.org',
      createdAt: new Date(),
    });

    // Hero content
    await setDoc(doc(db, COLLECTIONS.HERO_CONTENT, 'main'), {
      title: 'Welcome to O.P. Veteran',
      subtitle: 'Taking care of our own. Reconnecting and supporting our nation\'s heroes.',
      ctaText: 'Join Our Community',
      ctaLink: '/get-involved',
      isActive: true,
      createdAt: new Date(),
    });

    // Default pillars
    const pillars = [
      {
        title: 'Social Connection',
        description: 'Reconnect with fellow veterans through online communities and local events.',
        icon: 'users',
        order: 1,
        isActive: true,
      },
      {
        title: 'Community Involvement',
        description: 'Get involved in your local community through volunteering.',
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

    for (let i = 0; i < pillars.length; i++) {
      await setDoc(doc(db, COLLECTIONS.PILLARS, `pillar_${i + 1}`), {
        ...pillars[i],
        createdAt: new Date(),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-veteran-navy via-veteran-blue to-veteran-navy flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Shield className="w-16 h-16 text-veteran-gold" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Initial Setup</h1>
          <p className="text-gray-600 mt-2">Create your first admin account</p>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veteran-gold focus:border-veteran-gold"
                placeholder="admin@opveteran.org"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veteran-gold focus:border-veteran-gold"
                placeholder="John Doe"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!formData.email}
              className="w-full bg-veteran-navy hover:bg-veteran-blue text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veteran-gold focus:border-veteran-gold"
                placeholder="Minimum 6 characters"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-veteran-gold focus:border-veteran-gold"
                placeholder="Re-enter password"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                onClick={createFirstAdmin}
                disabled={loading || !formData.password || !formData.confirmPassword}
                className="flex-1 bg-veteran-gold hover:bg-yellow-500 text-veteran-navy font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Admin'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Setup Complete!</h2>
              <p className="text-gray-600">Your admin account has been created successfully.</p>
              <p className="text-sm text-gray-500 mt-2">Redirecting to admin panel...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}