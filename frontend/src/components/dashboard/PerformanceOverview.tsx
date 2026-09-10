import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { BarChart3 } from 'lucide-react';

export const PerformanceOverview: React.FC = () => {
  return (
    <Card className="h-full min-h-[400px] border-border bg-card/50">
      <CardContent className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-emerald-500/10 rounded-full" />
          <BarChart3 className="h-12 w-12 text-emerald-500/40 relative z-10" />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-foreground">Operational Performance</h4>
          <p className="text-xs text-muted-foreground max-w-xs">
            Throughput analysis, punctuality index, and network utilization metrics.
          </p>
        </div>
        <div className="w-full max-w-xs pt-4 space-y-2">
          <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
            <div className="h-full w-3/4 bg-emerald-500" />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
            <span>On-Time Performance</span>
            <span>74%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
