'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Textarea } from './ui/Input';
import { Button } from './ui/Button';
import { ImageUpload } from './ImageUpload';
import { getSupabase } from '@/lib/supabase';

interface EditFormProps {
  onSubmit: (repoName: string, prompt: string, images?: string[]) => Promise<void>;
}

export function EditForm({ onSubmit }: EditFormProps) {
  const [repoName, setRepoName] = useState('');
  const [repos, setRepos] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchRepos() {
      const supabase = getSupabase();
      if (!supabase) return;
      const { data } = await supabase
        .from('goosekit_sites')
        .select('repo_name')
        .not('repo_name', 'is', null)
        .order('created_at', { ascending: false });
      if (data) {
        const names = data
          .map((r) => r.repo_name as string)
          .filter((v, i, a) => a.indexOf(v) === i);
        setRepos(names);
      }
    }
    fetchRepos();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!repoName) {
      setError('Please select a repository');
      return;
    }
    if (prompt.length < 10) {
      setError('Prompt must be at least 10 characters');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await onSubmit(repoName, prompt, images.length > 0 ? images : undefined);
      setRepoName('');
      setPrompt('');
      setImages([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-white/60 mb-1.5">
          Repository
        </label>
        <select
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          className="w-full rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#00d4aa]/40 focus:ring-1 focus:ring-[#00d4aa]/20 transition-all appearance-none"
        >
          <option value="" className="bg-[#141414]">Select a site...</option>
          {repos.map((name) => (
            <option key={name} value={name} className="bg-[#141414]">
              {name}
            </option>
          ))}
        </select>
      </div>
      <Textarea
        label="What changes do you want?"
        placeholder="Change the hero section background to a gradient and update the contact form to include a phone number field..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <ImageUpload images={images} onChange={setImages} />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <Button type="submit" loading={loading} className="w-full">
        Edit Website
      </Button>
    </form>
  );
}
