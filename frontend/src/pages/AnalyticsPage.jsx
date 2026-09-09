import React from 'react';
import { BarChart3, ArrowLeft, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function AnalyticsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Link to="/dashboard" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Dashboard
            </Link>
            <span>/</span>
            <span className="text-emerald-400">Traffic Analytics</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-emerald-400" />
            Traffic Analytics & KPIs
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Punctuality metrics, corridor throughput, headway statistics, and bottleneck analysis
          </p>
        </div>
        <Badge variant="outline" className="gap-1.5">
          <TrendingUp className="h-3 w-3 text-emerald-400" />
          92.4% Punctuality
        </Badge>
      </div>

      <Card className="border-border/80 bg-card/60">
        <CardHeader>
          <CardTitle>Operations Telemetry Visualizations</CardTitle>
          <CardDescription>
            Configured with Recharts for responsive line, bar, and area throughput charts in future phases.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex flex-col items-center justify-center border-2 border-dashed border-border/70 rounded-lg m-4 bg-muted/20">
          <BarChart3 className="h-12 w-12 text-muted-foreground/40 mb-3" />
          <div className="text-sm font-medium text-foreground">Analytics Charts & Histograms</div>
          <p className="text-xs text-muted-foreground max-w-md text-center mt-1">
            Recharts library is installed and configured in the project dependency tree.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
