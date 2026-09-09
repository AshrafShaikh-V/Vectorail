import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Chart Container Shell
 * Wraps Recharts components with unified control-room margins, responsive sizing, and dark aesthetic.
 */
export function ChartContainer({ title, subtitle, children, className, height = 300 }) {
  return (
    <div className={cn('rounded-lg border border-border bg-card p-4 space-y-3', className)}>
      {(title || subtitle) && (
        <div>
          {title && <div className="text-sm font-semibold text-foreground">{title}</div>}
          {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
        </div>
      )}
      <div style={{ height, width: '100%' }}>{children}</div>
    </div>
  );
}

export default ChartContainer;
