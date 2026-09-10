export type AlertSeverity = 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type AlertStatus = 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED' | 'DISMISSED';
export type AlertCategory =
  | 'Train Delay'
  | 'Track Issue'
  | 'Signal Failure'
  | 'Station Congestion'
  | 'Speed Restriction'
  | 'Equipment Failure'
  | 'Power Issue'
  | 'Communication Failure'
  | 'Platform Issue'
  | 'Network Degradation'
  | 'Safety'
  | 'Weather'
  | 'System';
export type AlertSource = 'SYSTEM' | 'TRAIN' | 'STATION' | 'SECTION' | 'SIGNAL' | 'OPERATOR' | 'NETWORK';
export type AlertImpact = 'NONE' | 'LOW' | 'MODERATE' | 'HIGH' | 'SEVERE';

export interface Alert {
  id: string;
  alertCode: string;
  title: string;
  description: string;
  category: AlertCategory;
  severity: AlertSeverity;
  status: AlertStatus;
  source: AlertSource;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  acknowledgedAt?: string;
  resolvedAt?: string;
  trainId?: string;
  stationId?: string;
  sectionId?: string;
  lineId?: string;
  location: string;
  impact: AlertImpact;
  priority: number; // Lower is higher priority
  isRead: boolean;
}

export interface AlertSummary {
  totalAlerts: number;
  activeAlerts: number;
  criticalAlerts: number;
  highAlerts: number;
  mediumAlerts: number;
  acknowledgedAlerts: number;
  resolvedAlerts: number;
  unreadAlerts: number;
}

export interface AlertFilter {
  severity?: AlertSeverity[];
  category?: AlertCategory[];
  status?: AlertStatus[];
  source?: AlertSource[];
  impact?: AlertImpact[];
  trainId?: string;
  stationId?: string;
  sectionId?: string;
  lineId?: string;
  isRead?: boolean;
  search?: string;
}

export type AlertSortOption = 'newest' | 'oldest' | 'highestSeverity' | 'lowestSeverity' | 'highestImpact' | 'unresolvedFirst';
