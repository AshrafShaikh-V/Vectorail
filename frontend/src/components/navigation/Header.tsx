import React, { useState, useEffect } from 'react';
import { Menu, Activity, ShieldCheck, User, Clock } from 'lucide-react';
import { Badge, Dropdown, DropdownItem } from '@/components/ui';
import { healthService } from '@/services/healthService';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [backendStatus, setBackendStatus] = useState<'CONNECTING' | 'CONNECTED' | 'OFFLINE'>('CONNECTING');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' UTC'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkHealth = async () => {
    try {
      const res = await healthService.getHealth();
      if (res && res.status === 'UP') {
        setBackendStatus('CONNECTED');
      } else {
        setBackendStatus('OFFLINE');
      }
    } catch {
      setBackendStatus('OFFLINE');
    }
  };

  useEffect(() => {
    checkHealth();
    const timer = setInterval(checkHealth, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden items-center gap-2 text-sm sm:flex">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span className="font-medium text-foreground">TRAFFIC CONTROLLER DESK</span>
          <span className="text-muted-foreground font-mono text-xs">/ SECTOR 01</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Real-time Clock */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-3 py-1 text-xs font-mono text-muted-foreground">
          <Clock className="h-3.5 w-3.5 text-emerald-400" />
          <span>{currentTime || '00:00:00 UTC'}</span>
        </div>

        {/* Backend Health Badge */}
        <div className="flex items-center gap-2">
          {backendStatus === 'CONNECTED' ? (
            <Badge variant="operational" className="flex items-center gap-1.5 font-mono text-xs cursor-pointer" onClick={checkHealth}>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Backend: Connected</span>
            </Badge>
          ) : backendStatus === 'CONNECTING' ? (
            <Badge variant="warning" className="flex items-center gap-1.5 font-mono text-xs">
              <Activity className="h-3 w-3 animate-spin text-amber-400" />
              <span>Backend: Connecting</span>
            </Badge>
          ) : (
            <Badge variant="critical" className="flex items-center gap-1.5 font-mono text-xs cursor-pointer" onClick={checkHealth}>
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
              <span>Backend: Offline</span>
            </Badge>
          )}
        </div>

        {/* User profile dropdown */}
        <Dropdown
          align="right"
          trigger={
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary border border-border text-foreground hover:border-emerald-500/50 transition-colors">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          }
        >
          <div className="px-3 py-2 border-b border-border/50 text-xs">
            <div className="font-semibold text-foreground">Ashraf (Controller)</div>
            <div className="text-[10px] text-muted-foreground font-mono">ID: OPR-7701</div>
          </div>
          <DropdownItem onClick={() => window.location.href = '/settings'}>System Settings</DropdownItem>
          <DropdownItem onClick={() => window.location.href = '/login'}>Switch Session</DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
};
