import React from 'react';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface StatusDistributionItem {
  label: string;
  value: number | string;
  status: 'operational' | 'warning' | 'critical' | 'neutral';
}

interface StatusDistributionProps {
  items: StatusDistributionItem[];
  total?: number | string;
}

export const StatusDistribution: React.FC<StatusDistributionProps> = ({ items, total }) => {
  return (
    <div className="space-y-3 w-full">
      {total !== undefined && (
        <div className="flex justify-between items-center text-[11px] font-mono text-muted-foreground mb-1">
          <span>TOTAL ACTIVE</span>
          <span className="text-foreground font-bold">{total}</span>
        </div>
      )}
      <div className="space-y-2">
        {items.map((item, i) => {
          const percentage = typeof total === 'number' && typeof item.value === 'number'
            ? (item.value / total) * 100
            : 0;

          return (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="text-foreground font-medium">{item.value}</span>
              </div>
              <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all duration-500',
                    item.status === 'operational' && 'bg-emerald-500',
                    item.status === 'warning' && 'bg-amber-500',
                    item.status === 'critical' && 'bg-rose-500',
                    item.status === 'neutral' && 'bg-muted-foreground',
                  )}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
