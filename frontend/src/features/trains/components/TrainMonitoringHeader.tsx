import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui';

interface TrainMonitoringHeaderProps {
  trainCount: number;
  lastUpdated: string;
  onRefresh: () => void;
}

export const TrainMonitoringHeader: React.FC<TrainMonitoringHeaderProps> = ({
  trainCount,
  lastUpdated,
  onRefresh,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Train Monitoring</h1>
        <p className="text-sm text-muted-foreground">
          Monitor active services, delays, locations, and operational status across the network.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Last Update</p>
          <p className="text-xs font-medium text-foreground">{lastUpdated}</p>
        </div>
        <div className="text-right hidden sm:block border-l border-border pl-4">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Active Fleet</p>
          <p className="text-xs font-medium text-foreground">{trainCount} Trains</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          className="gap-2 h-9 px-3"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </Button>
      </div>
    </div>
  );
};
