'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { clearTokens } from '@/lib/tokens';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, loaded, logout } = useAuth();

  useEffect(() => {
    if (loaded && !isAuthenticated) {
      router.push('/');
    }
  }, [loaded, isAuthenticated, router]);

  function handleLogout() {
    clearTokens();
    logout();
    router.push('/');
  }

  if (!loaded) return null;
  if (!isAuthenticated) return null;

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <main className="flex-1">{children}</main>
    </>
  );
}
