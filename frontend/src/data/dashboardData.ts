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

export interface DashboardTrain {
  id: string;
  name: string;
  route: string;
  status: 'On Schedule' | 'Running Late' | 'Delayed' | 'Critical Delay' | 'Stopped' | 'Completed';
  location: string;
  delay: number; // in minutes
  nextStation: string;
}

export interface NetworkActivity {
  section: string;
  status: 'Operational' | 'Minor Congestion' | 'Heavy Traffic' | 'Critical';
  utilization: number; // percentage
}

export interface DashboardAlert {
  id: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  title: string;
  source: string;
  timestamp: string;
}

export interface OperationalActivity {
  id: string;
  time: string;
  event: string;
  entity: string;
  type: 'train' | 'network' | 'maintenance' | 'system';
}

export interface PerformanceSnapshot {
  avgDelay: string;
  trainsCompleted: number;
  onTimeArrivals: string;
  networkUtilization: string;
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
  activeTrains: [
    { id: 'VTX-104', name: 'Rajdhani Express', route: 'Pune → Mumbai', status: 'On Schedule', location: 'Lonavala', delay: 0, nextStation: 'Khandala' },
    { id: 'VTX-218', name: 'Mumbai → Nashik', route: 'Mumbai → Nashik', status: 'Running Late', location: 'Thane', delay: 8, nextStation: 'Kasara' },
    { id: 'VTX-331', name: 'Pune → Solapur', route: 'Pune → Solapur', status: 'On Schedule', location: 'Daund', delay: 2, nextStation: 'Kurduwadi' },
    { id: 'VTX-402', name: 'Deccan Queen', route: 'Pune → Mumbai', status: 'Delayed', location: 'Lonavala', delay: 15, nextStation: 'Khandala' },
    { id: 'VTX-511', name: 'Intercity Exp', route: 'Nashik → Mumbai', status: 'Critical Delay', location: 'Igatpuri', delay: 45, nextStation: 'Kasara' },
  ],
  networkActivity: [
    { section: 'Section B-12', status: 'Heavy Traffic', utilization: 84 },
    { section: 'Section A-07', status: 'Operational', utilization: 62 },
    { section: 'Section C-04', status: 'Minor Congestion', utilization: 71 },
    { section: 'Section D-19', status: 'Operational', utilization: 48 },
  ],
  operationalAlerts: [
    { id: 'AL-001', severity: 'CRITICAL', title: 'Signal failure detected', source: 'Section B-12', timestamp: '4 min ago' },
    { id: 'AL-002', severity: 'HIGH', title: 'Train congestion increasing', source: 'Central Junction', timestamp: '12 min ago' },
    { id: 'AL-003', severity: 'MEDIUM', title: 'Maintenance window scheduled', source: 'Section C-04', timestamp: '28 min ago' },
    { id: 'AL-004', severity: 'LOW', title: 'Weather advisory: Heavy rain', source: 'Western Sector', timestamp: '45 min ago' },
  ],
  recentActivity: [
    { id: 'ACT-1', time: '16:18', event: 'Train VTX-218 entered Thane section', entity: 'VTX-218', type: 'train' },
    { id: 'ACT-2', time: '16:14', event: 'Section B-12 congestion level increased', entity: 'Section B-12', type: 'network' },
    { id: 'ACT-3', time: '16:09', event: 'Train VTX-104 departed Lonavala', entity: 'VTX-104', type: 'train' },
    { id: 'ACT-4', time: '16:03', event: 'Signal maintenance completed at Central Junction', entity: 'Central Junction', type: 'maintenance' },
    { id: 'ACT-5', time: '15:57', event: 'Train VTX-331 arrived at Daund', entity: 'VTX-331', type: 'train' },
  ],
  performanceSnapshot: {
    avgDelay: '6.8 min',
    trainsCompleted: 214,
    onTimeArrivals: '91.7%',
    networkUtilization: '74.2%',
  },
};
