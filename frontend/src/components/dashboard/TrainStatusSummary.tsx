import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { TrainFront, Server } from 'lucide-react';
import { StatusDistribution } from './StatusDistribution';

interface TrainStatusSummaryProps {
  data: {
    totalTrains: number;
    onTimeTrains: number;
    delayedTrains: number;
    stoppedTrains: number;
  };
}

export const TrainStatusSummary: React.FC<TrainStatusSummaryProps> = ({ data }) => {
  const distribution = [
    { label: 'On Schedule', value: data.onTimeTrains, status: 'operational' as const },
    { label: 'Delayed', value: data.delayedTrains, status: 'warning' as const },
    { label: 'Stopped', value: data.stoppedTrains, status: 'neutral' as const },
  ];

  return (
    <Card className="h-full border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold uppercase tracking-wider font-mono">
            Train Operations
          </CardTitle>
          <TrainFront className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-1">
          <div className="text-3xl font-bold text-foreground font-mono">{data.totalTrains}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Active Fleet</div>
        </div>
        <StatusDistribution items={distribution} total={data.total} />
      </CardContent>
    </Card>
  );
};
