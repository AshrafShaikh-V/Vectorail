import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { History } from 'lucide-react';

interface TrainEvent {
  id: string;
  timestamp: string;
  event: string;
  type: 'operational' | 'delay' | 'status';
}

const MOCK_EVENTS: TrainEvent[] = [
  { id: 'e1', timestamp: '10:45', event: 'Departed from Central Terminal', type: 'operational' },
  { id: 'e2', timestamp: '11:12', event: 'Entered Section SEC-01', type: 'operational' },
  { id: 'e3', timestamp: '11:25', event: 'Speed reduced to 60km/h due to weather', type: 'delay' },
  { id: 'e4', timestamp: '11:40', event: 'Arrived at North Junction', type: 'operational' },
];

export const TrainActivityTimeline: React.FC = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <History className="h-3 w-3" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {MOCK_EVENTS.map((event) => (
            <div key={event.id} className="flex gap-3 items-start">
              <div className="text-[10px] font-mono text-muted-foreground pt-1 w-12 shrink-0">
                {event.timestamp}
              </div>
              <div className="flex-1 p-2 rounded bg-secondary/20 border border-border/50 text-xs">
                <span className={cn(
                  'font-medium',
                  event.type === 'delay' ? 'text-amber-400' : 'text-foreground'
                )}>
                  {event.event}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

import { cn } from '@/lib/utils';
