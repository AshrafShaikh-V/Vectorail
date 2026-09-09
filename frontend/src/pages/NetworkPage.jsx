import React from 'react';
import { Network, ArrowLeft, Radio } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function NetworkPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Link to="/dashboard" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Dashboard
            </Link>
            <span>/</span>
            <span className="text-emerald-400">Network Map</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Network className="h-6 w-6 text-emerald-400" />
            Railway Network Topology
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Interactive corridor schematic map, track sections, and station interlockings
          </p>
        </div>
        <Badge variant="operational" className="self-start sm:self-auto gap-1">
          <Radio className="h-3 w-3 animate-pulse" />
          5 Stations Monitored
        </Badge>
      </div>

      <Card className="border-border/80 bg-card/60">
        <CardHeader>
          <CardTitle>Network Map (Phase 2 Placeholder)</CardTitle>
          <CardDescription>
            The interactive railway schematic visualizer with SVG node/track topology will be rendered in Phase 2.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-72 flex flex-col items-center justify-center border-2 border-dashed border-border/70 rounded-lg m-4 bg-muted/20">
          <Network className="h-12 w-12 text-muted-foreground/40 mb-3" />
          <div className="text-sm font-medium text-foreground">Interactive Schematic Canvas</div>
          <p className="text-xs text-muted-foreground max-w-md text-center mt-1">
            Corridors: NDLS → GZB → ALJN → TDL → CNB
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
