'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TokenForm } from '@/components/TokenForm';
import { useTokens } from '@/hooks/useTokens';
import { TokenSet } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, loaded, setTokens } = useTokens();

  useEffect(() => {
    if (loaded && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [loaded, isAuthenticated, router]);

  function handleSubmit(tokens: TokenSet) {
    setTokens(tokens);
    router.push('/dashboard');
  }

  if (!loaded) return null;
  if (isAuthenticated) return null;

  return (
    <div className="flex-1 flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4aa]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00d4aa]/[0.02] rounded-full blur-3xl" />
      </div>
      <TokenForm onSubmit={handleSubmit} />
    </div>
  );
}
