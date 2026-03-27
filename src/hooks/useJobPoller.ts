'use client';

import { useEffect, useRef } from 'react';
import { getJobStatus } from '@/lib/api';
import { StatusResponse } from '@/types';
import { TERMINAL_STATUSES } from '@/lib/constants';

export function useJobPoller(
  jobId: string | null,
  onUpdate: (data: StatusResponse) => void
) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onUpdateRef = useRef(onUpdate);
  onUpdateRef.current = onUpdate;

  useEffect(() => {
    if (!jobId) return;

    const poll = async () => {
      try {
        const data = await getJobStatus(jobId);
        onUpdateRef.current(data);
        if (TERMINAL_STATUSES.includes(data.status)) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      } catch {
        // keep polling on transient errors
      }
    };

    poll();
    intervalRef.current = setInterval(poll, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [jobId]);
}
