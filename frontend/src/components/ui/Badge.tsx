import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'operational' | 'warning' | 'critical' | 'information' | 'inactive';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      outline: 'border border-border text-foreground',
      operational: 'bg-emerald-950/70 border border-emerald-500/30 text-emerald-400',
      warning: 'bg-amber-950/70 border border-amber-500/30 text-amber-400',
      critical: 'bg-rose-950/70 border border-rose-500/30 text-rose-400',
      information: 'bg-sky-950/70 border border-sky-500/30 text-sky-400',
      inactive: 'bg-zinc-800/80 border border-zinc-700/40 text-zinc-400',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors select-none',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
