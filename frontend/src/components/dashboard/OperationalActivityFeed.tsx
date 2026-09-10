import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Clock, TrainFront, Network, ShieldAlert } from 'lucide-react';
import { OperationalActivity, DASHBOARD_MOCK_DATA } from '@/data/dashboardData';

interface ActivityItemProps {
  activity: OperationalActivity;
}

const ActivityIcon = ({ type }: { type: OperationalActivity['type'] }) => {
  switch (type) {
    case 'train': return <TrainFront className="h-3 w-3 text-emerald-400" />;
    case 'network': return <Network className="h-3 w-3 text-sky-400" />;
    case 'maintenance': return <ShieldAlert className="h-3 w-3 text-amber-400" />;
    case 'system': return <Clock className="h-3 w-3 text-muted-foreground" />;
    default: return null;
  }
};

export const OperationalActivityFeed: React.FC = () => {
  const { recentActivity } = DASHBOARD_MOCK_DATA;

  return (
    <Card className="border-border bg-card/50 h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm font-bold uppercase tracking-wider font-mono">
          Recent Operational Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-border">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="relative group">
              <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-card border-2 border-border group-hover:border-emerald-500 transition-colors z-10" />
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground">{activity.time}</span>
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-secondary/30 border border-border">
                      <ActivityIcon type={activity.type} />
                      <span className="text-[9px] uppercase font-medium text-muted-foreground">{activity.type}</span>
                    </div>
                  </div>
                  <p className="text-xs text-foreground font-medium">
                    {activity.event}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
