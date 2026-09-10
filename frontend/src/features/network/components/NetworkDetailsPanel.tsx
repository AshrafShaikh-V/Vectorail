import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { X, MapPin, Activity, Gauge, Info } from 'lucide-react';
import { NetworkNode, TrackConnection } from '@/features/network/types';
import { Button } from '@/components/ui';

interface NetworkDetailsPanelProps {
  data: NetworkNode | TrackConnection | null;
  onClose: () => void;
}

export const NetworkDetailsPanel: React.FC<NetworkDetailsPanelProps> = ({ data, onClose }) => {
  if (!data) return null;

  const isNode = 'type' in data;

  return (
    <div className="absolute top-4 right-4 z-30 w-80 animate-in slide-in-from-right duration-300">
      <Card className="bg-card/95 backdrop-blur-md border-border shadow-2xl">
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-bold font-mono uppercase tracking-tight">
            {isNode ? 'Node Details' : 'Connection Details'}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full"
            onClick={onClose}
          >
            <X className="h-3 w-3" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-4">
          <div className="p-3 rounded-lg bg-secondary/30 border border-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <Info className="h-3 w-3 text-emerald-400" />
              <span>Identification</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <span className="text-muted-foreground">ID:</span>
              <span className="font-mono text-right">{data.id}</span>
              <span className="text-muted-foreground">Label:</span>
              <span className="text-right">{isNode ? data.label : `Segment ${data.id}`}</span>
            </div>
          </div>

          {isNode ? (
            <>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <MapPin className="h-3 w-3 text-emerald-400" />
                  <span>Location & Type</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="text-right uppercase">{data.type}</span>
                  <span className="text-muted-foreground">Coordinates:</span>
                  <span className="text-right font-mono">{data.coordinates.lat.toFixed(4)}, {data.coordinates.lng.toFixed(4)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Activity className="h-3 w-3 text-emerald-400" />
                  <span>Operational Status</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-muted-foreground">Current State:</span>
                  <span className={`font-bold uppercase ${
                    data.status === 'OPERATIONAL' ? 'text-emerald-400' :
                    data.status === 'DEGRADED' ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {data.status}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Gauge className="h-3 w-3 text-emerald-400" />
                  <span>Technical Specs</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <span className="text-muted-foreground">Length:</span>
                  <span className="text-right">{data.lengthKm} km</span>
                  <span className="text-muted-foreground">Max Speed:</span>
                  <span className="text-right">{data.maxSpeed} km/h</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Activity className="h-3 w-3 text-emerald-400" />
                  <span>Traffic Analysis</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <span className="text-muted-foreground">Utilization:</span>
                  <span className="text-right">{data.currentUtilization}%</span>
                  <span className="text-muted-foreground">Congestion:</span>
                  <span className={`text-right font-bold uppercase ${
                    data.congestionLevel === 'LOW' ? 'text-emerald-400' :
                    data.congestionLevel === 'MODERATE' ? 'text-amber-400' :
                    data.congestionLevel === 'HEAVY' ? 'text-orange-400' : 'text-rose-400'
                  }`}>
                    {data.congestionLevel}
                  </span>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
