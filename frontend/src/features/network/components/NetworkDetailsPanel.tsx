import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { X } from 'lucide-react';
import { NetworkNode, TrackConnection, RailwayNetwork, Station, RailwaySection } from '@/features/network/types';
import { Button } from '@/components/ui';
import { StationDetails } from './StationDetails';
import { SectionDetails } from './SectionDetails';

interface NetworkDetailsPanelProps {
  data: any; // Use any here because data can be NetworkNode, TrackConnection, Station, or RailwaySection
  network: RailwayNetwork;
  onClose: () => void;
  onStationSelect: (id: string) => void;
  onSectionSelect: (id: string) => void;
}

export const NetworkDetailsPanel: React.FC<NetworkDetailsPanelProps> = ({
  data,
  network,
  onClose,
  onStationSelect,
  onSectionSelect
}) => {
  if (!data) return null;

  // Determine if it's a station or a section
  // Stations in our mock data have a 'code' property.
  // Sections have a 'lineId' or 'utilization' property.
  const isStation = 'code' in data || (data.type === 'STATION');
  const isSection = 'lineId' in data || 'utilization' in data;

  return (
    <div className="absolute top-4 right-4 z-30 w-96 animate-in slide-in-from-right duration-300">
      <Card className="bg-card/95 backdrop-blur-md border-border shadow-2xl max-h-[calc(100vh-2rem)] overflow-y-auto">
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0 sticky top-0 bg-card z-10">
          <CardTitle className="text-sm font-bold font-mono uppercase tracking-tight">
            {isStation ? 'Station Details' : isSection ? 'Section Details' : 'Network Element Details'}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full"
            onClick={onClose}
          >
            <X className="h-3 w-3" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          {isStation ? (
            <StationDetails
              station={data as Station}
              network={network}
              onSectionSelect={onSectionSelect}
            />
          ) : isSection ? (
            <SectionDetails
              section={data as RailwaySection}
              network={network}
              onStationSelect={onStationSelect}
            />
          ) : (
            <div className="p-4 text-xs text-muted-foreground text-center">
              Detailed information for this network element is not available.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
