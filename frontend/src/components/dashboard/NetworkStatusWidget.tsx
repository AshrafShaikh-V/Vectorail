import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Globe, Server } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface NetworkStatusWidgetProps {
  data: {
    availability: string;
    sections: {
      total: number;
      normal: number;
      degraded: number;
      critical: number;
    };
  };
}

export const NetworkStatusWidget: React.FC<NetworkStatusWidgetProps> = ({ data }) => {
  return (
    <Card className="h-full border-border bg-card/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold uppercase tracking-wider font-mono">
            Network Status
          </CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-1">
          <div className="text-3xl font-bold text-foreground font-mono">{data.availability}</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Network Availability</div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
            <span>Active Sections</span>
            <span className="text-foreground font-bold">{data.sections.total}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center p-2 rounded border border-border bg-secondary/10">
              <span className="text-[9px] text-muted-foreground uppercase">Normal</span>
              <span className="text-xs font-bold text-emerald-400">{data.sections.normal}</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded border border-border bg-secondary/10">
              <span className="text-[9px] text-muted-foreground uppercase">Degraded</span>
              <span className="text-xs font-bold text-amber-400">{data.sections.degraded}</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded border border-border bg-secondary/10">
              <span className="text-[9px] text-muted-foreground uppercase">Critical</span>
              <span className="text-xs font-bold text-rose-400">{data.sections.critical}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
