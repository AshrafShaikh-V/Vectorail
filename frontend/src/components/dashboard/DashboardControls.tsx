import React from 'react';
import { Button, Select } from '@/components/ui';
import { RefreshCw, Filter } from 'lucide-react';

interface DashboardControlsProps {
  onRefresh: () => void;
}

export const DashboardControls: React.FC<DashboardControlsProps> = ({ onRefresh }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-lg border border-border bg-secondary/30 backdrop-blur-sm mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-[10px] font-mono uppercase text-muted-foreground">Network</label>
          <Select defaultValue="all" className="h-8 text-xs">
            <option value="all">All Networks</option>
            <option value="sector-01">Sector 01 (North)</option>
            <option value="sector-02">Sector 02 (South)</option>
            <option value="metro">Metro Transit</option>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[10px] font-mono uppercase text-muted-foreground">Shift</label>
          <Select defaultValue="current" className="h-8 text-xs">
            <option value="current">Current Shift</option>
            <option value="morning">Morning (06:00-14:00)</option>
            <option value="evening">Evening (14:00-22:00)</option>
            <option value="night">Night (22:00-06:00)</option>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[10px] font-mono uppercase text-muted-foreground">View</label>
          <Select defaultValue="standard" className="h-8 text-xs">
            <option value="standard">Standard</option>
            <option value="critical">Critical Only</option>
            <option value="detailed">Detailed Telemetry</option>
          </Select>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs gap-1.5"
          onClick={() => {}}
        >
          <Filter className="h-3 w-3" />
          <span>Advanced Filters</span>
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="h-8 text-xs gap-1.5"
          onClick={onRefresh}
        >
          <RefreshCw className="h-3 w-3" />
          <span>Refresh Data</span>
        </Button>
      </div>
    </div>
  );
};
