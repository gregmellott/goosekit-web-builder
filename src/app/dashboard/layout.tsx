'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { useTokens } from '@/hooks/useTokens';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, loaded, clearTokens } = useTokens();

  useEffect(() => {
    if (loaded && !isAuthenticated) {
      router.push('/');
    }
  }, [loaded, isAuthenticated, router]);

  function handleLogout() {
    clearTokens();
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
