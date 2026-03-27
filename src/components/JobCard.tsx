'use client';

import { useCallback } from 'react';
import { Job, StatusResponse } from '@/types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Stepper } from './ui/Stepper';
import { useJobPoller } from '@/hooks/useJobPoller';
import { TERMINAL_STATUSES } from '@/lib/constants';

interface JobCardProps {
  job: Job;
  onUpdate: (id: string, updates: Partial<Job>) => void;
}

export function JobCard({ job, onUpdate }: JobCardProps) {
  const isTerminal = TERMINAL_STATUSES.includes(job.status);

  const handlePollUpdate = useCallback(
    (data: StatusResponse) => {
      onUpdate(job.id, {
        status: data.status,
        live_url: data.live_url,
        error: data.error,
      });
    },
    [job.id, onUpdate]
  );

  useJobPoller(isTerminal ? null : job.id, handlePollUpdate);

  const typeLabel = job.type === 'build' ? 'Build' : job.type === 'redesign' ? 'Redesign' : 'Edit';

  return (
    <Card className="animate-[slideUp_0.3s_ease-out]">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
            {typeLabel}
          </span>
          {job.repo_name && (
            <span className="text-xs text-white/60 font-mono">{job.repo_name}</span>
          )}
        </div>
        <Badge status={job.status} />
      </div>

      <p className="text-sm text-white/50 mb-4 line-clamp-2">{job.prompt}</p>

      <Stepper currentStatus={job.status} type={job.type} />

      {job.status === 'READY' && job.live_url && (
        <a
          href={job.live_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#00d4aa] hover:text-[#00f0c0] transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View live site
        </a>
      )}

      {job.status === 'FAILED' && job.error && (
        <p className="mt-3 text-xs text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg px-3 py-2">
          {job.error}
        </p>
      )}
    </Card>
  );
}
