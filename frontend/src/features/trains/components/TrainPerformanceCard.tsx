import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Train } from '@/features/trains/types/train';
import { Gauge, Users } from 'lucide-react';
import { getOccupancyLevel } from '@/features/trains/utils/trainUtils';
import { cn } from '@/lib/utils';

interface TrainPerformanceCardProps {
  train: Train;
}

export const TrainPerformanceCard: React.FC<TrainPerformanceCardProps> = ({ train }) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Gauge className="h-3 w-3" />
          Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-muted-foreground uppercase">Current Speed</p>
          <p className="text-lg font-bold font-mono">{train.currentSpeed} <span className="text-xs font-normal text-muted-foreground">km/h</span></p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-muted-foreground uppercase">Max Permitted</p>
          <p className="text-lg font-bold font-mono">{train.maxSpeed} <span className="text-xs font-normal text-muted-foreground">km/h</span></p>
        </div>
      </CardContent>
    </Card>
  );
};

export const TrainOccupancyCard: React.FC<TrainPerformanceCardProps> = ({ train }) => {
  const occupancy = (train.passengerLoad / train.capacity) * 100;
  const level = getOccupancyLevel(occupancy);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Users className="h-3 w-3" />
          Occupancy
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Current Load</span>
          <span className="text-sm font-bold">{train.passengerLoad} / {train.capacity}</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground uppercase">
            <span>Utilization</span>
            <span>{Math.round(occupancy)}%</span>
          </div>
          <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full transition-all duration-500',
                level === 'Overloaded' ? 'bg-rose-400' :
                level === 'High' ? 'bg-orange-400' : 'bg-emerald-400'
              )}
              style={{ width: `${occupancy}%` }}
            />
          </div>
          <div className="text-center">
            <span className={cn(
              'text-[10px] font-bold uppercase px-2 py-0.5 rounded',
              level === 'Overloaded' ? 'bg-rose-500/20 text-rose-400' :
              level === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-emerald-500/20 text-emerald-400'
            )}>
              {level}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
