'use client';

import { FormEvent, useState } from 'react';
import { Input, Textarea } from './ui/Input';
import { Button } from './ui/Button';

interface RedesignFormProps {
  onSubmit: (repoName: string, websiteUrl: string, prompt?: string) => Promise<void>;
}

export function RedesignForm({ onSubmit }: RedesignFormProps) {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [repoName, setRepoName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!websiteUrl) {
      setError('Website URL is required');
      return;
    }
    if (!repoName) {
      setError('Repository name is required');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onSubmit(repoName, websiteUrl, prompt || undefined);
      setWebsiteUrl('');
      setRepoName('');
      setPrompt('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Website URL to redesign"
        placeholder="https://example.com"
        value={websiteUrl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
      />
      <Input
        label="New repository name"
        placeholder="my-redesigned-site"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
      />
      <Textarea
        label="Redesign instructions (optional)"
        placeholder="Make it modern with a dark theme and smooth animations..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button type="submit" loading={loading} className="w-full">
        Redesign Website
      </Button>
    </form>
  );
}
