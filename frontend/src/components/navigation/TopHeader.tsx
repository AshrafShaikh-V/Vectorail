import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Bell, User, ChevronDown, ChevronRight } from 'lucide-react';
import { SystemStatus, Dropdown, DropdownItem, SearchInput } from '@/components/ui';
import { healthService } from '@/services/healthService';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui';
import { APP_ROUTES } from '@/config/routes';

// ... (imports already updated)

interface TopHeaderProps {
  onToggleMobileSidebar: () => void;
}

const DEMO_NOTIFICATIONS = [
  { id: 1, title: 'Network Advisory', message: 'Planned maintenance on Sector 04 signal nodes', time: '2m ago', type: 'info' },
  { id: 2, title: 'Operational Update', message: 'Train T-102 delayed by 15m due to track work', time: '15m ago', type: 'warning' },
  { id: 3, title: 'System Notice', message: 'API throughput optimized for Sector 01 telemetry', time: '1h ago', type: 'success' },
];

export const TopHeader: React.FC<TopHeaderProps> = ({ onToggleMobileSidebar }) => {
  const [searchValue, setSearchValue] = useState('');
  const [status, setStatus] = useState<'OPERATIONAL' | 'DEGRADED' | 'OFFLINE'>('OPERATIONAL');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const currentRoute = APP_ROUTES[location.pathname] || {
    title: 'Vectorail',
    subtitle: 'Railway Operations',
    breadcrumb: 'Home',
  };

  const checkHealth = async () => {
    try {
      const res = await healthService.getHealth();
      if (res && res.status === 'UP') {
        setStatus('OPERATIONAL');
      } else {
        setStatus('DEGRADED');
      }
    } catch {
      setStatus('OFFLINE');
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card/90 px-4 backdrop-blur sm:px-6">
      {/* Left: Mobile hamburger & breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground lg:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 overflow-hidden">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
            <span>Operations</span>
            <ChevronRight className="h-3 w-3" />
          </div>
          <div className="truncate">
            <h1 className="text-sm sm:text-base font-bold text-foreground leading-tight truncate">
              {currentRoute.title}
            </h1>
            <p className="text-[11px] text-muted-foreground font-medium truncate hidden sm:block">
              {currentRoute.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex max-w-md w-full mx-6">
        <SearchInput
          placeholder="Search trains, stations, alerts..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClear={() => setSearchValue('')}
        />
      </div>

      {/* Right: Status, Notifications, Profile */}
      <div className="flex items-center gap-3">
        {/* System Status Component */}
        <SystemStatus status={status} onClick={checkHealth} />

        {/* Notifications Dropdown */}
        <Dropdown
          align="right"
          trigger={
            <button
              className="relative rounded-md p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              aria-label="View notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
            </button>
          }
        >
          <div className="w-72 p-3 space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-xs font-bold">Notifications</span>
              <span className="text-[10px] font-mono text-muted-foreground">3 New</span>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {DEMO_NOTIFICATIONS.map((n) => (
                <div key={n.id} className="p-2 rounded-md border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[11px] font-bold text-foreground">{n.title}</span>
                    <span className="text-[9px] font-mono text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    {n.message}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button className="text-[10px] font-mono text-emerald-400 hover:underline">
                Mark all as read
              </button>
            </div>
          </div>
        </Dropdown>

        {/* User profile dropdown */}
        <Dropdown
          align="right"
          trigger={
            <div className="flex items-center gap-2 rounded-md p-1.5 hover:bg-secondary text-left transition-colors">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <User className="h-4 w-4" />
              </div>
              <div className="hidden xl:block">
                <div className="text-xs font-semibold text-foreground leading-none">
                  {user?.username || 'User'}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono mt-0.5">
                  {user?.email || 'guest@vectorail.net'}
                </div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden xl:block" />
            </div>
          }
        >
          <div className="px-3 py-2 border-b border-border text-xs">
            <div className="font-semibold text-foreground">
              {user?.role || 'Operator'}
            </div>
            <div className="text-[10px] text-muted-foreground font-mono">
              {user?.email || 'guest@vectorail.net'}
            </div>
          </div>
          <DropdownItem onClick={() => navigate('/settings')}>Preferences</DropdownItem>
          <DropdownItem
            onClick={() => {
              logout();
              toast.success('You have been logged out');
              navigate('/login');
            }}
          >
            Sign Out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
};
