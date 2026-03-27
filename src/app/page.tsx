'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, loaded, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loaded && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [loaded, isAuthenticated, router]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }
    setLoading(true);
    login({ username: username.trim() });
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
      <Card className="w-full max-w-md animate-[fadeIn_0.4s_ease-out]">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-2xl bg-[#00d4aa]/10 border border-[#00d4aa]/20 flex items-center justify-center mx-auto mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white">GooseKit</h1>
          <p className="text-sm text-white/40 mt-1">AI-powered website builder</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button type="submit" loading={loading} className="w-full mt-2">
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}
