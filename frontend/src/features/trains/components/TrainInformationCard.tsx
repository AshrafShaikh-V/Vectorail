import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Train } from '@/features/trains/types/train';
import { FileText } from 'lucide-react';

interface TrainInformationCardProps {
  train: Train;
}

export const TrainInformationCard: React.FC<TrainInformationCardProps> = ({ train }) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <FileText className="h-3 w-3" />
          Train Specifications
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          <div className="flex justify-between items-center py-1 border-b border-border/40">
            <span className="text-xs text-muted-foreground">Train Number</span>
            <span className="text-xs font-mono font-bold">{train.trainNumber}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/40">
            <span className="text-xs text-muted-foreground">Operator</span>
            <span className="text-xs font-medium">{train.operator}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/40">
            <span className="text-xs text-muted-foreground">Train Type</span>
            <span className="text-xs font-medium">{train.type}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/40">
            <span className="text-xs text-muted-foreground">Line</span>
            <span className="text-xs font-medium">{train.lineId}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/40">
            <span className="text-xs text-muted-foreground">Direction</span>
            <span className="text-xs font-medium">{train.direction}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/40">
            <span className="text-xs text-muted-foreground">Origin</span>
            <span className="text-xs font-medium">{train.originStationId}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/40">
            <span className="text-xs text-muted-foreground">Destination</span>
            <span className="text-xs font-medium">{train.destinationStationId}</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-border/40">
            <span className="text-xs text-muted-foreground">Service Status</span>
            <span className="text-xs font-medium">{train.serviceStatus}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
