import React from 'react';
import { cn } from '@/lib/utils';

export type OperationalState =
  | 'RUNNING'
  | 'ON_TIME'
  | 'DELAYED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'OPERATIONAL'
  | 'WARNING'
  | 'CRITICAL'
  | 'OFFLINE'
  | 'MAINTENANCE';

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  state: OperationalState;
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  state,
  showDot = true,
  className,
  ...props
}) => {
  const configs: Record<
    OperationalState,
    { label: string; text: string; bg: string; border: string; dot: string }
  > = {
    RUNNING: {
      label: 'RUNNING',
      text: 'text-emerald-400',
      bg: 'bg-emerald-950/50',
      border: 'border-emerald-500/30',
      dot: 'bg-emerald-400',
    },
    ON_TIME: {
      label: 'ON TIME',
      text: 'text-emerald-400',
      bg: 'bg-emerald-950/50',
      border: 'border-emerald-500/30',
      dot: 'bg-emerald-400',
    },
    OPERATIONAL: {
      label: 'OPERATIONAL',
      text: 'text-emerald-400',
      bg: 'bg-emerald-950/50',
      border: 'border-emerald-500/30',
      dot: 'bg-emerald-400',
    },
    WARNING: {
      label: 'WARNING',
      text: 'text-amber-400',
      bg: 'bg-amber-950/50',
      border: 'border-amber-500/30',
      dot: 'bg-amber-400',
    },
    DELAYED: {
      label: 'DELAYED',
      text: 'text-amber-400',
      bg: 'bg-amber-950/50',
      border: 'border-amber-500/30',
      dot: 'bg-amber-400',
    },
    MAINTENANCE: {
      label: 'MAINTENANCE',
      text: 'text-amber-400',
      bg: 'bg-amber-950/50',
      border: 'border-amber-500/30',
      dot: 'bg-amber-400',
    },
    CRITICAL: {
      label: 'CRITICAL',
      text: 'text-rose-400',
      bg: 'bg-rose-950/50',
      border: 'border-rose-500/30',
      dot: 'bg-rose-400',
    },
    CANCELLED: {
      label: 'CANCELLED',
      text: 'text-rose-400',
      bg: 'bg-rose-950/50',
      border: 'border-rose-500/30',
      dot: 'bg-rose-400',
    },
    COMPLETED: {
      label: 'COMPLETED',
      text: 'text-sky-400',
      bg: 'bg-sky-950/50',
      border: 'border-sky-500/30',
      dot: 'bg-sky-400',
    },
    OFFLINE: {
      label: 'OFFLINE',
      text: 'text-zinc-400',
      bg: 'bg-zinc-900/60',
      border: 'border-zinc-700/40',
      dot: 'bg-zinc-500',
    },
  };

  const config = configs[state] || configs.OFFLINE;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider select-none font-medium',
        config.bg,
        config.border,
        config.text,
        className
      )}
      {...props}
    >
      {showDot && <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', config.dot)} />}
      <span>{config.label}</span>
    </div>
  );
};

export const DelayBadge: React.FC<{ minutes: number; className?: string }> = ({
  minutes,
  className,
}) => {
  if (minutes <= 0) {
    return (
      <span className={cn('inline-flex items-center font-mono text-xs text-emerald-400', className)}>
        On Schedule
      </span>
    );
  }

  const isCritical = minutes >= 15;

  return (
    <span
      className={cn(
        'inline-flex items-center font-mono text-xs font-semibold',
        isCritical ? 'text-rose-400' : 'text-amber-400',
        className
      )}
    >
      +{minutes} min
    </span>
  );
};
