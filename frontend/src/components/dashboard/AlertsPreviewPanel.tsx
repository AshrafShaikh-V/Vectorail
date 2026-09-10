import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardAlert } from '@/data/dashboardData';

interface AlertsPreviewPanelProps {
  alerts: DashboardAlert[];
}

export const AlertsPreviewPanel: React.FC<AlertsPreviewPanelProps> = ({ alerts }) => {
  const navigate = useNavigate();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
      case 'HIGH': return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
      case 'MEDIUM': return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      case 'LOW': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      default: return 'text-muted-foreground border-border bg-secondary/10';
    }
  };

  return (
    <Card className="border-border bg-card/50 h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="space-y-1">
          <CardTitle className="text-sm font-bold uppercase tracking-wider font-mono">
            Operational Alerts
          </CardTitle>
          <CardDescription className="text-[11px]">High-priority network and safety warnings</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-xs gap-1 h-7" onClick={() => navigate('/alerts')}>
          View All <ExternalLink className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="p-3 rounded-lg border border-border bg-secondary/10 space-y-2">
            <div className="flex justify-between items-center">
              <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded border font-mono', getSeverityColor(alert.severity))}>
                {alert.severity}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">{alert.timestamp}</span>
            </div>
            <div className="text-xs font-semibold text-foreground">{alert.title}</div>
            <div className="text-[11px] text-muted-foreground font-mono">{alert.source}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
