import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { ShieldCheck, Activity } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface OperationalHealthProps {
  data: {
    overallStatus: string;
    components: { label: string; status: string }[];
  };
}

export const OperationalHealthCard: React.FC<OperationalHealthProps> = ({ data }) => {
  return (
    <Card className="border-border bg-card/50 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold uppercase tracking-wider font-mono">
            Operational Health
          </CardTitle>
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-secondary/20 border border-border space-y-2">
          <span className="text-xs font-mono text-muted-foreground uppercase">Overall Status</span>
          <StatusBadge state={data.overallStatus.toUpperCase() as any} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.components.map((comp, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded border border-border bg-card/30">
              <span className="text-xs text-muted-foreground">{comp.label}</span>
              <span className={cn(
                'text-[10px] font-mono font-bold',
                comp.status === 'Healthy' && 'text-emerald-400',
                comp.status === 'Degraded' && 'text-amber-400',
                comp.status === 'Critical' && 'text-rose-400',
                comp.status === 'Stable' && 'text-emerald-400',
              )}>
                {comp.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
