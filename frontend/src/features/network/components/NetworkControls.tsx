import React from 'react';
import { Input } from '@/components/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { Search, Filter } from 'lucide-react';
import { NetworkFilter } from '@/features/network/types';

interface NetworkControlsProps {
  filters: NetworkFilter;
  setFilters: React.Dispatch<React.SetStateAction<NetworkFilter>>;
}

export const NetworkControls: React.FC<NetworkControlsProps> = ({ filters, setFilters }) => {
  const updateFilter = (key: keyof NetworkFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl bg-card/90 backdrop-blur-md border border-border shadow-2xl w-80">
      <div className="flex items-center gap-2 mb-1">
        <Filter className="h-4 w-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground font-mono">
          Network Filters
        </h3>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input
          placeholder="Search stations, lines..."
          className="pl-9 h-9 text-xs bg-background/50 border-border focus-visible:ring-emerald-500"
          value={filters.search || ''}
          onChange={(e) => updateFilter('search', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase text-muted-foreground font-mono ml-1">Status</label>
          <Select
            value={filters.status}
            onValueChange={(val) => updateFilter('status', val)}
          >
            <SelectTrigger className="h-8 text-xs bg-background/50 border-border">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="OPERATIONAL">Operational</SelectItem>
              <SelectItem value="DEGRADED">Degraded</SelectItem>
              <SelectItem value="CRITICAL">Critical</SelectItem>
              <SelectItem value="MAINTENANCE">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase text-muted-foreground font-mono ml-1">Congestion</label>
          <Select
            value={filters.congestionLevel}
            onValueChange={(val) => updateFilter('congestionLevel', val)}
          >
            <SelectTrigger className="h-8 text-xs bg-background/50 border-border">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MODERATE">Moderate</SelectItem>
              <SelectItem value="HEAVY">Heavy</SelectItem>
              <SelectItem value="CRITICAL">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className="h-8 text-[10px] text-muted-foreground hover:text-foreground"
        onClick={() => setFilters({})}
      >
        Reset Filters
      </Button>
    </div>
  );
};

// Simple Button implementation since I'm adding it here for completeness
function Button({ children, variant, size, className, ...props }: any) {
  const variants: any = {
    ghost: 'hover:bg-secondary/50 text-muted-foreground',
    secondary: 'bg-secondary text-secondary-foreground'
  };
  const sizes: any = {
    sm: 'px-2 py-1'
  };
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
