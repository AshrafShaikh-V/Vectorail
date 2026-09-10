import React from 'react';
import { cn } from '@/lib/utils';

export interface SystemStatusProps {
  status: 'OPERATIONAL' | 'DEGRADED' | 'OFFLINE';
  label?: string;
  onClick?: () => void;
  className?: string;
}

export const SystemStatus: React.FC<SystemStatusProps> = ({
  status,
  label,
  onClick,
  className,
}) => {
  const configs = {
    OPERATIONAL: {
      color: 'text-emerald-400',
      dotBg: 'bg-emerald-400',
      border: 'border-emerald-500/30 bg-emerald-950/40',
      defaultLabel: 'SYSTEM OPERATIONAL',
    },
    DEGRADED: {
      color: 'text-amber-400',
      dotBg: 'bg-amber-400',
      border: 'border-amber-500/30 bg-amber-950/40',
      defaultLabel: 'SYSTEM DEGRADED',
    },
    OFFLINE: {
      color: 'text-rose-400',
      dotBg: 'bg-rose-400',
      border: 'border-rose-500/30 bg-rose-950/40',
      defaultLabel: 'SYSTEM OFFLINE',
    },
  };

  const config = configs[status] || configs.OFFLINE;

  return (
    <div
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-mono select-none transition-colors',
        config.border,
        config.color,
        onClick && 'cursor-pointer hover:brightness-110',
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        {status === 'OPERATIONAL' && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}
        <span className={cn('relative inline-flex h-2 w-2 rounded-full', config.dotBg)} />
      </span>
      <span className="font-semibold tracking-wider text-[11px]">
        {label || config.defaultLabel}
      </span>
    </div>
  );
};
