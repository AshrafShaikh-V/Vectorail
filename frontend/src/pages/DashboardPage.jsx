import React from 'react';
import { ShieldCheck, Activity, Cpu, Radio, ArrowRight, Train, Network, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusIndicator } from '@/components/common/StatusIndicator';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Platform Banner / Initial Application Screen Requirement */}
      <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/40 via-card to-card p-6 md:p-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="operational" className="uppercase tracking-widest text-[10px]">
                Phase 1 Foundation
              </Badge>
              <StatusIndicator status="operational" label="Node Online" />
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              RailMitra
            </h1>
            <p className="text-base text-emerald-400 font-medium">
              Railway Traffic Management System
            </p>
            <p className="text-sm text-muted-foreground max-w-xl">
              Operations platform initialized. Core architecture, dark control-center design system,
              service contracts, and responsive layout are active and ready for Phase 2.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/network">
              <Button variant="default" className="gap-2 w-full sm:w-auto">
                <Network className="h-4 w-4" />
                <span>Inspect Network</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/alerts">
              <Button variant="outline" className="gap-2 w-full sm:w-auto">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <span>View Alerts</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Ambient background glow */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Architecture Readiness Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/80 bg-card/70">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              OPERATIONAL STATUS
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Active</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              All subsystems nominal
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/70">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              TELEMETRY BUS
            </CardTitle>
            <Radio className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12 ms</div>
            <p className="text-xs text-muted-foreground mt-1">
              Simulated WebSocket latency
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/70">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              ACTIVE CORRIDORS
            </CardTitle>
            <Activity className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4 Sections</div>
            <p className="text-xs text-muted-foreground mt-1">
              NDLS-CNB Quad Track Trunk
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/70">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              OPTIMIZATION ENGINE
            </CardTitle>
            <Cpu className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">Ready</div>
            <p className="text-xs text-muted-foreground mt-1">
              AI precedence dispatcher standby
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Navigation Shells */}
      <Card className="border-border/80 bg-card/50">
        <CardHeader>
          <CardTitle>Configured Application Routes (Phase 1)</CardTitle>
          <CardDescription>
            All application routes and layout placeholders are configured in React Router and accessible via the sidebar or links below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { path: '/network', name: 'Network Map', desc: 'Topology & Sections' },
              { path: '/trains', name: 'Active Trains', desc: 'Telemetry & Speed' },
              { path: '/alerts', name: 'Operations Alerts', desc: 'Critical Alarms' },
              { path: '/analytics', name: 'Analytics', desc: 'Throughput & KPIs' },
              { path: '/optimization', name: 'AI Optimization', desc: 'Precedence & Speed' },
              { path: '/simulation', name: 'Simulation', desc: 'Timetable Scenarios' },
              { path: '/settings', name: 'Settings', desc: 'Console Configuration' },
              { path: '/login', name: 'Authentication', desc: 'Operator Sign In' },
            ].map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="group flex flex-col justify-between rounded-lg border border-border/70 bg-card/80 p-3 hover:border-emerald-500/40 hover:bg-muted/40 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-foreground group-hover:text-emerald-400 transition-colors">
                    {route.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{route.desc}</div>
                </div>
                <div className="text-[11px] font-mono text-emerald-500/80 mt-3 flex items-center gap-1">
                  <span>{route.path}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
