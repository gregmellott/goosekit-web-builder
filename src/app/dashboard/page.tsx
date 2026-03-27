'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { BuildForm } from '@/components/BuildForm';
import { RedesignForm } from '@/components/RedesignForm';
import { EditForm } from '@/components/EditForm';
import { JobList } from '@/components/JobList';
import { useTokens } from '@/hooks/useTokens';
import { useJobs } from '@/hooks/useJobs';
import { buildSite, redesignSite, editSite } from '@/lib/api';
import { JobType } from '@/types';

const TABS = [
  { key: 'build', label: 'Build' },
  { key: 'redesign', label: 'Redesign' },
  { key: 'edit', label: 'Edit' },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('build');
  const { tokens } = useTokens();
  const { jobs, addJob, updateJob } = useJobs();

  async function handleBuild(prompt: string, repoName?: string) {
    if (!tokens) return;
    const res = await buildSite(tokens, prompt, repoName);
    addJob({
      id: res.id,
      type: 'build' as JobType,
      status: res.status,
      prompt,
      repo_name: repoName,
      created_at: Date.now(),
    });
  }

  async function handleRedesign(repoName: string, websiteUrl: string, prompt?: string) {
    if (!tokens) return;
    const res = await redesignSite(tokens, repoName, websiteUrl, prompt);
    addJob({
      id: res.id,
      type: 'redesign' as JobType,
      status: res.status,
      prompt: prompt || 'Redesign with modern aesthetic',
      repo_name: repoName,
      website_url: websiteUrl,
      created_at: Date.now(),
    });
  }

  async function handleEdit(repoName: string, prompt: string) {
    if (!tokens) return;
    const res = await editSite(tokens, repoName, prompt);
    addJob({
      id: res.id,
      type: 'edit' as JobType,
      status: res.status,
      prompt,
      repo_name: repoName,
      created_at: Date.now(),
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Token warning */}
      {!tokens && (
        <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl px-4 py-3 flex items-center justify-between">
          <p className="text-sm text-amber-400">
            API tokens not configured. Set them up to start building.
          </p>
          <Link
            href="/dashboard/settings"
            className="text-xs font-medium text-amber-400 hover:text-amber-300 whitespace-nowrap ml-4"
          >
            Go to Settings
          </Link>
        </div>
      )}

      {/* Builder section */}
      <div>
        <h1 className="text-lg font-semibold text-white mb-1">Create</h1>
        <p className="text-sm text-white/40 mb-5">
          Build a new website, redesign an existing one, or make edits
        </p>
        <Card>
          <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />
          <div className="mt-5">
            {activeTab === 'build' && <BuildForm onSubmit={handleBuild} />}
            {activeTab === 'redesign' && <RedesignForm onSubmit={handleRedesign} />}
            {activeTab === 'edit' && <EditForm onSubmit={handleEdit} />}
          </div>
        </Card>
      </div>

      {/* Jobs section */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">Jobs</h2>
        <p className="text-sm text-white/40 mb-5">
          Track your website builds in real-time
        </p>
        <JobList jobs={jobs} onUpdateJob={updateJob} />
      </div>
    </div>
  );
}
