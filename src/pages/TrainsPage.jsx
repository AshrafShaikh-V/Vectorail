import React from 'react';
import { Train, ArrowLeft, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function TrainsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Link to="/dashboard" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Dashboard
            </Link>
            <span>/</span>
            <span className="text-emerald-400">Active Trains</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Train className="h-6 w-6 text-emerald-400" />
            Active Train Operations
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time telemetry, speeds, timetable delays, and locomotive diagnostics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">5 Active Rakes</Badge>
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Filter className="h-3.5 w-3.5" />
            Filter Fleet
          </Button>
        </div>
      </div>

      <Card className="border-border/80 bg-card/60">
        <CardHeader>
          <CardTitle>Train Telemetry Grid (Phase 2 Placeholder)</CardTitle>
          <CardDescription>
            High-density tabular roster of all running rakes with live speed indicators and delay telemetry.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex flex-col items-center justify-center border-2 border-dashed border-border/70 rounded-lg m-4 bg-muted/20">
          <Train className="h-12 w-12 text-muted-foreground/40 mb-3" />
          <div className="text-sm font-medium text-foreground">Fleet Telemetry Table</div>
          <p className="text-xs text-muted-foreground max-w-md text-center mt-1">
            Connected to <code>trainService.getAllTrains()</code>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
