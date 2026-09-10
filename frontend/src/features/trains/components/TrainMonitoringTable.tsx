import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Train } from '@/features/trains/types/train';
import { RailwayNetwork } from '@/features/network/types';
import { getDelaySeverity, getOccupancyLevel, getTrainStatusVariant } from '@/features/trains/utils/trainUtils';
import { cn } from '@/lib/utils';

interface TrainMonitoringTableProps {
  trains: Train[];
  network: RailwayNetwork;
  selectedTrainId?: string;
  onTrainSelect: (id: string) => void;
}

export const TrainMonitoringTable: React.FC<TrainMonitoringTableProps> = ({
  trains,
  network,
  selectedTrainId,
  onTrainSelect,
}) => {
  const resolveStation = (id?: string) => {
    if (!id) return '—';
    const station = network.nodes.find(n => n.id === id) ||
                    // In case of st-X vs node-X mismatch
                    network.nodes.find(n => n.id === id.replace('st-', 'node-'));
    return station?.label || id;
  };

  const resolveSection = (id?: string) => {
    if (!id) return '—';
    const section = network.sections.find(s => s.id === id);
    return section ? section.name : id;
  };

  const resolveLine = (id?: string) => {
    if (!id) return '—';
    const line = network.lines.find(l => l.id === id);
    return line ? line.name : id;
  };

  const getLocationLabel = (train: Train) => {
    if (train.currentStationId) {
      return resolveStation(train.currentStationId);
    }
    if (train.currentSectionId) {
      const section = network.sections.find(s => s.id === train.currentSectionId);
      if (section) {
        return `Section ${section.name}`;
      }
      return `Section ${train.currentSectionId}`;
    }
    return 'Unknown';
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Train</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Route</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Current Location</TableHead>
          <TableHead>Next Station</TableHead>
          <TableHead>Delay</TableHead>
          <TableHead className="text-center">Speed</TableHead>
          <TableHead className="text-center">Occupancy</TableHead>
          <TableHead className="text-right">Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trains.map((train) => {
          const isSelected = selectedTrainId === train.id;
          const delay = train.schedule.delayMinutes;
          const occupancy = (train.passengerLoad / train.capacity) * 100;

          return (
            <TableRow
              key={train.id}
              className={cn(isSelected && 'bg-muted')}
              onClick={() => onTrainSelect(train.id)}
              data-state={isSelected ? 'selected' : undefined}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold font-mono text-foreground">{train.trainNumber}</span>
                  <span className="text-xs text-muted-foreground">{train.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-xs">{train.type}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-xs">{resolveStation(train.originStationId)} → {resolveStation(train.destinationStationId)}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">{resolveLine(train.lineId)}</span>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge state={train.status as any} />
              </TableCell>
              <TableCell className="text-xs font-medium">
                {getLocationLabel(train)}
              </TableCell>
              <TableCell className="text-xs">
                {resolveStation(train.nextStationId)}
              </TableCell>
              <TableCell>
                <span className={cn(
                  'text-xs font-medium',
                  delay === 0 ? 'text-emerald-400' :
                  delay < 15 ? 'text-amber-400' : 'text-rose-400'
                )}>
                  {delay === 0 ? 'On Time' : `+${delay} min`}
                </span>
              </TableCell>
              <TableCell className="text-center font-mono text-xs">
                {train.currentSpeed} <span className="text-[10px] text-muted-foreground">km/h</span>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex flex-col items-center gap-1">
                  <span className={cn('text-xs font-bold',
                    getOccupancyLevel(occupancy) === 'Overloaded' ? 'text-rose-400' :
                    getOccupancyLevel(occupancy) === 'High' ? 'text-orange-400' : 'text-emerald-400'
                  )}>
                    {Math.round(occupancy)}%
                  </span>
                  <div className="w-12 h-1 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn('h-full',
                        getOccupancyLevel(occupancy) === 'Overloaded' ? 'bg-rose-400' :
                        getOccupancyLevel(occupancy) === 'High' ? 'bg-orange-400' : 'bg-emerald-400'
                      )}
                      style={{ width: `${occupancy}%` }}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right text-[10px] font-mono text-muted-foreground">
                {new Date(train.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
