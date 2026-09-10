import React from 'react';
import { Button } from '@/components/ui';
import { ExternalLink, RefreshCw, Copy } from 'lucide-react';

interface TrainDetailsActionsProps {
  trainId: string;
  trainNumber: string;
  onRefresh: () => void;
  onViewOnNetwork: () => void;
}

export const TrainDetailsActions: React.FC<TrainDetailsActionsProps> = ({
  trainId,
  trainNumber,
  onRefresh,
  onViewOnNetwork,
}) => {
  const copyTrainId = () => {
    navigator.clipboard.writeText(trainNumber);
    // In a real app, would trigger a toast
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="outline" size="sm" onClick={onRefresh} className="gap-2 h-9 px-3">
        <RefreshCw className="h-3.5 w-3.5" />
        Refresh Data
      </Button>
      <Button variant="outline" size="sm" onClick={onViewOnNetwork} className="gap-2 h-9 px-3">
        <ExternalLink className="h-3.5 w-3.5" />
        View on Network
      </Button>
      <Button variant="ghost" size="sm" onClick={copyTrainId} className="gap-2 h-9 px-3">
        <Copy className="h-3.5 w-3.5" />
        Copy ID
      </Button>
    </div>
  );
};
