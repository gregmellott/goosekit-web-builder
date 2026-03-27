export type JobStatus =
  | 'VALIDATING'
  | 'SCRAPING'
  | 'CREATING_REPO'
  | 'LINKING_VERCEL'
  | 'BUILDING_SITE'
  | 'EDITING_SITE'
  | 'PUSHING_CODE'
  | 'DEPLOYING'
  | 'VERIFYING'
  | 'READY'
  | 'FAILED';

export type JobType = 'build' | 'redesign' | 'edit';

export interface TokenSet {
  github_pat: string;
  vercel_token: string;
  claude_setup_token: string;
}

export interface Job {
  id: string;
  type: JobType;
  status: JobStatus;
  prompt: string;
  repo_name?: string;
  website_url?: string;
  live_url?: string;
  error?: string;
  created_at: number;
}

export interface StatusResponse {
  id: string;
  status: JobStatus;
  live_url?: string;
  error?: string;
  steps?: Array<{
    status: JobStatus;
    timestamp: string;
  }>;
}

export interface JobCreateResponse {
  id: string;
  status: JobStatus;
  queue_position?: number;
}
