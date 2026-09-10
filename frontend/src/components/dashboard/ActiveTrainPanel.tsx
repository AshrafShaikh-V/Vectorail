import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardTrain } from '@/data/dashboardData';

interface ActiveTrainPanelProps {
  trains: DashboardTrain[];
}

const getDelaySeverity = (delay: number) => {
  if (delay === 0) return { text: 'On time', color: 'text-emerald-400' };
  if (delay <= 10) return { text: `+${delay} min`, color: 'text-amber-400' };
  if (delay <= 30) return { text: `+${delay} min`, color: 'text-orange-400' };
  return { text: `+${delay} min`, color: 'text-rose-400' };
};

export const ActiveTrainPanel: React.FC<ActiveTrainPanelProps> = ({ trains }) => {
  const navigate = useNavigate();

  return (
    <Card className="border-border bg-card/50 h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle className="text-sm font-bold uppercase tracking-wider font-mono">
            Active Train Operations
          </CardTitle>
          <CardDescription className="text-[11px]">Current fleet status across network sections</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-xs gap-1 h-7" onClick={() => navigate('/trains')}>
          View All <ExternalLink className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/40 text-muted-foreground border-b border-border uppercase font-mono text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Train</th>
                <th className="py-3 px-4">Route</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Delay</th>
                <th className="py-3 px-4">Next</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {trains.map((train) => (
                <tr key={train.id} className="hover:bg-secondary/30 transition-colors group">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-foreground font-mono text-xs">{train.id}</div>
                    <div className="text-muted-foreground text-[11px]">{train.name}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-muted-foreground truncate max-w-[120px]">
                    {train.route}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge state={train.status.toUpperCase().replace(' ', '_') as any} />
                  </td>
                  <td className="py-3 px-4 font-medium text-foreground">{train.location}</td>
                  <td className="py-3 px-4 font-mono text-xs">
                    <span className={getDelaySeverity(train.delay).color}>
                      {getDelaySeverity(train.delay).text}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{train.nextStation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
