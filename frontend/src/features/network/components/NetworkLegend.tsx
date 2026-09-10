import React from 'react';
import { Card, CardContent } from '@/components/ui';

export const NetworkLegend: React.FC = () => {
  return (
    <Card className="border-border bg-card/80 backdrop-blur-sm w-full max-w-xs">
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono mb-2">
            Network Elements
          </h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Station</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="h-2 w-2 rounded-sm bg-sky-400" />
              <span>Junction</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="h-2 w-2 rounded-full bg-amber-400" />
              <span>Signal / Depot</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono mb-2">
            Congestion Level
          </h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="h-1 w-8 bg-emerald-500 rounded-full" />
              <span>Low / Normal</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="h-1 w-8 bg-amber-500 rounded-full" />
              <span>Moderate</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="h-1 w-8 bg-orange-500 rounded-full" />
              <span>Heavy Traffic</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="h-1 w-8 bg-rose-500 rounded-full" />
              <span>Critical</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground font-mono mb-2">
            Operational Status
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-[10px]">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Operational</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span>Degraded</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <div className="h-2 w-2 rounded-full bg-muted-foreground" />
              <span>Maintenance</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
