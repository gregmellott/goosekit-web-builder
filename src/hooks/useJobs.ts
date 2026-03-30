'use client';

import { useState, useEffect, useCallback } from 'react';
import { Job } from '@/types';
import { getSupabase } from '@/lib/supabase';

const STORAGE_KEY = 'goosekit_jobs';

function loadJobs(): Job[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistJobs(jobs: Job[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

async function saveSiteToSupabase(job: Job) {
  if (job.status !== 'READY') return;
  if (job.type !== 'build' && job.type !== 'redesign') return;

  const supabase = getSupabase();
  if (!supabase) return;

  const { error } = await supabase
    .from('goosekit_sites')
    .upsert(
      {
        job_id: job.id,
        type: job.type,
        prompt: job.prompt,
        repo_name: job.repo_name || null,
        live_url: job.live_url || null,
        website_url: job.website_url || null,
      },
      { onConflict: 'job_id' }
    );

  if (error) {
    console.error('Failed to save site to Supabase:', error);
  }
}

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    setJobs(loadJobs());
  }, []);

  const addJob = useCallback((job: Job) => {
    setJobs((prev) => {
      const next = [job, ...prev];
      persistJobs(next);
      return next;
    });
  }, []);

  const updateJob = useCallback((id: string, updates: Partial<Job>) => {
    setJobs((prev) => {
      const next = prev.map((j) => (j.id === id ? { ...j, ...updates } : j));
      persistJobs(next);

      const updated = next.find((j) => j.id === id);
      if (updated) {
        saveSiteToSupabase(updated);
      }

      return next;
    });
  }, []);

  return { jobs, addJob, updateJob };
}
