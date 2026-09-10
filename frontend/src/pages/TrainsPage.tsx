import React, { useState, useEffect, useMemo } from 'react';
import {
  TrainMonitoringHeader,
  TrainSummaryPanel,
  TrainFilters,
  TrainMonitoringTable,
  TrainPreviewDrawer
} from '@/features/trains/components';
import {
  trainService,
  TrainSummary,
  TrainFilter
} from '@/features/trains';
import { Train } from '@/features/trains/types/train';
import { RailwayNetwork } from '@/features/network/types';
import { MOCK_NETWORK } from '@/features/network/mockData';
import { EmptyState } from '@/components/ui/FeedbackStates';
import { TableSkeleton } from '@/components/ui/LoadingStates';
import { useToast } from '@/components/ui';

export const TrainsPage: React.FC = () => {
  const { toast } = useToast();
  const [network] = useState<RailwayNetwork>(MOCK_NETWORK);
  const [trains, setTrains] = useState<Train[]>([]);
  const [summary, setSummary] = useState<TrainSummary | null>(null);
  const [filters, setFilters] = useState<TrainFilter>({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTrainId, setSelectedTrainId] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [trainsData, summaryData] = await Promise.all([
        trainService.getTrainsByFilter(filters),
        trainService.getTrainSummary(),
      ]);
      setTrains(trainsData);
      setSummary(summaryData);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      toast({
        type: 'error',
        title: 'Data Load Error',
        message: 'Failed to fetch train monitoring data from service layer.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  const handleRefresh = async () => {
    toast({
      type: 'info',
      title: 'Telemetry Sync',
      message: 'Refreshing active fleet telemetry...',
    });
    await loadData();
  };

  const filteredTrain = useMemo(() => {
    return trains.find(t => t.id === selectedTrainId);
  }, [trains, selectedTrainId]);

  const handleViewOnNetwork = (trainId: string) => {
    // In a real app, we'd use a navigation hook or a global state to select the train on the map
    toast({
      type: 'info',
      title: 'Network Navigation',
      message: 'Switching to Network View to highlight train...',
    });
    // For now, we just toast. Integration with NetworkPage selection would happen here.
  };

  return (
    <div className="space-y-6 p-6 max-w-screen-2xl mx-auto">
      <TrainMonitoringHeader
        trainCount={trains.length}
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
      />

      {summary && (
        <TrainSummaryPanel summary={summary} />
      )}

      <TrainFilters
        filters={filters}
        setFilters={setFilters}
        network={network}
      />

      {isLoading ? (
        <TableSkeleton rows={10} cols={10} />
      ) : trains.length > 0 ? (
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <TrainMonitoringTable
            trains={trains}
            network={network}
            selectedTrainId={selectedTrainId}
            onTrainSelect={(id) => setSelectedTrainId(id)}
          />
        </div>
      ) : (
        <EmptyState
          title="No trains found"
          description="No trains match your current search or filter criteria."
          actionLabel="Reset Filters"
          onAction={() => setFilters({})}
        />
      )}

      <TrainPreviewDrawer
        isOpen={!!selectedTrainId}
        onClose={() => setSelectedTrainId(null)}
        train={filteredTrain}
        network={network}
        onViewOnNetwork={handleViewOnNetwork}
      />
    </div>
  );
};
