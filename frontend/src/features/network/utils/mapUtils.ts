import { NetworkNode } from '../types';

export interface Viewport {
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

export const mapCoordinatesToSvg = (
  nodes: NetworkNode[],
  viewport: Viewport
): ((lat: number, lng: number) => Point) => {
  if (nodes.length === 0) {
    return () => ({ x: 0, y: 0 });
  }

  // Find bounding box of all nodes
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  nodes.forEach((node) => {
    const { lat, lng } = node.coordinates;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  });

  const latRange = maxLat - minLat || 1;
  const lngRange = maxLng - minLng || 1;

  // Add padding (10%)
  const padding = 0.1;
  const xOffset = viewport.width * padding;
  const yOffset = viewport.height * padding;
  const drawWidth = viewport.width * (1 - 2 * padding);
  const drawHeight = viewport.height * (1 - 2 * padding);

  return (lat: number, lng: number): Point => {
    // Map lat/lng to 0-1 range within the bounding box
    const normalizedX = (lng - minLng) / lngRange;
    const normalizedY = (lat - minLat) / latRange;

    return {
      x: xOffset + normalizedX * drawWidth,
      // SVG y-axis is inverted (top is 0)
      y: viewport.height - (yOffset + normalizedY * drawHeight),
    };
  };
};
