import { TokenSet } from '@/types';

const STORAGE_KEY = 'goosekit_tokens';

export function getTokens(): TokenSet | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as TokenSet;
    if (parsed.github_pat && parsed.vercel_token && parsed.claude_setup_token) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function setTokens(tokens: TokenSet): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
}

export function clearTokens(): void {
  localStorage.removeItem(STORAGE_KEY);
}
