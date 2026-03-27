import { JobStatus, JobType } from '@/types';

export const STATUS_LABELS: Record<JobStatus, string> = {
  VALIDATING: 'Validating tokens',
  SCRAPING: 'Scraping website',
  CREATING_REPO: 'Creating repository',
  LINKING_VERCEL: 'Linking to Vercel',
  BUILDING_SITE: 'Building site with AI',
  EDITING_SITE: 'Editing site with AI',
  PUSHING_CODE: 'Pushing code',
  DEPLOYING: 'Deploying to Vercel',
  VERIFYING: 'Verifying deployment',
  READY: 'Ready',
  FAILED: 'Failed',
};

export const STATUS_COLORS: Record<JobStatus, string> = {
  VALIDATING: 'text-yellow-400',
  SCRAPING: 'text-blue-400',
  CREATING_REPO: 'text-blue-400',
  LINKING_VERCEL: 'text-blue-400',
  BUILDING_SITE: 'text-purple-400',
  EDITING_SITE: 'text-purple-400',
  PUSHING_CODE: 'text-blue-400',
  DEPLOYING: 'text-orange-400',
  VERIFYING: 'text-yellow-400',
  READY: 'text-emerald-400',
  FAILED: 'text-red-400',
};

export const BUILD_STAGES: JobStatus[] = [
  'CREATING_REPO',
  'LINKING_VERCEL',
  'BUILDING_SITE',
  'PUSHING_CODE',
  'DEPLOYING',
  'VERIFYING',
  'READY',
];

export const REDESIGN_STAGES: JobStatus[] = [
  'SCRAPING',
  'CREATING_REPO',
  'LINKING_VERCEL',
  'BUILDING_SITE',
  'PUSHING_CODE',
  'DEPLOYING',
  'VERIFYING',
  'READY',
];

export const EDIT_STAGES: JobStatus[] = [
  'EDITING_SITE',
  'PUSHING_CODE',
  'DEPLOYING',
  'VERIFYING',
  'READY',
];

export function getStagesForType(type: JobType): JobStatus[] {
  switch (type) {
    case 'build':
      return BUILD_STAGES;
    case 'redesign':
      return REDESIGN_STAGES;
    case 'edit':
      return EDIT_STAGES;
  }
}

export const TERMINAL_STATUSES: JobStatus[] = ['READY', 'FAILED'];
