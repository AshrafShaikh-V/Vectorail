import React from 'react';
import { SearchInput } from '@/components/ui/FormControls';
import { Select, Button } from '@/components/ui';
import { TrainFilter, TrainType, TrainOperationalStatus, TrainServiceStatus, TrainDirection } from '@/features/trains/types/train';
import { RailwayNetwork } from '@/features/network/types';

interface TrainFiltersProps {
  filters: TrainFilter;
  setFilters: (filters: TrainFilter) => void;
  network: RailwayNetwork;
}

export const TrainFilters: React.FC<TrainFiltersProps> = ({
  filters,
  setFilters,
  network,
}) => {
  const updateFilter = (key: keyof TrainFilter, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    setFilters({});
  };

  const statuses: TrainOperationalStatus[] = ['Running', 'Stopped', 'Boarding', 'Arriving', 'Departed', 'Cancelled', 'Terminated'];
  const serviceStatuses: TrainServiceStatus[] = ['On Time', 'Delayed', 'Minor Delay', 'Major Delay', 'Critical Delay'];
  const trainTypes: TrainType[] = ['Express', 'Intercity', 'Regional', 'Local', 'Freight', 'Special'];
  const directions: TrainDirection[] = ['UP', 'DOWN'];

  return (
    <div className="space-y-4 mb-8 bg-secondary/20 p-4 rounded-lg border border-border">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 w-full">
          <SearchInput
            placeholder="Search train number, name, origin, destination, or line..."
            value={filters.search || ''}
            onChange={(e) => updateFilter('search', e.target.value)}
            onClear={() => updateFilter('search', '')}
          />
        </div>
        <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs h-9">
          Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-muted-foreground uppercase whitespace-nowrap">Status</span>
          <Select
            value={filters.status || 'ALL'}
            onChange={(e) => updateFilter('status', e.target.value === 'ALL' ? undefined : e.target.value)}
          >
            <option value="ALL">All</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-muted-foreground uppercase whitespace-nowrap">Type</span>
          <Select
            value={filters.type || 'ALL'}
            onChange={(e) => updateFilter('type', e.target.value === 'ALL' ? undefined : e.target.value)}
          >
            <option value="ALL">All</option>
            {trainTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-muted-foreground uppercase whitespace-nowrap">Line</span>
          <Select
            value={filters.lineId || 'ALL'}
            onChange={(e) => updateFilter('lineId', e.target.value === 'ALL' ? undefined : e.target.value)}
          >
            <option value="ALL">All Lines</option>
            {network.lines.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-muted-foreground uppercase whitespace-nowrap">Direction</span>
          <Select
            value={filters.direction || 'ALL'}
            onChange={(e) => updateFilter('direction', e.target.value === 'ALL' ? undefined : e.target.value)}
          >
            <option value="ALL">All</option>
            {directions.map(d => <option key={d} value={d}>{d}</option>)}
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-muted-foreground uppercase whitespace-nowrap">Service</span>
          <Select
            value={filters.serviceStatus || 'ALL'}
            onChange={(e) => updateFilter('serviceStatus', e.target.value === 'ALL' ? undefined : e.target.value)}
          >
            <option value="ALL">All</option>
            {serviceStatuses.map(s => <option key={s} value={s}>{s}</option>)}
          </Select>
        </div>
      </div>
    </div>
  );
};
