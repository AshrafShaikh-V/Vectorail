import React from 'react';
import { AlertTriangle, ArrowLeft, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function AlertsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Link to="/dashboard" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Dashboard
            </Link>
            <span>/</span>
            <span className="text-emerald-400">Alerts</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-rose-400" />
            Operations Alarms & Alerts
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Signal anomalies, track circuit dropouts, safe headway warnings, and dispatch notices
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="critical">1 Critical</Badge>
          <Badge variant="warning">1 Warning</Badge>
          <Badge variant="operational">1 Resolved</Badge>
        </div>
      </div>

      <Card className="border-border/80 bg-card/60">
        <CardHeader>
          <CardTitle>Alarm Console & Dispatch Acknowledgment Feed</CardTitle>
          <CardDescription>
            Real-time feed linked to <code>alertService.getAlerts()</code> with priority filtering.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex flex-col items-center justify-center border-2 border-dashed border-border/70 rounded-lg m-4 bg-muted/20">
          <AlertTriangle className="h-12 w-12 text-rose-400/40 mb-3" />
          <div className="text-sm font-medium text-foreground">Alert Management Console</div>
          <p className="text-xs text-muted-foreground max-w-md text-center mt-1">
            Operational alert feed and operator acknowledgment flow will be implemented in future phases.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
