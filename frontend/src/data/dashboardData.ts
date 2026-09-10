import { LucideIcon, TrainFront, Clock, AlertTriangle, Activity, Globe, Server, ShieldCheck } from 'lucide-react';

export interface KpiMetric {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
    isPositive: boolean; // Whether 'up' is actually good for this specific metric
  };
  status: 'operational' | 'warning' | 'critical' | 'information' | 'neutral';
  description: string;
}

export interface StatusItem {
  label: string;
  value: string | number;
  status: 'operational' | 'warning' | 'critical' | 'neutral';
}

export interface OperationalHealth {
  overallStatus: 'Operational' | 'Degraded' | 'Critical';
  components: {
    label: string;
    status: 'Healthy' | 'Degraded' | 'Critical' | 'Stable';
  }[];
}

export const DASHBOARD_MOCK_DATA = {
  primaryKpis: [
    {
      id: 'active-trains',
      label: 'Active Trains',
      value: '128',
      unit: '',
      icon: TrainFront,
      trend: { value: '4.8%', direction: 'up', label: 'vs yesterday', isPositive: true },
      status: 'operational',
      description: 'Operating across Sector 01 & 02',
    },
    {
      id: 'on-time-performance',
      label: 'On-Time Performance',
      value: '91.7%',
      unit: '',
      icon: Clock,
      trend: { value: '2.4%', direction: 'up', label: 'vs previous period', isPositive: true },
      status: 'operational',
      description: '117 of 128 on schedule',
    },
    {
      id: 'delayed-services',
      label: 'Delayed Services',
      value: '7',
      unit: '',
      icon: Activity,
      trend: { value: '1.7%', direction: 'down', label: 'since 08:00', isPositive: true },
      status: 'warning',
      description: '3 classified as critical',
    },
    {
      id: 'network-availability',
      label: 'Network Availability',
      value: '98.4%',
      unit: '',
      icon: Globe,
      trend: { value: '0.1%', direction: 'neutral', label: 'stable', isPositive: true },
      status: 'operational',
      description: 'All mainlines functional',
    },
  ],
  operationalHealth: {
    overallStatus: 'Operational',
    components: [
      { label: 'Network', status: 'Healthy' },
      { label: 'Train Services', status: 'Healthy' },
      { label: 'Infrastructure', status: 'Stable' },
      { label: 'Control Systems', status: 'Healthy' },
    ],
  },
  networkStatus: {
    availability: '98.4%',
    sections: {
      total: 42,
      normal: 39,
      degraded: 2,
      critical: 1,
    },
  },
  trainStatus: {
    total: 128,
    onSchedule: 96,
    runningLate: 25,
    criticalDelay: 7,
  },
  systemStatus: [
    { label: 'Control Center', status: 'Operational' },
    { label: 'Network Services', status: 'Operational' },
    { label: 'Data Services', status: 'Operational' },
    { label: 'Communication', status: 'Operational' },
  ],
};
