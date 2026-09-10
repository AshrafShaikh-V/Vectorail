import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { AlertTriangle } from 'lucide-react';

export const AlertsOverview: React.FC = () => {
  return (
    <Card className="h-full min-h-[400px] border-border bg-card/50">
      <CardContent className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-rose-500/10 rounded-full" />
          <AlertTriangle className="h-12 w-12 text-rose-500/40 relative z-10" />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-foreground">Priority Alerts Console</h4>
          <p className="text-xs text-muted-foreground max-w-xs">
            Real-time incident reporting, severity tracking, and dispatch acknowledgement.
          </p>
        </div>
        <div className="flex flex-col gap-2 w-full max-w-xs pt-4">
          <div className="flex justify-between text-[10px] font-mono p-2 rounded border border-rose-500/20 bg-rose-500/5 text-rose-400">
            <span>CRITICAL</span>
            <span>03 ACTIVE</span>
          </div>
          <div className="flex justify-between text-[10px] font-mono p-2 rounded border border-amber-500/20 bg-amber-500/5 text-amber-400">
            <span>WARNING</span>
            <span>12 ACTIVE</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
