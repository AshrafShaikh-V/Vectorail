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
    { id: 'node-04', label: 'East Signal', type: 'SIGNAL', coordinates: { lat: 18.5300, lng: 73.9000 }, status: 'BUSY' },
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
    { id: 'sec-01', name: 'Central Terminal → North Junction', lineId: 'line-blue', startNodeId: 'node-01', endNodeId: 'node-02', status: 'OPERATIONAL', utilization: 45, speedLimit: 160, tracks: 2, electrified: true },
    { id: 'sec-02', name: 'North Junction → East Signal', lineId: 'line-blue', startNodeId: 'node-02', endNodeId: 'node-04', status: 'BUSY', utilization: 88, speedLimit: 120, tracks: 2, electrified: true },
    { id: 'sec-03', name: 'East Signal → South Gateway', lineId: 'line-blue', startNodeId: 'node-04', endNodeId: 'node-05', status: 'OPERATIONAL', utilization: 55, speedLimit: 160, tracks: 2, electrified: true },
    { id: 'sec-04', name: 'Central Terminal → Valley Crossing', lineId: 'line-green', startNodeId: 'node-01', endNodeId: 'node-06', status: 'OPERATIONAL', utilization: 62, speedLimit: 140, tracks: 2, electrified: true },
    { id: 'sec-05', name: 'Valley Crossing → West Yard', lineId: 'line-green', startNodeId: 'node-06', endNodeId: 'node-03', status: 'OPERATIONAL', utilization: 30, speedLimit: 80, tracks: 1, electrified: false },
    { id: 'sec-06', name: 'West Yard → South Gateway', lineId: 'line-green', startNodeId: 'node-03', endNodeId: 'node-05', status: 'MAINTENANCE', utilization: 0, speedLimit: 80, tracks: 2, electrified: true },
  ],
};

export const MOCK_STATIONS: Station[] = [
  { id: 'st-01', type: 'STATION', code: 'CNTR', label: 'Central Terminal', city: 'Metro City', platforms: 12, tracks: 24, activityLevel: 'HIGH', coordinates: { lat: 18.5204, lng: 73.8567 }, status: 'OPERATIONAL' },
  { id: 'st-02', type: 'STATION', code: 'NRTH', label: 'North Junction Station', city: 'North Hills', platforms: 4, tracks: 8, activityLevel: 'MODERATE', coordinates: { lat: 18.5500, lng: 73.8800 }, status: 'OPERATIONAL' },
  { id: 'st-03', type: 'STATION', code: 'WST-Y', label: 'West Yard Terminal', city: 'West Port', platforms: 8, tracks: 16, activityLevel: 'LOW', coordinates: { lat: 18.5000, lng: 73.8000 }, status: 'OPERATIONAL' },
  { id: 'st-04', type: 'STATION', code: 'E-SGN', label: 'East Signal Post', city: 'East Gate', platforms: 2, tracks: 4, activityLevel: 'CRITICAL', coordinates: { lat: 18.5300, lng: 73.9000 }, status: 'CONGESTED' },
  { id: 'st-05', type: 'STATION', code: 'S-GTW', label: 'South Gateway', city: 'South City', platforms: 6, tracks: 12, activityLevel: 'MODERATE', coordinates: { lat: 18.4800, lng: 73.8600 }, status: 'OPERATIONAL' },
  { id: 'st-06', type: 'STATION', code: 'VLY-C', label: 'Valley Crossing', city: 'Valley View', platforms: 3, tracks: 6, activityLevel: 'LOW', coordinates: { lat: 18.5100, lng: 73.8200 }, status: 'OPERATIONAL' },
];
