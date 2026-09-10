import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { Radio } from 'lucide-react';

export const NetworkOverviewPlaceholder: React.FC = () => {
  return (
    <Card className="h-full min-h-[400px] border-border bg-card/50">
      <CardContent className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-emerald-500/10 rounded-full" />
          <Radio className="h-12 w-12 text-emerald-500/40 relative z-10" />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-foreground">Interactive Network Map</h4>
          <p className="text-xs text-muted-foreground max-w-xs">
            Real-time topological view of all railway sections, signals, and track occupancy.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          {['Sector 01', 'Sector 02', 'Metro Link', 'Freight North'].map(s => (
            <span key={s} className="text-[10px] font-mono px-2 py-1 rounded border border-border bg-secondary/20 text-muted-foreground">
              {s}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
