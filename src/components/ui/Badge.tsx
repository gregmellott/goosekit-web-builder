import { JobStatus } from '@/types';

const badgeColors: Record<string, string> = {
  READY: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  FAILED: 'bg-red-500/10 text-red-400 border-red-500/20',
  DEFAULT: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

export function Badge({ status }: { status: JobStatus }) {
  const color = badgeColors[status] || badgeColors.DEFAULT;
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${color}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}
