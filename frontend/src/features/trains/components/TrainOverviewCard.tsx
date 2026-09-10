import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Train } from '@/features/trains/types/train';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Info, MapPin, Clock } from 'lucide-react';

interface TrainOverviewCardProps {
  train: Train;
}

export const TrainOverviewCard: React.FC<TrainOverviewCardProps> = ({ train }) => {
  return (
    <Card className="bg-secondary/20 border-border shadow-sm">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Info className="h-3 w-3" />
          Quick Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Operator</p>
          <p className="text-sm font-medium">{train.operator}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Direction</p>
          <p className="text-sm font-medium">{train.direction}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Current Status</p>
          <StatusBadge state={train.status as any} />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Service</p>
          <StatusBadge state={train.serviceStatus as any} />
        </div>
      </CardContent>
    </Card>
  );
};
