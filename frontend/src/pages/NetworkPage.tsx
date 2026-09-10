import React, { useState, useMemo } from 'react';
import {
  NetworkView,
  NetworkControls,
  NetworkDetailsPanel,
  NetworkLegend,
  NetworkSummary,
  NetworkZoomControls,
  StationsView,
  SectionsView
} from '@/features/network/components';
import {
  MOCK_NETWORK,
  RailwayNetwork,
  NetworkFilter,
  NetworkNode,
  TrackConnection
} from '@/features/network';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

type SelectedElement = {
  type: 'node' | 'connection';
  id: string;
};

export const NetworkPage: React.FC = () => {
  const [network] = useState<RailwayNetwork>(MOCK_NETWORK);
  const [selectedElement, setSelectedElement] = useState<SelectedElement | null>(null);
  const [filters, setFilters] = useState<NetworkFilter>({});
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const handleElementSelect = (type: 'node' | 'connection', id: string) => {
    setSelectedElement({ type, id });
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const selectedData = useMemo(() => {
    if (!selectedElement) return null;

    if (selectedElement.type === 'node') {
      return network.nodes.find(n => n.id === selectedElement.id);
    } else {
      // Match connection id to section id if they are the same, or find the section that matches the connection
      return network.sections.find(s => s.id === selectedElement.id) ||
             network.connections.find(c => c.id === selectedElement.id);
    }
  }, [selectedElement, network]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0a0f0d] flex flex-col">
      {/* Top Stats Bar - Always Visible */}
      <div className="z-20 w-full max-w-screen-xl px-6 py-4 pointer-events-none">
        <NetworkSummary network={network} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        <Tabs defaultValue="overview" className="w-full h-full flex flex-col">
          <div className="px-6 flex items-center justify-between z-20 relative">
            <TabsList className="bg-secondary/30 border border-border">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="stations">Stations</TabsTrigger>
              <TabsTrigger value="sections">Sections</TabsTrigger>
            </TabsList>

            {/* Only show NetworkControls in Overview tab or move them to a shared location */}
            <div className="pointer-events-auto">
              <NetworkControls
                filters={filters}
                setFilters={setFilters}
              />
            </div>
          </div>

          <TabsContent value="overview" className="flex-1 relative m-0 overflow-hidden">
            <div className="w-full h-full cursor-grab active:cursor-grabbing">
              <NetworkView
                network={network}
                filters={filters}
                selectedElement={selectedElement}
                onElementSelect={handleElementSelect}
                zoom={zoom}
                pan={pan}
                setPan={setPan}
              />
            </div>

            <NetworkZoomControls
              zoom={zoom}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onReset={handleResetView}
            />

            <div className="absolute bottom-6 left-6 z-20">
              <NetworkLegend />
            </div>
          </TabsContent>

          <TabsContent value="stations" className="flex-1 overflow-auto p-6">
            <StationsView
              network={network}
              selectedElement={selectedElement}
              onElementSelect={handleElementSelect}
            />
          </TabsContent>

          <TabsContent value="sections" className="flex-1 overflow-auto p-6">
            <SectionsView
              network={network}
              selectedElement={selectedElement}
              onElementSelect={handleElementSelect}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Details Panel - Always Overlay */}
      <NetworkDetailsPanel
        data={selectedData}
        network={network}
        onClose={() => setSelectedElement(null)}
        onStationSelect={(id) => handleElementSelect('node', id)}
        onSectionSelect={(id) => handleElementSelect('connection', id)}
      />

    </div>
  );
};
