import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Train } from '@/features/trains/types/train';
import { Clock, Timer } from 'lucide-react';
import { getDelaySeverity } from '@/features/trains/utils/trainUtils';
import { cn } from '@/lib/utils';

interface TrainScheduleProps {
  train: Train;
}

export const TrainSchedule: React.FC<TrainScheduleProps> = ({ train }) => {
  const { schedule } = train;

  return (
    <Card className="bg-card border-border">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Clock className="h-3 w-3" />
          Detailed Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="pb-2 font-medium">Type</th>
                <th className="pb-2 font-medium">Departure</th>
                <th className="pb-2 font-medium">Arrival</th>
                <th className="pb-2 font-medium text-right">Delay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              <tr className="group">
                <td className="py-3 text-muted-foreground uppercase">Scheduled</td>
                <td className="py-3">{schedule.scheduledDeparture}</td>
                <td className="py-3">{schedule.scheduledArrival}</td>
                <td className="py-3 text-right text-muted-foreground">—</td>
              </tr>
              <tr className="group">
                <td className="py-3 text-foreground font-bold uppercase">Actual/Est</td>
                <td className="py-3">{schedule.actualDeparture || schedule.scheduledDeparture}</td>
                <td className="py-3">{schedule.estimatedArrival}</td>
                <td className="py-3 text-right font-bold">
                  <span className={cn(
                    'px-1.5 py-0.5 rounded bg-secondary/50',
                    schedule.delayMinutes === 0 ? 'text-emerald-400' : 'text-amber-400'
                  )}>
                    {schedule.delayMinutes === 0 ? 'On Time' : `+${schedule.delayMinutes}m`}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
