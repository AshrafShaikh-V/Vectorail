import React, { useState, useEffect } from 'react';
import { Menu, Bell, Shield, Radio, TrainTrack, User } from 'lucide-react';
import { StatusIndicator } from './StatusIndicator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

export function Header({ onToggleSidebar }) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-IN', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short',
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-md">
      {/* Left section: Toggle & Brand */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-muted-foreground hover:text-foreground"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
            <TrainTrack className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-wider text-foreground">
                RAIL<span className="text-emerald-400">MITRA</span>
              </span>
              <span className="hidden sm:inline-block rounded bg-emerald-950/60 px-1.5 py-0.2 text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
                RTMS v1.0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Center section: Live Telemetry State */}
      <div className="hidden md:flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-muted/40 border border-border/60">
          <Radio className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
          <span className="text-xs text-muted-foreground">Network Feed:</span>
          <StatusIndicator status="operational" label="LIVE" />
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground bg-muted/30 px-2.5 py-1 rounded border border-border/40">
          <span className="text-emerald-500 font-semibold">IST:</span>
          <span>{currentTime || '00:00:00 IST'}</span>
        </div>
      </div>

      {/* Right section: Alerts & Profile */}
      <div className="flex items-center gap-3">
        <Link to="/alerts">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-foreground"
            aria-label="Alerts"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
            </span>
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-border/70 bg-card/60 hover:bg-accent text-xs"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                <User className="h-3 w-3" />
              </div>
              <span className="hidden sm:inline font-medium text-foreground">Operator (Desk 04)</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="p-2">
              <div className="text-xs font-semibold text-foreground">Section Controller</div>
              <div className="text-[11px] text-muted-foreground">NR / Delhi Division</div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings" className="cursor-pointer">Console Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/login" className="cursor-pointer text-rose-400">Lock Terminal</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
