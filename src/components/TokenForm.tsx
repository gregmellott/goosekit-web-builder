'use client';

import { FormEvent, useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { TokenSet } from '@/types';

interface TokenFormProps {
  onSubmit: (tokens: TokenSet) => void;
}

export function TokenForm({ onSubmit }: TokenFormProps) {
  const [github_pat, setGithubPat] = useState('');
  const [vercel_token, setVercelToken] = useState('');
  const [claude_setup_token, setClaudeToken] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    onSubmit({ github_pat, vercel_token, claude_setup_token });
  }

  return (
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
        <Button type="submit" loading={loading} className="w-full mt-2">
          Connect & Continue
        </Button>
      </form>
      <p className="text-[11px] text-white/20 text-center mt-5">
        Tokens are stored locally and sent directly to the API. Never shared with third parties.
      </p>
    </Card>
  );
}
