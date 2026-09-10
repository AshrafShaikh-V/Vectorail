export type NodeStatus = 'OPERATIONAL' | 'DEGRADED' | 'CRITICAL' | 'MAINTENANCE';
export type SectionStatus = 'CLEAR' | 'OCCUPIED' | 'BLOCKED' | 'MAINTENANCE';
export type CongestionLevel = 'LOW' | 'MODERATE' | 'HEAVY' | 'CRITICAL';

export interface NetworkNode {
  id: string;
  label: string;
  type: 'STATION' | 'JUNCTION' | 'SIGNAL' | 'DEPOT';
  coordinates: { lat: number; lng: number };
  status: NodeStatus;
}

export interface Station extends NetworkNode {
  code: string;
  platforms: number;
  city: string;
}

export interface TrackConnection {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  lengthKm: number;
  maxSpeed: number;
  currentUtilization: number; // 0-100
  congestionLevel: CongestionLevel;
}

export interface RailwaySection {
  id: string;
  name: string;
  lineId: string;
  startNodeId: string;
  endNodeId: string;
  status: SectionStatus;
  utilization: number;
}

export interface RailwayLine {
  id: string;
  name: string;
  color: string; // For map visualization
  sections: string[]; // Array of RailwaySection IDs
  stations: string[]; // Array of Station IDs
}

export interface RailwayNetwork {
  id: string;
  name: string;
  description: string;
  region: string;
  status: NodeStatus;
  lines: RailwayLine[];
  nodes: NetworkNode[];
  connections: TrackConnection[];
  sections: RailwaySection[];
}

export interface NetworkStatusSummary {
  overallStatus: NodeStatus;
  availability: string;
  utilization: number;
  activeSections: number;
  congestedSections: number;
  maintenanceSections: number;
  operationalStations: number;
}

export interface NetworkFilter {
  networkId?: string;
  lineId?: string;
  status?: NodeStatus | SectionStatus;
  stationStatus?: NodeStatus;
  sectionStatus?: SectionStatus;
  congestionLevel?: CongestionLevel;
  search?: string;
}
