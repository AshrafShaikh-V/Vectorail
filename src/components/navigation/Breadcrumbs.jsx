import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const routeLabels = {
  dashboard: 'Operations Dashboard',
  network: 'Network Map',
  trains: 'Active Trains',
  alerts: 'Critical Alerts',
  analytics: 'Traffic Analytics',
  optimization: 'AI Optimization',
  simulation: 'Timetable Simulation',
  settings: 'System Settings',
  login: 'Authentication',
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center space-x-1 text-xs text-muted-foreground mb-4" aria-label="Breadcrumb">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
        <span>RTMS</span>
      </Link>
      {pathSegments.map((segment, index) => {
        const routeTo = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSegments.length - 1;
        const label = routeLabels[segment] || segment;

        return (
          <React.Fragment key={routeTo}>
            <ChevronRight className="h-3 w-3 text-muted-foreground/60" />
            {isLast ? (
              <span className="font-medium text-emerald-400">{label}</span>
            ) : (
              <Link to={routeTo} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
