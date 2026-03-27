import { JobStatus, JobType } from '@/types';
import { getStagesForType, STATUS_LABELS } from '@/lib/constants';

interface StepperProps {
  currentStatus: JobStatus;
  type: JobType;
}

export function Stepper({ currentStatus, type }: StepperProps) {
  const stages = getStagesForType(type);
  const currentIndex = stages.indexOf(currentStatus);
  const isFailed = currentStatus === 'FAILED';

  return (
    <div className="flex flex-col gap-0">
      {stages.map((stage, i) => {
        const isCompleted = currentIndex > i || currentStatus === 'READY';
        const isCurrent = currentIndex === i && !isFailed;
        const isFailedStage = isFailed && i === Math.max(currentIndex, 0);
        const isFuture = !isCompleted && !isCurrent && !isFailedStage;
        const isLast = i === stages.length - 1;

        return (
          <div key={stage} className="flex items-start gap-3">
            {/* Line + Dot column */}
            <div className="flex flex-col items-center">
              <div
                className={`h-2.5 w-2.5 rounded-full mt-1 shrink-0 ${
                  isCompleted
                    ? 'bg-[#00d4aa]'
                    : isCurrent
                    ? 'bg-[#00d4aa] shadow-[0_0_8px_rgba(0,212,170,0.6)] animate-pulse'
                    : isFailedStage
                    ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                    : 'bg-white/[0.15]'
                }`}
              />
              {!isLast && (
                <div
                  className={`w-px h-6 ${
                    isCompleted ? 'bg-[#00d4aa]/40' : 'bg-white/[0.08]'
                  }`}
                />
              )}
            </div>
            {/* Label */}
            <span
              className={`text-xs leading-tight pt-0 ${
                isCompleted
                  ? 'text-white/50'
                  : isCurrent
                  ? 'text-[#00d4aa] font-medium'
                  : isFailedStage
                  ? 'text-red-400 font-medium'
                  : isFuture
                  ? 'text-white/20'
                  : 'text-white/50'
              }`}
            >
              {STATUS_LABELS[stage]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
