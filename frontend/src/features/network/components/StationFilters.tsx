import React from 'react';
import { SearchInput } from '@/components/ui/FormControls';
import { Select } from '@/components/ui';
import { RailwayNetwork } from '@/features/network/types';

export interface StationFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
  line: string;
  setLine: (val: string) => void;
  network: RailwayNetwork;
}

export const StationFilters: React.FC<StationFiltersProps> = ({
  search,
  setSearch,
  status,
  setStatus,
  line,
  setLine,
  network,
}) => {
  const statuses = ['ALL', 'OPERATIONAL', 'BUSY', 'CONGESTED', 'MAINTENANCE', 'RESTRICTED', 'CLOSED'];

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 bg-secondary/20 p-4 rounded-lg border border-border">
      <div className="flex-1 min-w-[240px]">
        <SearchInput
          placeholder="Search stations, codes or lines..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-muted-foreground uppercase">Status</span>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {statuses.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-muted-foreground uppercase">Line</span>
          <Select
            value={line}
            onChange={(e) => setLine(e.target.value)}
          >
            <option value="ALL">All Lines</option>
            {network.lines.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};
