import React from 'react';
import { Input } from '@/components/ui';
import { Search, X, Filter, RefreshCw } from 'lucide-react';
import { AlertFilter, AlertSeverity, AlertCategory, AlertStatus, AlertSortOption } from '../types';
import { SEVERITY_CONFIG, CATEGORY_CONFIG, STATUS_CONFIG } from '../constants';

interface AlertFiltersProps {
  filter: AlertFilter;
  setFilter: (f: AlertFilter) => void;
  sort: AlertSortOption;
  setSort: (s: AlertSortOption) => void;
  onRefresh: () => void;
}

export const AlertFilters: React.FC<AlertFiltersProps> = ({ filter, setFilter, sort, setSort, onRefresh }) => {
  const updateFilter = (key: keyof AlertFilter, value: any) => {
    setFilter({ ...filter, [key]: value });
  };

  const resetFilters = () => {
    setFilter({});
    setSort('newest');
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-card border border-border rounded-lg space-y-0">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts, trains, stations..."
            className="pl-9 h-9 text-sm"
            value={filter.search || ''}
            onChange={(e) => updateFilter('search', e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mr-2">
            <Filter className="h-3 w-3" /> Filters:
          </div>

          <select
            className="bg-secondary/50 border-border text-xs rounded px-2 py-1 h-8 outline-none focus:ring-1 ring-emerald-500/50"
            value={sort}
            onChange={(e) => setSort(e.target.value as AlertSortOption)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highestSeverity">Highest Severity</option>
            <option value="lowestSeverity">Lowest Severity</option>
            <option value="highestImpact">Highest Impact</option>
            <option value="unresolvedFirst">Unresolved First</option>
          </select>

          <button
            onClick={onRefresh}
            className="p-1.5 rounded bg-secondary/50 border border-border hover:bg-secondary text-muted-foreground transition-colors"
            title="Refresh Alerts"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={resetFilters}
            className="flex items-center gap-1 px-2 py-1 rounded bg-secondary/50 border border-border hover:bg-secondary text-xs text-muted-foreground transition-colors"
          >
            <X className="h-3 w-3" /> Reset
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-muted-foreground/60 ml-1">Severity</span>
          <div className="flex flex-wrap gap-1">
            {Object.keys(SEVERITY_CONFIG).map((s) => (
              <button
                key={s}
                onClick={() => {
                  const current = filter.severity || [];
                  const next = current.includes(s as AlertSeverity)
                    ? current.filter(v => v !== s)
                    : [...current, s as AlertSeverity];
                  updateFilter('severity', next);
                }}
                className={cn(
                  'px-2 py-0.5 rounded text-[10px] font-mono transition-colors border',
                  filter.severity?.includes(s as AlertSeverity)
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                    : 'bg-secondary/30 border-border text-muted-foreground hover:border-muted-foreground/50'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-muted-foreground/60 ml-1">Status</span>
          <div className="flex flex-wrap gap-1">
            {Object.keys(STATUS_CONFIG).map((s) => (
              <button
                key={s}
                onClick={() => {
                  const current = filter.status || [];
                  const next = current.includes(s as AlertStatus)
                    ? current.filter(v => v !== s)
                    : [...current, s as AlertStatus];
                  updateFilter('status', next);
                }}
                className={cn(
                  'px-2 py-0.5 rounded text-[10px] font-mono transition-colors border',
                  filter.status?.includes(s as AlertStatus)
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                    : 'bg-secondary/30 border-border text-muted-foreground hover:border-muted-foreground/50'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-muted-foreground/60 ml-1">Category</span>
          <div className="flex flex-wrap gap-1">
            {Object.keys(CATEGORY_CONFIG).map((c) => (
              <button
                key={c}
                onClick={() => {
                  const current = filter.category || [];
                  const next = current.includes(c as AlertCategory)
                    ? current.filter(v => v !== c)
                    : [...current, c as AlertCategory];
                  updateFilter('category', next);
                }}
                className={cn(
                  'px-2 py-0.5 rounded text-[10px] transition-colors border',
                  filter.category?.includes(c as AlertCategory)
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                    : 'bg-secondary/30 border-border text-muted-foreground hover:border-muted-foreground/50'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
