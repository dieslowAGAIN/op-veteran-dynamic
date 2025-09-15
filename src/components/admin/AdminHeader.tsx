'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/context';
import { Shield, Bell, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link href="/admin" className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-veteran-gold" />
          <span className="font-heading font-bold text-xl text-veteran-navy">
            Admin Panel
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* View Site Button */}
          <Link
            href="/"
            target="_blank"
            className="hidden md:block text-sm text-gray-600 hover:text-gray-900"
          >
            View Site
          </Link>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {notificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setNotificationsOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-20">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-4 text-center text-gray-500">
                      No new notifications
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-veteran-gold/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-veteran-gold" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.displayName || user?.email?.split('@')[0]}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-20">
                  <div className="p-4 border-b">
                    <p className="font-medium text-gray-900">
                      {user?.displayName || 'Admin User'}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user?.email}
                    </p>
                    <p className="text-xs text-veteran-gold mt-1 capitalize">
                      {user?.role?.replace('_', ' ')}
                    </p>
                  </div>
                  <div className="p-2">
                    <Link
                      href="/admin/profile"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link
                      href="/admin/settings"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}