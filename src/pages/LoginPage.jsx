import React from 'react';
import { TrainTrack, ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 mb-2">
            <TrainTrack className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-wider text-foreground">
            RAIL<span className="text-emerald-400">MITRA</span>
          </h1>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
            Operations Control Center • Authorization Portal
          </p>
        </div>

        <Card className="border-border/80 bg-card/80 shadow-2xl backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Lock className="h-4 w-4 text-emerald-400" />
              Operator Access
            </CardTitle>
            <CardDescription>
              Enter your Section Controller badge ID or authorized dispatch credentials.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Operator ID / Employee No.</label>
              <Input placeholder="e.g. OP-NR-882" defaultValue="OP-NR-882" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Console Access Key</label>
              <Input type="password" placeholder="••••••••••••" defaultValue="secretpassword" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Link to="/dashboard" className="w-full">
              <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <span>Authenticate Terminal</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <div className="text-center text-[11px] text-muted-foreground">
              Demo Mode: Direct authentication enabled for Phase 1 testing.
            </div>
          </CardFooter>
        </Card>

        <div className="text-center text-xs text-muted-foreground/60">
          RailMitra Railway Traffic Management System • v1.0 Production Foundation
        </div>
      </div>
    </div>
  );
}
