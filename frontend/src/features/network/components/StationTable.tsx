import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Station, RailwayNetwork } from '@/features/network/types';
import { cn } from '@/lib/utils';

interface StationTableProps {
  stations: Station[];
  network: RailwayNetwork;
  selectedStationId?: string;
  onStationSelect: (id: string) => void;
}

export const StationTable: React.FC<StationTableProps> = ({
  stations,
  network,
  selectedStationId,
  onStationSelect,
}) => {
  const getStationLines = (stationId: string) => {
    return network.lines.filter(line => line.stations.includes(stationId));
  };

  const getConnectedSectionsCount = (stationId: string) => {
    // In mock data, we look for sections where startNodeId or endNodeId matches
    // Note: the types say startNodeId/endNodeId are used, and stations are separate.
    // We need to map station id to node id.
    // Looking at mockData, st-01 is node-01, etc.
    // A more robust way would be a mapping, but for now we'll assume st-X maps to node-X.
    const nodeId = stationId.replace('st-', 'node-');
    return network.sections.filter(sec => sec.startNodeId === nodeId || sec.endNodeId === nodeId).length;
  };

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Station</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Line</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Platforms</TableHead>
          <TableHead className="text-center">Tracks</TableHead>
          <TableHead>Activity</TableHead>
          <TableHead className="text-right">Connections</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stations.map((station) => {
          const lines = getStationLines(station.id);
          const isSelected = selectedStationId === station.id;

          return (
            <TableRow
              key={station.id}
              className={cn(isSelected && 'bg-muted')}
              onClick={() => onStationSelect(station.id)}
              data-state={isSelected ? 'selected' : undefined}
            >
              <TableCell className="font-medium">{station.label}</TableCell>
              <TableCell className="font-mono text-xs">{station.code}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  {lines.map(line => (
                    <span
                      key={line.id}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: line.color }}
                      title={line.name}
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge state={station.status as any} />
              </TableCell>
              <TableCell className="text-center">{station.platforms}</TableCell>
              <TableCell className="text-center">{station.tracks}</TableCell>
              <TableCell className={cn('text-xs font-medium', getActivityColor(station.activityLevel))}>
                {station.activityLevel}
              </TableCell>
              <TableCell className="text-right font-mono text-xs">
                {getConnectedSectionsCount(station.id)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
