import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

export interface KpiCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  description?: string;
  status?: 'operational' | 'warning' | 'critical' | 'information' | 'neutral';
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  label,
  value,
  icon: Icon,
  trend,
  description,
  status = 'neutral',
  className,
}) => {
  const statusBorderStyles = {
    operational: 'border-l-4 border-l-emerald-500',
    warning: 'border-l-4 border-l-amber-500',
    critical: 'border-l-4 border-l-rose-500',
    information: 'border-l-4 border-l-sky-500',
    neutral: 'border-l-4 border-l-border',
  };

  const statusIconBgStyles = {
    operational: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    critical: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    information: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    neutral: 'bg-secondary text-muted-foreground border-border',
  };

  return (
    <Card className={cn('overflow-hidden', statusBorderStyles[status], className)}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </span>
          {Icon && (
            <div className={cn('flex h-8 w-8 items-center justify-center rounded-md border text-sm', statusIconBgStyles[status])}>
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <div className="kpi-value text-3xl font-bold tracking-tight text-foreground">
            {value}
          </div>
        </div>

        {(trend || description) && (
          <div className="mt-2.5 flex items-center gap-1.5 text-xs">
            {trend && (
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 font-mono font-medium',
                  trend.direction === 'up' && 'text-emerald-400',
                  trend.direction === 'down' && 'text-rose-400',
                  trend.direction === 'neutral' && 'text-muted-foreground'
                )}
              >
                {trend.direction === 'up' && <TrendingUp className="h-3 w-3" />}
                {trend.direction === 'down' && <TrendingDown className="h-3 w-3" />}
                {trend.direction === 'neutral' && <Minus className="h-3 w-3" />}
                {trend.value}
              </span>
            )}
            {description && (
              <span className="text-muted-foreground text-[11px] truncate">
                {description}
              </span>
            )}
            {trend?.label && !description && (
              <span className="text-muted-foreground text-[11px]">
                {trend.label}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
