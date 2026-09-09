import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Network,
  Train,
  AlertTriangle,
  BarChart3,
  Zap,
  Cpu,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Radio,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const navItems = [
  {
    path: '/dashboard',
    label: 'Operations Dashboard',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    path: '/network',
    label: 'Network Map',
    icon: Network,
    badge: 'Live',
  },
  {
    path: '/trains',
    label: 'Active Trains',
    icon: Train,
    badge: '5',
  },
  {
    path: '/alerts',
    label: 'Critical Alerts',
    icon: AlertTriangle,
    badge: '3',
    badgeVariant: 'critical',
  },
  {
    path: '/analytics',
    label: 'Traffic Analytics',
    icon: BarChart3,
    badge: null,
  },
  {
    path: '/optimization',
    label: 'AI Optimization',
    icon: Zap,
    badge: 'AI',
    badgeVariant: 'operational',
  },
  {
    path: '/simulation',
    label: 'Timetable Simulation',
    icon: Cpu,
    badge: null,
  },
  {
    path: '/settings',
    label: 'System Settings',
    icon: Settings,
    badge: null,
  },
];

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out lg:static lg:z-20',
          isCollapsed ? 'w-16' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Mobile Header / Close */}
        <div className="flex h-14 items-center justify-between px-4 border-b border-border lg:hidden">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-emerald-400" />
            <span className="font-bold text-sm tracking-wider">RAILMITRA</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onCloseMobile}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
          <div className={cn('px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70', isCollapsed && 'hidden')}>
            Corridor Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  cn(
                    'group relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/30'
                      : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                    isCollapsed && 'justify-center px-2'
                  )
                }
                title={isCollapsed ? item.label : undefined}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn(
                        'h-4 w-4 shrink-0 transition-colors',
                        isActive ? 'text-emerald-400' : 'text-muted-foreground group-hover:text-foreground'
                      )}
                    />
                    {!isCollapsed && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}

                    {!isCollapsed && item.badge && (
                      <Badge
                        variant={item.badgeVariant || 'secondary'}
                        className="ml-auto text-[10px] px-1.5 py-0 h-4"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Sidebar Footer / Collapse Toggle */}
        <div className="border-t border-border p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className={cn(
              'hidden lg:flex w-full items-center gap-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/60',
              isCollapsed && 'justify-center px-0'
            )}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </Button>

          {!isCollapsed && (
            <div className="mt-2 rounded-md bg-muted/30 p-2.5 border border-border/50 hidden lg:block">
              <div className="text-[11px] font-mono text-muted-foreground flex justify-between">
                <span>SECTOR:</span>
                <span className="text-emerald-400">NORTH-01</span>
              </div>
              <div className="text-[10px] text-muted-foreground/70 mt-1">
                Connected to RTMS Node
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
