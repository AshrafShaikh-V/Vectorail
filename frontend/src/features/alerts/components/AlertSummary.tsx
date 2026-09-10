import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { AlertSummary } from '../types';
import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  description: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, icon: Icon, color, description }) => (
  <Card className="bg-card border-border overflow-hidden">
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
        <Icon className={cn('h-4 w-4', color)} />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold font-mono">{value}</span>
      </div>
      <p className="text-[10px] text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
);

export const AlertSummaryView: React.FC<{ summary: AlertSummary }> = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <SummaryCard
        label="Active Alerts"
        value={summary.activeAlerts}
        icon={AlertTriangle}
        color="text-amber-400"
        description="Requiring attention"
      />
      <SummaryCard
        label="Critical"
        value={summary.criticalAlerts}
        icon={AlertTriangle}
        color="text-rose-500"
        description="Immediate action"
      />
      <SummaryCard
        label="High Priority"
        value={summary.highAlerts}
        icon={AlertTriangle}
        color="text-orange-500"
        description="Urgent response"
      />
      <SummaryCard
        label="Acknowledged"
        value={summary.acknowledgedAlerts}
        icon={Clock}
        color="text-sky-400"
        description="In progress"
      />
      <SummaryCard
        label="Resolved"
        value={summary.resolvedAlerts}
        icon={CheckCircle2}
        color="text-emerald-500"
        description="Completed"
      />
    </div>
  );
};
