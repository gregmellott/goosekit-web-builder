'use client';

import { FormEvent, useState } from 'react';
import { Input, Textarea } from './ui/Input';
import { Button } from './ui/Button';

interface EditFormProps {
  onSubmit: (repoName: string, prompt: string) => Promise<void>;
}

export function EditForm({ onSubmit }: EditFormProps) {
  const [repoName, setRepoName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!repoName) {
      setError('Repository name is required');
      return;
    }
    if (prompt.length < 10) {
      setError('Prompt must be at least 10 characters');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onSubmit(repoName, prompt);
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
        label="Repository name"
        placeholder="my-existing-site"
        value={repoName}
        onChange={(e) => setRepoName(e.target.value)}
      />
      <Textarea
        label="What changes do you want?"
        placeholder="Change the hero section background to a gradient and update the contact form to include a phone number field..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button type="submit" loading={loading} className="w-full">
        Edit Website
      </Button>
    </form>
  );
}
