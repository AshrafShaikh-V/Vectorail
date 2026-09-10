import React, { useMemo, useRef, useState } from 'react';
import { RailwayNetwork, NetworkFilter, NetworkNode, TrackConnection } from '@/features/network/types';
import { mapCoordinatesToSvg, Viewport, Point } from '@/features/network/utils/mapUtils';

interface NetworkViewProps {
  network: RailwayNetwork;
  filters: NetworkFilter;
  selectedElement: { type: 'node' | 'connection'; id: string } | null;
  onElementSelect: (type: 'node' | 'connection', id: string) => void;
  zoom: number;
  pan: { x: number; y: number };
  setPan: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

export const NetworkView: React.FC<NetworkViewProps> = ({
  network,
  filters,
  selectedElement,
  onElementSelect,
  zoom,
  pan,
  setPan,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const viewport: Viewport = {
    width: 1200,
    height: 800,
  };

  const project = useMemo(() => mapCoordinatesToSvg(network.nodes, viewport), [network.nodes]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX - pan.x;
    const startY = e.clientY - pan.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setPan({
        x: moveEvent.clientX - startX,
        y: moveEvent.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'LOW': return '#10b981'; // emerald-500
      case 'MODERATE': return '#f59e0b'; // amber-500
      case 'HEAVY': return '#f97316'; // orange-500
      case 'CRITICAL': return '#ef4444'; // rose-500
      default: return '#334155';
    }
  };

  const getNodeColor = (status: string) => {
    switch (status) {
      case 'OPERATIONAL': return '#10b981';
      case 'DEGRADED': return '#f59e0b';
      case 'CRITICAL': return '#ef4444';
      case 'MAINTENANCE': return '#64748b';
      default: return '#94a3b8';
    }
  };

  const isNodeFiltered = (node: NetworkNode) => {
    if (filters.search && !node.label.toLowerCase().includes(filters.search.toLowerCase())) return true;
    if (filters.status && node.status !== filters.status) return true;
    return false;
  };

  const isConnectionFiltered = (conn: TrackConnection) => {
    if (filters.congestionLevel && conn.congestionLevel !== filters.congestionLevel) return true;
    return false;
  };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      onMouseDown={handleMouseDown}
      className="bg-[#0a0f0d] outline-none"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
        {/* Connections Layer */}
        {network.connections.map((conn) => {
          const fromNode = network.nodes.find(n => n.id === conn.fromNodeId);
          const toNode = network.nodes.find(n => n.id === conn.toNodeId);
          if (!fromNode || !toNode) return null;

          const p1 = project(fromNode.coordinates.lat, fromNode.coordinates.lng);
          const p2 = project(toNode.coordinates.lat, toNode.coordinates.lng);
          const isSelected = selectedElement?.type === 'connection' && selectedElement.id === conn.id;
          const isFiltered = isConnectionFiltered(conn);

          return (
            <line
              key={conn.id}
              x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
              stroke={getCongestionColor(conn.congestionLevel)}
              strokeWidth={isSelected ? 4 : 2}
              strokeLinecap="round"
              className="cursor-pointer transition-all duration-200"
              style={{
                opacity: isFiltered ? 0.2 : 1,
                filter: isSelected ? 'url(#glow)' : 'none'
              }}
              onClick={(e) => {
                e.stopPropagation();
                onElementSelect('connection', conn.id);
              }}
            />
          );
        })}

        {/* Nodes Layer */}
        {network.nodes.map((node) => {
          const p = project(node.coordinates.lat, node.coordinates.lng);
          const isSelected = selectedElement?.id === node.id;
          const isFiltered = isNodeFiltered(node);
          const color = getNodeColor(node.status);

          return (
            <g
              key={node.id}
              className="cursor-pointer transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onElementSelect('node', node.id);
              }}
            >
              {/* Interaction Area */}
              <circle
                cx={p.x} cy={p.y} r={8}
                fill="transparent"
                className="hover:fill-white/10"
              />

              {/* Node Marker */}
              {node.type === 'STATION' ? (
                <circle
                  cx={p.x} cy={p.y} r={isSelected ? 5 : 4}
                  fill={color}
                  stroke={isSelected ? '#fff' : 'none'}
                  strokeWidth={2}
                  style={{ opacity: isFiltered ? 0.3 : 1, filter: isSelected ? 'url(#glow)' : 'none' }}
                />
              ) : (
                <rect
                  x={p.x - 3} y={p.y - 3} width={6} height={6}
                  fill={color}
                  stroke={isSelected ? '#fff' : 'none'}
                  strokeWidth={2}
                  style={{ opacity: isFiltered ? 0.3 : 1, filter: isSelected ? 'url(#glow)' : 'none' }}
                />
              )}

              {/* Label */}
              <text
                x={p.x + 8} y={p.y + 4}
                className={`text-[10px] font-mono fill-muted-foreground pointer-events-none select-none ${isSelected ? 'fill-foreground font-bold' : ''}`}
                style={{ opacity: isFiltered ? 0.3 : 1 }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};
