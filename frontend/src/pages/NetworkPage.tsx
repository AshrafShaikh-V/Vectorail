import React, { useState, useMemo } from 'react';
import {
  NetworkView,
  NetworkControls,
  NetworkDetailsPanel,
  NetworkLegend,
  NetworkSummary,
  NetworkZoomControls
} from '@/features/network/components';
import {
  MOCK_NETWORK,
  RailwayNetwork,
  NetworkFilter,
  NetworkNode,
  TrackConnection
} from '@/features/network';

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

  // Find the actual object based on selectedElement ID
  const selectedData = useMemo(() => {
    if (!selectedElement) return null;

    if (selectedElement.type === 'node') {
      return network.nodes.find(n => n.id === selectedElement.id);
    } else {
      return network.connections.find(c => c.id === selectedElement.id);
    }
  }, [selectedElement, network]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0a0f0d]">
      {/* Top Stats Bar */}
      <div className="absolute top-4 left-4 z-20 w-full max-w-screen-xl px-4 pointer-events-none">
        <NetworkSummary network={network} />
      </div>

      {/* Filter Controls */}
      <div className="absolute top-4 right-4 z-20 pointer-events-auto">
        <NetworkControls
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      {/* Main Interactive View */}
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

      {/* Zoom Controls */}
      <NetworkZoomControls
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleResetView}
      />

      {/* Legend */}
      <div className="absolute bottom-6 left-6 z-20">
        <NetworkLegend />
      </div>

      {/* Details Panel */}
      <NetworkDetailsPanel
        data={selectedData}
        onClose={() => setSelectedElement(null)}
      />
    </div>
  );
};
