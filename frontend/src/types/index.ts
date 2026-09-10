export interface Station {
  id: string;
  code: string;
  name: string;
  city: string;
  platforms: number;
}

export interface RailwaySection {
  id: string;
  sectionCode: string;
  startStationId: string;
  endStationId: string;
  distanceKm: number;
  status: 'CLEAR' | 'OCCUPIED' | 'MAINTENANCE' | 'BLOCKED';
  maxPermissibleSpeed: number;
}

export interface Alert {
  id: string;
  severity: 'OPERATIONAL' | 'WARNING' | 'CRITICAL' | 'INFORMATION';
  title: string;
  description: string;
  timestamp: string;
  sourceModule: string;
  acknowledged: boolean;
}

export interface NetworkNode {
  id: string;
  label: string;
  type: 'STATION' | 'JUNCTION' | 'SIGNAL' | 'DEPOT';
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  trainCount: number;
  weatherCondition: 'CLEAR' | 'FOG' | 'HEAVY_RAIN' | 'SNOW';
  durationMinutes: number;
}

export interface OptimizationRecommendation {
  id: string;
  title: string;
  impactScore: number;
  rationale: string;
  suggestedAction: string;
  targetTrainId?: string;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: 'OPERATOR' | 'DISPATCHER' | 'ADMIN' | 'ANALYST';
}

export interface SystemHealth {
  status: 'UP' | 'DOWN' | 'DEGRADED';
  application: string;
  timestamp?: string;
}
