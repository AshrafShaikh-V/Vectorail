import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Train } from '@/features/trains/types/train';
import { TrainRoute } from '@/features/trains/types/trainRoute';
import { RailwayNetwork } from '@/features/network/types';
import { MapPin, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrainRouteProgressProps {
  train: Train;
  route: TrainRoute;
  network: RailwayNetwork;
}

export const TrainRouteProgress: React.FC<TrainRouteProgressProps> = ({
  train,
  route,
  network,
}) => {
  const resolveStation = (id?: string) => {
    if (!id) return '—';
    const station = network.nodes.find(n => n.id === id) ||
                    network.nodes.find(n => n.id === id.replace('st-', 'node-'));
    return station?.label || id;
  };

  // Determine if station is completed, current, or upcoming
  const getStopStatus = (stopId: string) => {
    if (train.currentStationId === stopId) return 'current';

    const currentStopIndex = route.stops.findIndex(s => s.stationId === train.currentStationId);
    const stopIndex = route.stops.findIndex(s => s.stationId === stopId);

    if (currentStopIndex > stopIndex) return 'completed';
    return 'upcoming';
  };

  return (
    <Card className="bg-card border-border overflow-hidden">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <MapPin className="h-3 w-3" />
          Route Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative flex flex-col gap-6">
          {/* Vertical Line */}
          <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-secondary/30" />

          {route.stops.map((stop, index) => {
            const status = getStopStatus(stop.stationId);

            return (
              <div key={stop.stationId} className="relative pl-8 flex items-start gap-4">
                {/* Node Indicator */}
                <div className="absolute left-0 top-1 z-10">
                  {status === 'completed' ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : status === 'current' ? (
                    <div className="h-4 w-4 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'text-sm font-medium transition-colors',
                      status === 'current' ? 'text-foreground font-bold' :
                      status === 'completed' ? 'text-muted-foreground' : 'text-foreground'
                    )}>
                      {resolveStation(stop.stationId)}
                    </span>
                    {status === 'current' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono uppercase">
                        Current
                      </span>
                    )}
                  </div>
                  {stop.scheduledArrival && (
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Arr: {stop.scheduledArrival}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
