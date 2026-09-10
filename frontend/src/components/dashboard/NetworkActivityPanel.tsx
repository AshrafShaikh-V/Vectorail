import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { ExternalLink, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NetworkActivity } from '@/data/dashboardData';

interface NetworkActivityPanelProps {
  activity: NetworkActivity[];
}

export const NetworkActivityPanel: React.FC<NetworkActivityPanelProps> = ({ activity }) => {
  const navigate = useNavigate();

  return (
    <Card className="border-border bg-card/50 h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="space-y-1">
          <CardTitle className="text-sm font-bold uppercase tracking-wider font-mono">
            Network Activity
          </CardTitle>
          <CardDescription className="text-[11px]">Section utilization and congestion levels</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-xs gap-1 h-7" onClick={() => navigate('/network')}>
          View Network <ExternalLink className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activity.map((item, i) => (
          <div key={i} className="space-y-1.5 p-3 rounded-lg border border-border bg-secondary/10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-foreground">{item.section}</span>
                <span className={cn(
                  'text-[10px] font-mono px-1.5 py-0.5 rounded border',
                  item.status === 'Operational' && 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
                  item.status === 'Minor Congestion' && 'text-amber-400 border-amber-500/30 bg-amber-500/10',
                  item.status === 'Heavy Traffic' && 'text-orange-400 border-orange-500/30 bg-orange-500/10',
                  item.status === 'Critical' && 'text-rose-400 border-rose-500/30 bg-rose-500/10',
                )}>
                  {item.status}
                </span>
              </div>
              <span className="text-xs font-mono text-foreground">{item.utilization}%</span>
            </div>
            <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full transition-all duration-500',
                  item.utilization < 60 && 'bg-emerald-500',
                  item.utilization >= 60 && item.utilization < 80 && 'bg-amber-500',
                  item.utilization >= 80 && 'bg-rose-500',
                )}
                style={{ width: `${item.utilization}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Helper function for conditional styling in the map
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
