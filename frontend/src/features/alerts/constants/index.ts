import { AlertSeverity, AlertStatus, AlertCategory, AlertImpact } from '../types';

export const SEVERITY_CONFIG: Record<AlertSeverity, { label: string; variant: string; priority: number; color: string }> = {
  CRITICAL: { label: 'Critical', variant: 'critical', priority: 1, color: 'text-rose-500' },
  HIGH: { label: 'High', variant: 'high', priority: 2, color: 'text-orange-500' },
  MEDIUM: { label: 'Medium', variant: 'medium', priority: 3, color: 'text-amber-500' },
  LOW: { label: 'Low', variant: 'low', priority: 4, color: 'text-emerald-500' },
  INFO: { label: 'Info', variant: 'info', priority: 5, color: 'text-sky-500' },
};

export const STATUS_CONFIG: Record<AlertStatus, { label: string; variant: string }> = {
  ACTIVE: { label: 'Active', variant: 'active' },
  ACKNOWLEDGED: { label: 'Acknowledged', variant: 'acknowledged' },
  RESOLVED: { label: 'Resolved', variant: 'resolved' },
  DISMISSED: { label: 'Dismissed', variant: 'dismissed' },
};

export const IMPACT_CONFIG: Record<AlertImpact, { label: string }> = {
  NONE: { label: 'None' },
  LOW: { label: 'Low' },
  MODERATE: { label: 'Moderate' },
  HIGH: { label: 'High' },
  SEVERE: { label: 'Severe' },
};

export const CATEGORY_CONFIG: Record<AlertCategory, { label: string }> = {
  'Train Delay': { label: 'Train Delay' },
  'Track Issue': { label: 'Track Issue' },
  'Signal Failure': { label: 'Signal Failure' },
  'Station Congestion': { label: 'Station Congestion' },
  'Speed Restriction': { label: 'Speed Restriction' },
  'Equipment Failure': { label: 'Equipment Failure' },
  'Power Issue': { label: 'Power Issue' },
  'Communication Failure': { label: 'Communication Failure' },
  'Platform Issue': { label: 'Platform Issue' },
  'Network Degradation': { label: 'Network Degradation' },
  'Safety': { label: 'Safety' },
  'Weather': { label: 'Weather' },
  'System': { label: 'System' },
};
