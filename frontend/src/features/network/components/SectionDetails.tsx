import React from 'react';
import { RailwaySection, RailwayNetwork } from '@/features/network/types';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { MapPin, Gauge, Activity, Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionDetailsProps {
  section: RailwaySection;
  network: RailwayNetwork;
  onStationSelect: (id: string) => void;
}

export const SectionDetails: React.FC<SectionDetailsProps> = ({
  section,
  network,
  onStationSelect,
}) => {
  const line = network.lines.find(l => l.id === section.lineId);
  const fromNode = network.nodes.find(n => n.id === section.startNodeId);
  const toNode = network.nodes.find(n => n.id === section.endNodeId);

  const getCongestionLevel = (utilization: number) => {
    if (utilization > 80) return 'CRITICAL';
    if (utilization > 60) return 'HEAVY';
    if (utilization > 30) return 'MODERATE';
    return 'LOW';
  };

  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-emerald-400';
      case 'MODERATE': return 'text-amber-400';
      case 'HEAVY': return 'text-orange-400';
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
            <h3 className="text-lg font-bold text-foreground leading-tight">{section.name}</h3>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{section.id}</p>
          </div>
          <StatusBadge state={section.status as any} />
        </div>
      </div>

      {/* Endpoints */}
      <div className="p-3 rounded-lg bg-secondary/30 border border-border space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-tight">
          <MapPin className="h-3 w-3 text-emerald-400" />
          <span>Endpoints & Line</span>
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-[11px]">
          <span className="text-muted-foreground">From Station:</span>
          <span className="text-right font-medium">{fromNode?.label || 'Unknown'}</span>
          <span className="text-muted-foreground">To Station:</span>
          <span className="text-right font-medium">{toNode?.label || 'Unknown'}</span>
          <span className="text-muted-foreground">Railway Line:</span>
          <span className="text-right">{line?.name || 'Unknown'}</span>
        </div>
      </div>

      {/* Infrastructure */}
      <div className="p-3 rounded-lg bg-secondary/30 border border-border space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-tight">
          <Gauge className="h-3 w-3 text-emerald-400" />
          <span>Technical Specifications</span>
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-[11px]">
          <span className="text-muted-foreground">Speed Limit:</span>
          <span className="text-right font-mono">{section.speedLimit} km/h</span>
          <span className="text-muted-foreground">Tracks:</span>
          <span className="text-right font-mono">{section.tracks}</span>
          <span className="text-muted-foreground">Electrified:</span>
          <span className="text-right">{section.electrified ? 'Yes' : 'No'}</span>
        </div>
      </div>

      {/* Operations */}
      <div className="p-3 rounded-lg bg-secondary/30 border border-border space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-tight">
          <Activity className="h-3 w-3 text-emerald-400" />
          <span>Operational Analysis</span>
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-[11px]">
          <span className="text-muted-foreground">Utilization:</span>
          <span className="text-right font-mono">{section.utilization}%</span>
          <span className="text-muted-foreground">Congestion:</span>
          <span className={cn('text-right font-bold uppercase', getCongestionColor(getCongestionLevel(section.utilization)))}>
            {getCongestionLevel(section.utilization)}
          </span>
        </div>
      </div>

      {/* Connection Information */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-foreground uppercase tracking-tight">
          <LinkIcon className="h-3 w-3 text-emerald-400" />
          <span>Related Nodes</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {/* Start Node */}
          <button
            onClick={() => {
              // To select a node in the network, we need the node ID.
              // Assuming we can just call onStationSelect with the node ID.
              // Note: st-X mapping to node-X.
              onStationSelect(section.startNodeId);
            }}
            className="flex items-center justify-between p-2 rounded-md bg-card border border-border hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group text-left"
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-foreground group-hover:text-emerald-400 transition-colors">{fromNode?.label}</span>
              <span className="text-[10px] text-muted-foreground font-mono">{section.startNodeId}</span>
            </div>
            <span className="text-[10px] text-muted-foreground italic">Start Node</span>
          </button>
          {/* End Node */}
          <button
            onClick={() => {
              onStationSelect(section.endNodeId);
            }}
            className="flex items-center justify-between p-2 rounded-md bg-card border border-border hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group text-left"
          >
            <div className="flex flex-col">
              <span className="text-[11px] font-medium text-foreground group-hover:text-emerald-400 transition-colors">{toNode?.label}</span>
              <span className="text-[10px] text-muted-foreground font-mono">{section.endNodeId}</span>
            </div>
            <span className="text-[10px] text-muted-foreground italic">End Node</span>
          </button>
        </div>
      </div>
    </div>
  );
};
