import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
}) {
  return (
    <Card className={cn('border-border/80 bg-card/70 shadow-sm', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && <Icon className="h-4 w-4 text-emerald-400" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight text-foreground">{value}</div>
        {(subtitle || trend) && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default MetricCard;
