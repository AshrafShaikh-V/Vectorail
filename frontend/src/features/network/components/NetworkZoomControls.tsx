import React from 'react';
import { Button } from '@/components/ui';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';

interface NetworkZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export const NetworkZoomControls: React.FC<NetworkZoomControlsProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
}) => {
  return (
    <div className="absolute bottom-6 right-6 flex flex-col gap-2">
      <Button
        variant="secondary"
        size="icon"
        onClick={onZoomIn}
        className="h-10 w-10 rounded-full shadow-lg bg-card/90 backdrop-blur-sm border-border"
        title="Zoom In"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={onZoomOut}
        className="h-10 w-10 rounded-full shadow-lg bg-card/90 backdrop-blur-sm border-border"
        title="Zoom Out"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onClick={onReset}
        className="h-10 w-10 rounded-full shadow-lg bg-card/90 backdrop-blur-sm border-border"
        title="Reset View"
      >
        <Maximize className="h-4 w-4" />
      </Button>

      <div className="mt-2 px-2 py-1 rounded bg-card/90 backdrop-blur-sm border border-border text-[10px] font-mono text-muted-foreground text-center">
        {(zoom * 100).toFixed(0)}%
      </div>
    </div>
  );
};
