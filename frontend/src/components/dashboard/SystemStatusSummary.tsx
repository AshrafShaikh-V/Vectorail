import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Server } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SystemStatusSummaryProps {
  data: { label: string; status: string }[];
}

export const SystemStatusSummary: React.FC<SystemStatusSummaryProps> = ({ data }) => {
  return (
    <Card className="h-full border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold uppercase tracking-wider font-mono">
            System Health
          </CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded border border-border bg-secondary/10">
            <span className="text-xs text-muted-foreground">{item.label}</span>
            <span className={cn(
              'text-[10px] font-mono font-bold',
              item.status === 'Operational' && 'text-emerald-400',
              item.status !== 'Operational' && 'text-amber-400',
            )}>
              {item.status.toUpperCase()}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
