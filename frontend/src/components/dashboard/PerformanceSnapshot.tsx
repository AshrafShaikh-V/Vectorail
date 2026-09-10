import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { BarChart3 } from 'lucide-react';

interface PerformanceSnapshotProps {
  data: {
    avgDelay: string;
    trainsCompleted: number;
    onTimeArrivals: string;
    networkUtilization: string;
  };
}

export const PerformanceSnapshot: React.FC<PerformanceSnapshotProps> = ({ data }) => {
  return (
    <Card className="border-border bg-card/50 h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold uppercase tracking-wider font-mono">
            Performance Snapshot
          </CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg border border-border bg-secondary/10 space-y-1">
          <span className="text-[10px] font-mono text-muted-foreground uppercase">Avg Delay</span>
          <div className="text-lg font-bold text-foreground font-mono">{data.avgDelay}</div>
        </div>
        <div className="p-3 rounded-lg border border-border bg-secondary/10 space-y-1">
          <span className="text-[10px] font-mono text-muted-foreground uppercase">Completed</span>
          <div className="text-lg font-bold text-foreground font-mono">{data.trainsCompleted}</div>
        </div>
        <div className="p-3 rounded-lg border border-border bg-secondary/10 space-y-1">
          <span className="text-[10px] font-mono text-muted-foreground uppercase">On-Time Arrival</span>
          <div className="text-lg font-bold text-emerald-400 font-mono">{data.onTimeArrivals}</div>
        </div>
        <div className="p-3 rounded-lg border border-border bg-secondary/10 space-y-1">
          <span className="text-[10px] font-mono text-muted-foreground uppercase">Utilization</span>
          <div className="text-lg font-bold text-foreground font-mono">{data.networkUtilization}</div>
        </div>
      </CardContent>
    </Card>
  );
};
