import React from 'react';
import { Button } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TrainDetailsHeaderProps {
  trainNumber: string;
  trainName: string;
  type: string;
  status: string;
  serviceStatus: string;
}

export const TrainDetailsHeader: React.FC<TrainDetailsHeaderProps> = ({
  trainNumber,
  trainName,
  type,
  status,
  serviceStatus,
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 mb-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/trains')}
        className="gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Train Monitoring
      </Button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold text-foreground font-mono tracking-tighter">
            {trainNumber}
          </h1>
          <div className="flex items-center gap-3">
            <h2 className="text-xl text-muted-foreground font-medium">{trainName}</h2>
            <span className="px-2 py-0.5 rounded bg-secondary text-[10px] font-mono text-muted-foreground uppercase">
              {type}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Service Status</p>
            <p className="text-sm font-bold uppercase">{serviceStatus}</p>
          </div>
          <div className="text-right hidden sm:block border-l border-border pl-3">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Operational State</p>
            <p className="text-sm font-bold uppercase">{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
