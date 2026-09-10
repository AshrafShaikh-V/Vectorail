import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Train } from '@/features/trains/types/train';
import { RailwayNetwork } from '@/features/network/types';
import { MOCK_NETWORK } from '@/features/network/mockData';
import { MOCK_TRAIN_ROUTES } from '@/features/trains/data/mockTrains';
import { trainService } from '@/features/trains/services/trainService';
import {
  TrainDetailsHeader,
  TrainOverviewCard,
  TrainOperationalInfo,
  TrainRouteProgress,
  TrainSchedule,
  TrainDelayCard,
  TrainPerformanceCard,
  TrainOccupancyCard,
  TrainInformationCard,
  TrainActivityTimeline,
  TrainDetailsActions
} from '@/features/trains/components';
import { EmptyState, ErrorState } from '@/components/ui/FeedbackStates';
import { TableSkeleton } from '@/components/ui/LoadingStates';
import { useToast } from '@/components/ui';

export const TrainDetailsPage: React.FC = () => {
  const { trainId } = useParams<{ trainId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [network] = useState<RailwayNetwork>(MOCK_NETWORK);
  const [train, setTrain] = useState<Train | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTrainData = async () => {
    if (!trainId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await trainService.getTrainById(trainId);
      if (!data) {
        setError('Train not found');
      } else {
        setTrain(data);
      }
    } catch (err) {
      setError('Failed to load train details');
      toast({
        type: 'error',
        title: 'Error',
        message: 'An unexpected error occurred while loading train data.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTrainData();
  }, [trainId]);

  const handleRefresh = async () => {
    toast({
      type: 'info',
      title: 'Syncing',
      message: 'Updating train telemetry...',
    });
    await loadTrainData();
  };

  const handleViewOnNetwork = () => {
    toast({
      type: 'info',
      title: 'Network View',
      message: 'Navigating to Network visualization to highlight train...',
    });
    navigate('/network');
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-24 w-full bg-secondary/20 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-32 w-full bg-secondary/20 rounded-lg animate-pulse" />
            <div className="h-64 w-full bg-secondary/20 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-6">
            <div className="h-48 w-full bg-secondary/20 rounded-lg animate-pulse" />
            <div className="h-48 w-full bg-secondary/20 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !train) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-6">
        <EmptyState
          title={error || 'Train Not Found'}
          description={error === 'Train not found'
            ? 'The requested train could not be found in the current operational dataset.'
            : 'An error occurred while retrieving the train details.'}
          actionLabel="Back to Train Monitoring"
          onAction={() => navigate('/trains')}
        />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-screen-2xl mx-auto space-y-8">
      <TrainDetailsHeader
        trainNumber={train.trainNumber}
        trainName={train.name}
        type={train.type}
        status={train.status}
        serviceStatus={train.serviceStatus}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Primary Operational View */}
        <div className="lg:col-span-2 space-y-8">
          <TrainOverviewCard train={train} />

          <TrainOperationalInfo
            train={train}
            network={network}
          />

          <TrainRouteProgress
            train={train}
            route={MOCK_TRAIN_ROUTES[train.routeId] || { id: '', name: '', lineId: '', stops: [], segments: [] }}
            network={network}
          />

          <TrainSchedule train={train} />

          <TrainActivityTimeline />
        </div>

        {/* Right Column: Technical & Support Info */}
        <div className="space-y-8">
          <TrainDetailsActions
            trainId={train.id}
            trainNumber={train.trainNumber}
            onRefresh={handleRefresh}
            onViewOnNetwork={handleViewOnNetwork}
          />

          <TrainDelayCard train={train} />

          <div className="grid grid-cols-1 gap-6">
            <TrainPerformanceCard train={train} />
            <TrainOccupancyCard train={train} />
          </div>

          <TrainInformationCard train={train} />
        </div>
      </div>
    </div>
  );
};
