'use client';

import { FormEvent, useState } from 'react';
import { Input, Textarea } from './ui/Input';
import { Button } from './ui/Button';

interface BuildFormProps {
  onSubmit: (prompt: string, repoName?: string) => Promise<void>;
}

export function BuildForm({ onSubmit }: BuildFormProps) {
  const [prompt, setPrompt] = useState('');
  const [repoName, setRepoName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (prompt.length < 10) {
      setError('Prompt must be at least 10 characters');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onSubmit(prompt, repoName || undefined);
      setPrompt('');
      setRepoName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        label="What website do you want to build?"
        placeholder="A portfolio site for a photographer with a dark theme, gallery section, about page, and contact form..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Input
        label="Repository name (optional)"
        placeholder="my-awesome-site"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button type="submit" loading={loading} className="w-full">
        Build Website
      </Button>
    </form>
  );
}
