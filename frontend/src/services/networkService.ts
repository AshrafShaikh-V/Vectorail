import {
  RailwayNetwork,
  RailwayLine,
  NetworkNode,
  RailwaySection,
  Station,
  TrackConnection,
  NetworkStatusSummary
} from '@/features/network/types';
import { MOCK_NETWORK, MOCK_STATIONS } from '@/features/network/mockData';

export const networkService = {
  async getNetwork(): Promise<RailwayNetwork> {
    return MOCK_NETWORK;
  },

  async getLines(): Promise<RailwayLine[]> {
    return MOCK_NETWORK.lines;
  },

  async getNodes(): Promise<NetworkNode[]> {
    return MOCK_NETWORK.nodes;
  },

  async getConnections(): Promise<TrackConnection[]> {
    return MOCK_NETWORK.connections;
  },

  async getSections(): Promise<RailwaySection[]> {
    return MOCK_NETWORK.sections;
  },

  async getStations(): Promise<Station[]> {
    return MOCK_STATIONS;
  },

  async getNetworkStatus(): Promise<NetworkStatusSummary> {
    const totalSections = MOCK_NETWORK.sections.length;
    const criticalSections = MOCK_NETWORK.sections.filter(s => s.status === 'BLOCKED').length;
    const maintenanceSections = MOCK_NETWORK.sections.filter(s => s.status === 'MAINTENANCE').length;
    const operationalSections = totalSections - criticalSections - maintenanceSections;

    return {
      overallStatus: criticalSections > 0 ? 'CRITICAL' : (maintenanceSections > 0 ? 'DEGRADED' : 'OPERATIONAL'),
      availability: `${((operationalSections / totalSections) * 100).toFixed(1)}%`,
      utilization: 64.2,
      activeSections: operationalSections,
      congestedSections: MOCK_NETWORK.sections.filter(s => s.utilization > 70).length,
      maintenanceSections: maintenanceSections,
      operationalStations: MOCK_STATIONS.filter(s => s.status === 'OPERATIONAL').length,
    };
  },

  async getConnectionsForNode(nodeId: string): Promise<TrackConnection[]> {
    return MOCK_NETWORK.connections.filter(c => c.fromNodeId === nodeId || c.toNodeId === nodeId);
  },

  async getLineTopology(lineId: string): Promise<RailwaySection[]> {
    return MOCK_NETWORK.sections.filter(s => s.lineId === lineId);
  },
};
