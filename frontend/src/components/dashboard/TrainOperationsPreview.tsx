import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { TrainFront } from 'lucide-react';

export const TrainOperationsPreview: React.FC = () => {
  return (
    <Card className="h-full min-h-[400px] border-border bg-card/50">
      <CardContent className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-emerald-500/10 rounded-full" />
          <TrainFront className="h-12 w-12 text-emerald-500/40 relative z-10" />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-foreground">Train Operations Feed</h4>
          <p className="text-xs text-muted-foreground max-w-xs">
            Active fleet tracking, speed telemetry, and schedule compliance monitoring.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full max-w-xs pt-4">
          {['Active: 142', 'Delayed: 18', 'On-Time: 124', 'Maintenance: 4'].map(s => (
            <div key={s} className="text-[10px] font-mono p-2 rounded border border-border bg-secondary/10 text-muted-foreground">
              {s}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
