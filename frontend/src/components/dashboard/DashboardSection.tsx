import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardSectionProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const DashboardSection: React.FC<DashboardSectionProps> = ({
  title,
  description,
  action,
  children,
  className,
}) => {
  return (
    <section className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider font-mono">
            {title}
          </h3>
          {description && (
            <p className="text-[11px] text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div className="flex items-center gap-2">{action}</div>}
      </div>
      <div className="relative">
        {children}
      </div>
    </section>
  );
};
