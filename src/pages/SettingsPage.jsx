import React from 'react';
import { Settings, ArrowLeft, Sliders, Shield, Terminal } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function SettingsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Link to="/dashboard" className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" /> Dashboard
            </Link>
            <span>/</span>
            <span className="text-emerald-400">Settings</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Settings className="h-6 w-6 text-emerald-400" />
            System & Operations Settings
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Console telemetry refresh rates, sector dispatch desks, and security credentials
          </p>
        </div>
        <Badge variant="outline">Operator Desk 04</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/80 bg-card/60">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sliders className="h-4 w-4 text-emerald-400" />
              Console Preferences
            </CardTitle>
            <CardDescription>
              Telemetry polling intervals, audio warning chimes, and theme adjustments.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-muted-foreground">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span>Telemetry Refresh Rate</span>
              <span className="font-mono text-emerald-400">2000 ms</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span>Theme Mode</span>
              <span className="font-mono text-foreground">Dark Operations (Fixed)</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Audio Warnings for Critical Alarms</span>
              <span className="font-mono text-emerald-400">Enabled</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-card/60">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              Corridor Server Connection
            </CardTitle>
            <CardDescription>
              RTMS backend gateway endpoint and protocol settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-muted-foreground">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span>API Gateway</span>
              <span className="font-mono text-emerald-400">http://localhost:8080/api/v1</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span>Zone Node</span>
              <span className="font-mono text-foreground">NR-DELHI-ZONE-01</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Status</span>
              <span className="font-mono text-emerald-400">Connected (Mock Data Layer)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
