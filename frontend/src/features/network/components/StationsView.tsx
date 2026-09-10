import React, { useState, useMemo } from 'react';
import { StationFilters } from './StationFilters';
import { StationTable } from './StationTable';
import { EmptyState } from '@/components/ui/FeedbackStates';
import { TableSkeleton } from '@/components/ui/LoadingStates';
import { RailwayNetwork, Station } from '@/features/network/types';
import { MOCK_STATIONS } from '@/features/network/mockData';
import { Search } from 'lucide-react';

interface StationsViewProps {
  network: RailwayNetwork;
  selectedElement: { type: 'node' | 'connection'; id: string } | null;
  onElementSelect: (type: 'node' | 'connection', id: string) => void;
}

export const StationsView: React.FC<StationsViewProps> = ({
  network,
  selectedElement,
  onElementSelect,
}) => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');
  const [line, setLine] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredStations = useMemo(() => {
    return MOCK_STATIONS.filter(station => {
      const matchesSearch =
        station.label.toLowerCase().includes(search.toLowerCase()) ||
        station.code.toLowerCase().includes(search.toLowerCase()) ||
        network.lines.some(l => l.name.toLowerCase().includes(search.toLowerCase()) && l.stations.includes(station.id));

      const matchesStatus = status === 'ALL' || station.status === status;
      const matchesLine = line === 'ALL' || network.lines.find(l => l.id === line)?.stations.includes(station.id);

      return matchesSearch && matchesStatus && matchesLine;
    });
  }, [search, status, line, network]);

  const handleStationSelect = (id: string) => {
    onElementSelect('node', id);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-16 w-full bg-secondary/20 rounded-lg animate-pulse" />
        <TableSkeleton rows={10} cols={8} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Railway Stations</h2>
        <p className="text-sm text-muted-foreground">Inspect and monitor operational status of network stations.</p>
      </div>

      <StationFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        line={line}
        setLine={setLine}
        network={network}
      />

      {filteredStations.length > 0 ? (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <StationTable
            stations={filteredStations}
            network={network}
            selectedStationId={selectedElement?.id}
            onStationSelect={handleStationSelect}
          />
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="No stations found"
          description={`No stations match your current filters: ${search || 'none'}, ${status !== 'ALL' ? status : 'all statuses'}, ${line !== 'ALL' ? line : 'all lines'}.`}
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('');
            setStatus('ALL');
            setLine('ALL');
          }}
        />
      )}
    </div>
  );
};
