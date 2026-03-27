'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAuth, setAuth as saveAuth, clearAuth as removeAuth, AuthUser } from '@/lib/auth';

export function useAuth() {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setUserState(getAuth());
    setLoaded(true);
  }, []);

  const login = useCallback((u: AuthUser) => {
    saveAuth(u);
    setUserState(u);
  }, []);

  const logout = useCallback(() => {
    removeAuth();
    setUserState(null);
  }, []);

  return {
    user,
    loaded,
    isAuthenticated: user !== null,
    login,
    logout,
  };
}
