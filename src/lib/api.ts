import { TokenSet, JobCreateResponse, StatusResponse } from '@/types';

const BASE_URL = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || `Request failed (${res.status})`);
  }
  return data as T;
}

export async function healthCheck(): Promise<boolean> {
  try {
    await request('/health');
    return true;
  } catch {
    return false;
  }
}

export async function buildSite(
  tokens: TokenSet,
  prompt: string,
  repo_name?: string
): Promise<JobCreateResponse> {
  return request<JobCreateResponse>('/build', {
    method: 'POST',
    body: JSON.stringify({ ...tokens, prompt, ...(repo_name ? { repo_name } : {}) }),
  });
}

export async function redesignSite(
  tokens: TokenSet,
  repo_name: string,
  website_url: string,
  prompt?: string
): Promise<JobCreateResponse> {
  return request<JobCreateResponse>('/redesign', {
    method: 'POST',
    body: JSON.stringify({ ...tokens, repo_name, website_url, ...(prompt ? { prompt } : {}) }),
  });
}

export async function editSite(
  tokens: TokenSet,
  repo_name: string,
  prompt: string
): Promise<JobCreateResponse> {
  return request<JobCreateResponse>('/edit', {
    method: 'POST',
    body: JSON.stringify({ ...tokens, repo_name, prompt }),
  });
}

export async function getJobStatus(id: string): Promise<StatusResponse> {
  return request<StatusResponse>(`/status/${id}`);
}
