import { LucideIcon, LayoutDashboard, Network, TrainFront, AlertTriangle, BarChart3, Sparkles, PlayCircle, Settings } from 'lucide-react';

export interface RouteMeta {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  path: string;
  breadcrumb: string;
}

export const APP_ROUTES: Record<string, RouteMeta> = {
  '/dashboard': {
    path: '/dashboard',
    title: 'Control Center',
    subtitle: 'Operations Overview',
    icon: LayoutDashboard,
    breadcrumb: 'Control Center',
  },
  '/network': {
    path: '/network',
    title: 'Railway Network',
    subtitle: 'Topology & Infrastructure',
    icon: Network,
    breadcrumb: 'Network',
  },
  '/trains': {
    path: '/trains',
    title: 'Train Monitoring',
    subtitle: 'Active Fleet Telemetry',
    icon: TrainFront,
    breadcrumb: 'Trains',
  },
  '/alerts': {
    path: '/alerts',
    title: 'Alerts & Incidents',
    subtitle: 'Incident Dispatch Console',
    icon: AlertTriangle,
    breadcrumb: 'Alerts',
  },
  '/analytics': {
    path: '/analytics',
    title: 'Analytics',
    subtitle: 'Performance & Capacity',
    icon: BarChart3,
    breadcrumb: 'Analytics',
  },
  '/optimization': {
    path: '/optimization',
    title: 'Smart Optimization',
    subtitle: 'AI Traffic Recommendations',
    icon: Sparkles,
    breadcrumb: 'Optimization',
  },
  '/simulation': {
    path: '/simulation',
    title: 'Traffic Simulation',
    subtitle: 'Scenario Sandbox',
    icon: PlayCircle,
    breadcrumb: 'Simulation',
  },
  '/settings': {
    path: '/settings',
    title: 'Settings',
    subtitle: 'System & Parameter Config',
    icon: Settings,
    breadcrumb: 'Settings',
  },
};

export const NAV_ITEMS = Object.values(APP_ROUTES);
