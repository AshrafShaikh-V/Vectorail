import { RailwayNetwork, RailwayLine, NetworkNode, Station, TrackConnection, RailwaySection } from './types';

export const MOCK_NETWORK: RailwayNetwork = {
  id: 'net-01',
  name: 'Western Sector Mainline',
  description: 'Primary corridor connecting coastal terminals to the central hub.',
  region: 'West',
  status: 'OPERATIONAL',
  lines: [
    {
      id: 'line-blue',
      name: 'Blue Line (Express)',
      color: '#3b82f6',
      sections: ['sec-01', 'sec-02', 'sec-03'],
      stations: ['st-01', 'st-02', 'st-04', 'st-05'],
    },
    {
      id: 'line-green',
      name: 'Green Line (Commuter)',
      color: '#10b981',
      sections: ['sec-04', 'sec-05', 'sec-06'],
      stations: ['st-01', 'st-03', 'st-04', 'st-06'],
    },
  ],
  nodes: [
    { id: 'node-01', label: 'Central Terminal', type: 'STATION', coordinates: { lat: 18.5204, lng: 73.8567 }, status: 'OPERATIONAL' },
    { id: 'node-02', label: 'North Junction', type: 'JUNCTION', coordinates: { lat: 18.5500, lng: 73.8800 }, status: 'OPERATIONAL' },
    { id: 'node-03', label: 'West Yard', type: 'DEPOT', coordinates: { lat: 18.5000, lng: 73.8000 }, status: 'OPERATIONAL' },
    { id: 'node-04', label: 'East Signal', type: 'SIGNAL', coordinates: { lat: 18.5300, lng: 73.9000 }, status: 'DEGRADED' },
    { id: 'node-05', label: 'South Gateway', type: 'STATION', coordinates: { lat: 18.4800, lng: 73.8600 }, status: 'OPERATIONAL' },
    { id: 'node-06', label: 'Valley Crossing', type: 'JUNCTION', coordinates: { lat: 18.5100, lng: 73.8200 }, status: 'OPERATIONAL' },
  ],
  connections: [
    { id: 'conn-01', fromNodeId: 'node-01', toNodeId: 'node-02', lengthKm: 12.5, maxSpeed: 160, currentUtilization: 45, congestionLevel: 'LOW' },
    { id: 'conn-02', fromNodeId: 'node-02', toNodeId: 'node-04', lengthKm: 8.2, maxSpeed: 120, currentUtilization: 88, congestionLevel: 'HEAVY' },
    { id: 'conn-03', fromNodeId: 'node-01', toNodeId: 'node-06', lengthKm: 15.1, maxSpeed: 140, currentUtilization: 62, congestionLevel: 'MODERATE' },
    { id: 'conn-04', fromNodeId: 'node-06', toNodeId: 'node-03', lengthKm: 5.4, maxSpeed: 80, currentUtilization: 30, congestionLevel: 'LOW' },
    { id: 'conn-05', fromNodeId: 'node-01', toNodeId: 'node-05', lengthKm: 10.8, maxSpeed: 160, currentUtilization: 71, congestionLevel: 'MODERATE' },
  ],
  sections: [
    { id: 'sec-01', lineId: 'line-blue', startNodeId: 'node-01', endNodeId: 'node-02', status: 'CLEAR', utilization: 45 },
    { id: 'sec-02', lineId: 'line-blue', startNodeId: 'node-02', endNodeId: 'node-04', status: 'OCCUPIED', utilization: 88 },
    { id: 'sec-03', lineId: 'line-blue', startNodeId: 'node-04', endNodeId: 'node-05', status: 'CLEAR', utilization: 55 },
    { id: 'sec-04', lineId: 'line-green', startNodeId: 'node-01', endNodeId: 'node-06', status: 'CLEAR', utilization: 62 },
    { id: 'sec-05', lineId: 'line-green', startNodeId: 'node-06', endNodeId: 'node-03', status: 'CLEAR', utilization: 30 },
    { id: 'sec-06', lineId: 'line-green', startNodeId: 'node-03', endNodeId: 'node-05', status: 'MAINTENANCE', utilization: 0 },
  ],
};

export const MOCK_STATIONS: Station[] = [
  { id: 'st-01', code: 'CNTR', name: 'Central Terminal', city: 'Metro City', platforms: 12, coordinates: { lat: 18.5204, lng: 73.8567 }, status: 'OPERATIONAL' },
  { id: 'st-02', code: 'NRTH', name: 'North Junction Station', city: 'North Hills', platforms: 4, coordinates: { lat: 18.5500, lng: 73.8800 }, status: 'OPERATIONAL' },
  { id: 'st-03', code: 'WST-Y', name: 'West Yard Terminal', city: 'West Port', platforms: 8, coordinates: { lat: 18.5000, lng: 73.8000 }, status: 'OPERATIONAL' },
  { id: 'st-04', code: 'E-SGN', name: 'East Signal Post', city: 'East Gate', platforms: 2, coordinates: { lat: 18.5300, lng: 73.9000 }, status: 'DEGRADED' },
  { id: 'st-05', code: 'S-GTW', name: 'South Gateway', city: 'South City', platforms: 6, coordinates: { lat: 18.4800, lng: 73.8600 }, status: 'OPERATIONAL' },
  { id: 'st-06', code: 'VLY-C', name: 'Valley Crossing', city: 'Valley View', platforms: 3, coordinates: { lat: 18.5100, lng: 73.8200 }, status: 'OPERATIONAL' },
];
