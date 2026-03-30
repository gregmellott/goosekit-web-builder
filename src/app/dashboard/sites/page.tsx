'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useJobs } from '@/hooks/useJobs';
import { Job } from '@/types';

function SiteCard({ job }: { job: Job }) {
  const typeLabel = job.type === 'build' ? 'Build' : 'Redesign';
  const date = new Date(job.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
            {typeLabel}
          </span>
          <Badge status={job.status} />
        </div>
        <span className="text-xs text-white/30">{date}</span>
      </div>

      {job.repo_name && (
        <p className="text-sm font-mono text-white/70 mb-1">{job.repo_name}</p>
      )}
      <p className="text-sm text-white/40 line-clamp-2 mb-4">{job.prompt}</p>

      <div className="flex items-center gap-3">
        {job.live_url && (
          <a
            href={job.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#00d4aa] hover:text-[#00f0c0] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Visit site
          </a>
        )}
        {job.repo_name && (
          <a
            href={`https://github.com/${job.repo_name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
            Repository
          </a>
        )}
      </div>
    </Card>
  );
}

export default function SitesPage() {
  const { jobs } = useJobs();

  const completedSites = useMemo(
    () => jobs.filter((j) => (j.type === 'build' || j.type === 'redesign') && j.status === 'READY'),
    [jobs]
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-lg font-semibold text-white mb-1">My Sites</h1>
      <p className="text-sm text-white/40 mb-6">
        Websites you&apos;ve built and redesigned
      </p>

      {completedSites.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <div className="h-10 w-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mx-auto mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <p className="text-sm text-white/40">No sites yet</p>
            <p className="text-xs text-white/25 mt-1">
              Sites will appear here once they&apos;re built
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {completedSites.map((job) => (
            <SiteCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
