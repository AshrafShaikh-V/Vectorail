import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { TrainSummary } from '@/features/trains/types/trainFilter';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface TrainSummaryPanelProps {
  summary: TrainSummary;
}

export const TrainSummaryPanel: React.FC<TrainSummaryPanelProps> = ({ summary }) => {
  const metrics = [
    { label: 'Total Trains', value: summary.totalTrains, status: 'neutral' as any },
    { label: 'Running', value: summary.activeTrains, status: 'operational' as any },
    { label: 'On Time', value: summary.onTimeTrains, status: 'operational' as any },
    { label: 'Delayed', value: summary.delayedTrains, status: 'warning' as any },
    { label: 'Stopped', value: summary.stoppedTrains, status: 'neutral' as any },
    { label: 'Cancelled', value: summary.cancelledTrains, status: 'critical' as any },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      {metrics.map((metric) => (
        <Card key={metric.label} className="bg-secondary/20 border-border">
          <CardContent className="p-3 flex flex-col items-center justify-center text-center space-y-1">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              {metric.label}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-foreground font-mono">
                {metric.value}
              </span>
              <StatusBadge state={metric.status} showDot={false} className="h-2 px-1 text-[8px]" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
