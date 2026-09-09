import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Reusable Operational Status Indicator Dot & Label
 * Supports operational (🟢), warning (🟡), critical (🔴), info (🔵), inactive (⚪)
 */
export function StatusIndicator({
  status = 'operational',
  label,
  pulse = true,
  className,
}) {
  const configs = {
    operational: {
      color: 'bg-emerald-500',
      ping: 'bg-emerald-400',
      label: label || 'Operational',
      text: 'text-emerald-400',
    },
    warning: {
      color: 'bg-amber-500',
      ping: 'bg-amber-400',
      label: label || 'Warning',
      text: 'text-amber-400',
    },
    critical: {
      color: 'bg-rose-500',
      ping: 'bg-rose-400',
      label: label || 'Critical',
      text: 'text-rose-400',
    },
    information: {
      color: 'bg-sky-500',
      ping: 'bg-sky-400',
      label: label || 'Information',
      text: 'text-sky-400',
    },
    inactive: {
      color: 'bg-slate-500',
      ping: 'bg-slate-400',
      label: label || 'Inactive',
      text: 'text-slate-400',
    },
  };

  const config = configs[status] || configs.operational;

  return (
    <div className={cn('inline-flex items-center gap-2 text-xs font-medium', className)}>
      <span className="relative flex h-2 w-2">
        {pulse && (
          <span
            className={cn(
              'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
              config.ping
            )}
          />
        )}
        <span className={cn('relative inline-flex h-2 w-2 rounded-full', config.color)} />
      </span>
      {label !== false && <span className={config.text}>{config.label}</span>}
    </div>
  );
}
