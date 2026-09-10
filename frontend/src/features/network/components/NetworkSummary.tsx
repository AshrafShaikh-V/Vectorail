import React from 'react';
import { RailwayNetwork } from '@/features/network/types';

interface NetworkSummaryProps {
  network: RailwayNetwork;
}

export const NetworkSummary: React.FC<NetworkSummaryProps> = ({ network }) => {
  const totalStations = network.nodes.filter(n => n.type === 'STATION').length;
  const totalSections = network.sections.length;
  const totalConnections = network.connections.length;

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-2 rounded-lg bg-secondary/30 border border-border font-mono text-[11px]">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground uppercase">Stations:</span>
        <span className="text-foreground font-bold">{totalStations}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground uppercase">Sections:</span>
        <span className="text-foreground font-bold">{totalSections}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground uppercase">Connections:</span>
        <span className="text-foreground font-bold">{totalConnections}</span>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-muted-foreground uppercase">Network Status:</span>
        <span className={cn(
          'font-bold uppercase',
          network.status === 'OPERATIONAL' && 'text-emerald-400',
          network.status === 'DEGRADED' && 'text-amber-400',
          network.status === 'CRITICAL' && 'text-rose-400',
        )}>
          {network.status}
        </span>
      </div>
    </div>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
