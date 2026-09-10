import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Train } from '@/features/trains/types/train';
import { RailwayNetwork } from '@/features/network/types';
import { MapPin, Gauge, Activity, ArrowRight } from 'lucide-react';

interface TrainOperationalInfoProps {
  train: Train;
  network: RailwayNetwork;
}

export const TrainOperationalInfo: React.FC<TrainOperationalInfoProps> = ({ train, network }) => {
  const resolveStation = (id?: string) => {
    if (!id) return '—';
    const station = network.nodes.find(n => n.id === id) ||
                    network.nodes.find(n => n.id === id.replace('st-', 'node-'));
    return station?.label || id;
  };

  const resolveSection = (id?: string) => {
    if (!id) return '—';
    const section = network.sections.find(s => s.id === id);
    return section ? section.name : id;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-card border-border">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <MapPin className="h-3 w-3" />
            Current Location
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[10px] font-mono text-muted-foreground uppercase">Current Station</p>
              <p className="text-sm font-bold">{resolveStation(train.currentStationId)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-mono text-muted-foreground uppercase">Next Station</p>
              <p className="text-sm font-bold">{resolveStation(train.nextStationId)}</p>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-secondary/30 border border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground uppercase">Active Section:</span>
              <span className="text-xs font-medium">{resolveSection(train.currentSectionId)}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
              {resolveStation(train.currentStationId)} <ArrowRight className="h-3 w-3" /> {resolveStation(train.nextStationId)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Gauge className="h-3 w-3" />
            Performance & Telemetry
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-[10px] font-mono text-muted-foreground uppercase">Current Speed</p>
            <p className="text-xl font-bold font-mono">{train.currentSpeed} <span className="text-xs font-normal text-muted-foreground">km/h</span></p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-mono text-muted-foreground uppercase">Max Permitted</p>
            <p className="text-xl font-bold font-mono">{train.maxSpeed} <span className="text-xs font-normal text-muted-foreground">km/h</span></p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-mono text-muted-foreground uppercase">Current Delay</p>
            <p className={cn(
              'text-xl font-bold font-mono',
              train.schedule.delayMinutes === 0 ? 'text-emerald-400' :
              train.schedule.delayMinutes < 15 ? 'text-amber-400' : 'text-rose-400'
            )}>
              {train.schedule.delayMinutes === 0 ? 'On Time' : `+${train.schedule.delayMinutes} min`}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-mono text-muted-foreground uppercase">Last Telemetry</p>
            <p className="text-sm font-mono">{new Date(train.lastUpdated).toLocaleTimeString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

import { cn } from '@/lib/utils';
