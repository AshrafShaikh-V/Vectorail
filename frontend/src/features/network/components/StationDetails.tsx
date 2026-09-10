import React from 'react';
import { Station, RailwayNetwork, RailwaySection } from '@/features/network/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { MapPin, Activity, Layers, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StationDetailsProps {
  station: Station;
  network: RailwayNetwork;
  onSectionSelect: (id: string) => void;
}

export const StationDetails: React.FC<StationDetailsProps> = ({
  station,
  network,
  onSectionSelect,
}) => {
  const stationLines = network.lines.filter(line => line.stations.includes(station.id));

  // Map station ID to node ID
  const nodeId = station.id.replace('st-', 'node-');
  const connectedSections = network.sections.filter(sec => sec.startNodeId === nodeId || sec.endNodeId === nodeId);

  const getActivityColor = (level: Station['activityLevel']) => {
    switch (level) {
      case 'LOW': return 'text-emerald-400';
      case 'MODERATE': return 'text-amber-400';
      case 'HIGH': return 'text-orange-400';
      case 'CRITICAL': return 'text-rose-400';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 py-2">
      {/* Identity Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground leading-tight">{station.label}</h3>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{station.code} • {station.city}</p>
          </div>
          <StatusBadge state={station.status as any} />
        </div>
      </div>

      {/* Location & Network */}
      <div className="p-3 rounded-lg bg-secondary/30 border border-border space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-tight">
          <MapPin className="h-3 w-3 text-emerald-400" />
          <span>Location & Network</span>
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-[11px]">
          <span className="text-muted-foreground">Coordinates:</span>
          <span className="text-right font-mono">{station.coordinates.lat.toFixed(4)}, {station.coordinates.lng.toFixed(4)}</span>
          <span className="text-muted-foreground">Network:</span>
          <span className="text-right">{network.name}</span>
          <span className="text-muted-foreground">Line(s):</span>
          <div className="flex justify-end gap-1">
            {stationLines.map(l => (
              <span key={l.id} className="px-1.5 py-0.5 rounded bg-foreground/10 text-[10px]">{l.name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Infrastructure */}
      <div className="p-3 rounded-lg bg-secondary/30 border border-border space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-tight">
          <Layers className="h-3 w-3 text-emerald-400" />
          <span>Infrastructure</span>
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-[11px]">
          <span className="text-muted-foreground">Platforms:</span>
          <span className="text-right font-mono">{station.platforms}</span>
          <span className="text-muted-foreground">Tracks:</span>
          <span className="text-right font-mono">{station.tracks}</span>
          <span className="text-muted-foreground">Connected Sections:</span>
          <span className="text-right font-mono">{connectedSections.length}</span>
        </div>
      </div>

      {/* Operational Status */}
      <div className="p-3 rounded-lg bg-secondary/30 border border-border space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-tight">
          <Activity className="h-3 w-3 text-emerald-400" />
          <span>Operational Status</span>
        </div>
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-muted-foreground">Passenger Activity:</span>
          <span className={cn('font-bold uppercase', getActivityColor(station.activityLevel))}>
            {station.activityLevel}
          </span>
        </div>
      </div>

      {/* Connections */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-tight">
          <LinkIcon className="h-3 w-3 text-emerald-400" />
          <span>Connected Sections</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {connectedSections.length > 0 ? (
            connectedSections.map(sec => (
              <button
                key={sec.id}
                onClick={() => onSectionSelect(sec.id)}
                className="flex items-center justify-between p-2 rounded-md bg-card border border-border hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group text-left"
              >
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium text-foreground group-hover:text-emerald-400 transition-colors">{sec.name}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">{sec.id}</span>
                </div>
                <StatusBadge state={sec.status as any} />
              </button>
            ))
          ) : (
            <p className="text-[11px] text-muted-foreground italic">No connected sections found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
