'use client';

import { Job } from '@/types';
import { JobCard } from './JobCard';

interface JobListProps {
  jobs: Job[];
  onUpdateJob: (id: string, updates: Partial<Job>) => void;
}

export function JobList({ jobs, onUpdateJob }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="h-12 w-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/20">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
        </div>
        <p className="text-sm text-white/30">No jobs yet</p>
        <p className="text-xs text-white/15 mt-1">Create your first website above</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onUpdate={onUpdateJob} />
      ))}
    </div>
  );
}
