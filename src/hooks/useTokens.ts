'use client';

import { useState, useEffect, useCallback } from 'react';
import { TokenSet } from '@/types';
import { getTokens, setTokens as saveTokens, clearTokens as removeTokens } from '@/lib/tokens';

export function useTokens() {
  const [tokens, setTokensState] = useState<TokenSet | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTokensState(getTokens());
    setLoaded(true);
  }, []);

  const setTokens = useCallback((t: TokenSet) => {
    saveTokens(t);
    setTokensState(t);
  }, []);

  const clearTokens = useCallback(() => {
    removeTokens();
    setTokensState(null);
  }, []);

  return {
    tokens,
    loaded,
    isAuthenticated: tokens !== null,
    setTokens,
    clearTokens,
  };
}
