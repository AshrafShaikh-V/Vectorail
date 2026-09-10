import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { RailwaySection, RailwayNetwork } from '@/features/network/types';
import { cn } from '@/lib/utils';

interface SectionTableProps {
  sections: RailwaySection[];
  network: RailwayNetwork;
  selectedSectionId?: string;
  onSectionSelect: (id: string) => void;
}

export const SectionTable: React.FC<SectionTableProps> = ({
  sections,
  network,
  selectedSectionId,
  onSectionSelect,
}) => {
  const getSectionLine = (lineId: string) => {
    return network.lines.find(l => l.id === lineId);
  };

  const getSectionEndpoints = (section: RailwaySection) => {
    const fromNode = network.nodes.find(n => n.id === section.startNodeId);
    const toNode = network.nodes.find(n => n.id === section.endNodeId);
    return {
      from: fromNode?.label || 'Unknown',
      to: toNode?.label || 'Unknown',
    };
  };

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Section</TableHead>
          <TableHead>Route</TableHead>
          <TableHead>Line</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Util.</TableHead>
          <TableHead>Congestion</TableHead>
          <TableHead className="text-center">Limit</TableHead>
          <TableHead className="text-center">Tracks</TableHead>
          <TableHead className="text-center">Elec.</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sections.map((section) => {
          const line = getSectionLine(section.lineId);
          const endpoints = getSectionEndpoints(section);
          const congestion = getCongestionLevel(section.utilization);
          const isSelected = selectedSectionId === section.id;

          return (
            <TableRow
              key={section.id}
              className={cn(isSelected && 'bg-muted')}
              onClick={() => onSectionSelect(section.id)}
              data-state={isSelected ? 'selected' : undefined}
            >
              <TableCell className="font-medium">{section.name}</TableCell>
              <TableCell className="text-xs font-mono">
                {endpoints.from} → {endpoints.to}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: line?.color }} />
                  <span className="text-xs">{line?.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge state={section.status as any} />
              </TableCell>
              <TableCell className="text-center font-mono text-xs">
                {section.utilization}%
              </TableCell>
              <TableCell className={cn('text-xs font-medium', getCongestionColor(congestion))}>
                {congestion}
              </TableCell>
              <TableCell className="text-center text-xs">
                {section.speedLimit} km/h
              </TableCell>
              <TableCell className="text-center text-xs">
                {section.tracks}
              </TableCell>
              <TableCell className="text-center text-xs">
                {section.electrified ? 'Yes' : 'No'}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
