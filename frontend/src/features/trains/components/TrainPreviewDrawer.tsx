import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui';
import { Train, TrainRoute } from '@/features/trains/types/train';
import { RailwayNetwork } from '@/features/network/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getDelaySeverity, getOccupancyLevel } from '@/features/trains/utils/trainUtils';
import { MapPin, Activity, Gauge, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrainPreviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  train: Train | null;
  network: RailwayNetwork;
  onViewOnNetwork: (trainId: string) => void;
}

export const TrainPreviewDrawer: React.FC<TrainPreviewDrawerProps> = ({
  isOpen,
  onClose,
  train,
  network,
  onViewOnNetwork,
}) => {
  if (!train) return null;

  const occupancy = (train.passengerLoad / train.capacity) * 100;
  const resolveStation = (id?: string) => {
    if (!id) return '—';
    const station = network.nodes.find(n => n.id === id) ||
                    network.nodes.find(n => n.id === id.replace('st-', 'node-'));
    return station?.label || id;
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-w-md mx-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-foreground">{train.name}</h2>
              <p className="text-sm font-mono text-muted-foreground">{train.trainNumber} • {train.type}</p>
            </div>
            <StatusBadge state={train.status as any} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-secondary/30 border border-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
                <Clock className="h-3 w-3" />
                <span>Service Status</span>
              </div>
              <p className={cn(
                'text-sm font-bold',
                train.serviceStatus === 'On Time' ? 'text-emerald-400' : 'text-amber-400'
              )}>
                {train.serviceStatus} ({train.schedule.delayMinutes} min)
              </p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/30 border border-border space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
                <Activity className="h-3 w-3" />
                <span>Occupancy</span>
              </div>
              <p className="text-sm font-bold">
                {Math.round(occupancy)}% ({train.passengerLoad}/{train.capacity})
              </p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-secondary/30 border border-border space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
              <MapPin className="h-3 w-3" />
              <span>Route & Location</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-2">
              <div className="text-center flex-1">
                <p className="text-[10px] text-muted-foreground uppercase">Origin</p>
                <p className="text-xs font-medium">{resolveStation(train.originStationId)}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="text-center flex-1">
                <p className="text-[10px] text-muted-foreground uppercase">Destination</p>
                <p className="text-xs font-medium">{resolveStation(train.destinationStationId)}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Current Location:</span>
              <span className="text-xs font-bold">{resolveStation(train.currentStationId) || 'In Section'}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-secondary/30 border border-border space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
              <Gauge className="h-3 w-3" />
              <span>Performance</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Speed:</span>
                <span className="font-mono">{train.currentSpeed} km/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Max Speed:</span>
                <span className="font-mono">{train.maxSpeed} km/h</span>
              </div>
            </div>
          </div>

          <Button
            className="w-full h-11 font-bold uppercase tracking-wider"
            onClick={() => onViewOnNetwork(train.id)}
          >
            View on Network
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
