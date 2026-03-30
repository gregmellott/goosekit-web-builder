'use client';

import { useState, useEffect, useCallback } from 'react';
import { TokenSet } from '@/types';
import { getTokens, setTokens as saveTokens, clearTokens as removeTokens } from '@/lib/tokens';
import { getSupabase } from '@/lib/supabase';
import { getAuth } from '@/lib/auth';

async function loadTokensFromSupabase(username: string): Promise<TokenSet | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('goosekit_tokens')
    .select('github_pat, vercel_token, claude_setup_token')
    .eq('username', username)
    .single();
  if (error || !data) return null;
  return data as TokenSet;
}

async function saveTokensToSupabase(username: string, tokens: TokenSet) {
  const supabase = getSupabase();
  if (!supabase) return;
  await supabase
    .from('goosekit_tokens')
    .upsert(
      {
        username,
        github_pat: tokens.github_pat,
        vercel_token: tokens.vercel_token,
        claude_setup_token: tokens.claude_setup_token,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'username' }
    );
}

export function useTokens() {
  const [tokens, setTokensState] = useState<TokenSet | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      // Try localStorage first for instant load
      const local = getTokens();
      if (local) {
        setTokensState(local);
      }

      // Then try Supabase for cross-device sync
      const auth = getAuth();
      if (auth?.username) {
        const remote = await loadTokensFromSupabase(auth.username);
        if (remote) {
          saveTokens(remote); // cache locally
          setTokensState(remote);
        }
      }

      setLoaded(true);
    }
    load();
  }, []);

  const setTokens = useCallback((t: TokenSet) => {
    saveTokens(t);
    setTokensState(t);

    // Sync to Supabase
    const auth = getAuth();
    if (auth?.username) {
      saveTokensToSupabase(auth.username, t);
    }
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
