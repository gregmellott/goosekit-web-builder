const AUTH_KEY = 'goosekit_auth';

export interface AuthUser {
  username: string;
}

export function getAuth(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    return parsed.username ? parsed : null;
  } catch {
    return null;
  }
}

export function setAuth(user: AuthUser): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
  localStorage.removeItem(AUTH_KEY);
}
