import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Train } from '@/features/trains/types/train';
import { Timer, AlertCircle } from 'lucide-react';
import { getDelaySeverity } from '@/features/trains/utils/trainUtils';
import { cn } from '@/lib/utils';

interface TrainDelayCardProps {
  train: Train;
}

export const TrainDelayCard: React.FC<TrainDelayCardProps> = ({ train }) => {
  const delay = train.schedule.delayMinutes;
  const severity = getDelaySeverity(delay);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Timer className="h-3 w-3" />
          Delay Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Current Delay</span>
          <span className={cn(
            'text-xl font-bold font-mono',
            delay === 0 ? 'text-emerald-400' :
            delay < 15 ? 'text-amber-400' : 'text-rose-400'
          )}>
            {delay === 0 ? 'On Time' : `+${delay} min`}
          </span>
        </div>
        <div className="flex items-center justify-between p-2 rounded bg-secondary/20 border border-border">
          <span className="text-xs text-muted-foreground">Severity Level</span>
          <span className={cn(
            'text-xs font-bold uppercase px-2 py-0.5 rounded',
            delay === 0 ? 'bg-emerald-500/20 text-emerald-400' :
            delay < 15 ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
          )}>
            {severity}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
