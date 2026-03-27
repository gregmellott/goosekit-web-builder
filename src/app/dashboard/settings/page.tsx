'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useTokens } from '@/hooks/useTokens';
import { TokenSet } from '@/types';

export default function SettingsPage() {
  const { tokens, setTokens, loaded } = useTokens();
  const [github_pat, setGithubPat] = useState('');
  const [vercel_token, setVercelToken] = useState('');
  const [claude_setup_token, setClaudeToken] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (loaded && tokens) {
      setGithubPat(tokens.github_pat);
      setVercelToken(tokens.vercel_token);
      setClaudeToken(tokens.claude_setup_token);
    }
  }, [loaded, tokens]);

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (github_pat.length < 10) errs.github_pat = 'Token is too short';
    if (vercel_token.length < 10) errs.vercel_token = 'Token is too short';
    if (claude_setup_token.length < 10) errs.claude_setup_token = 'Token is too short';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const t: TokenSet = { github_pat, vercel_token, claude_setup_token };
    setTokens(t);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const hasTokens = tokens !== null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-lg font-semibold text-white mb-1">Settings</h1>
        <p className="text-sm text-white/40 mb-5">
          Configure your API tokens to connect with GitHub, Vercel, and Claude
        </p>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-sm font-semibold text-white">API Tokens</h2>
            <p className="text-xs text-white/40 mt-0.5">
              Required for building and deploying websites
            </p>
          </div>
          {hasTokens && (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Connected
            </span>
          )}
          {!hasTokens && loaded && (
            <span className="inline-flex items-center gap-1.5 text-xs text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Not configured
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="GitHub Personal Access Token"
            type="password"
            placeholder="ghp_..."
            value={github_pat}
            onChange={(e) => setGithubPat(e.target.value)}
            error={errors.github_pat}
          />
          <Input
            label="Vercel Token"
            type="password"
            placeholder="Your Vercel API token"
            value={vercel_token}
            onChange={(e) => setVercelToken(e.target.value)}
            error={errors.vercel_token}
          />
          <Input
            label="Claude Setup Token"
            type="password"
            placeholder="Your Claude Code OAuth token"
            value={claude_setup_token}
            onChange={(e) => setClaudeToken(e.target.value)}
            error={errors.claude_setup_token}
          />
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit">
              Save Tokens
            </Button>
            {saved && (
              <span className="text-sm text-emerald-400 animate-[fadeIn_0.2s_ease-out]">
                Saved!
              </span>
            )}
          </div>
        </form>

        <p className="text-[11px] text-white/20 mt-5">
          Tokens are stored locally in your browser and sent directly to the API. Never shared with third parties.
        </p>
      </Card>
    </div>
  );
}
