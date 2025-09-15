'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/context';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading, canView } = useAuth();

  useEffect(() => {
    if (!loading && !canView) {
      router.push('/admin/login');
    }
  }, [loading, canView, router]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!canView) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}