'use client';

import { useState, useEffect, useCallback } from 'react';
import { Job } from '@/types';

const STORAGE_KEY = 'goosekit_jobs';

function loadJobs(): Job[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistJobs(jobs: Job[]) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
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
      return next;
    });
  }, []);

  return { jobs, addJob, updateJob };
}
