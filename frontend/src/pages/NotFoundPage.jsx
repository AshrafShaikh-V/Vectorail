import React from 'react';
import { AlertOctagon, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="h-16 w-16 rounded-full bg-rose-950/40 border border-rose-500/30 flex items-center justify-center text-rose-400">
        <AlertOctagon className="h-8 w-8" />
      </div>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          404 - Section Route Not Found
        </h2>
        <p className="text-sm text-muted-foreground max-w-md">
          The requested operational console path does not exist on this RTMS terminal.
        </p>
      </div>
      <Link to="/dashboard">
        <Button variant="outline" className="gap-2 mt-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Dashboard</span>
        </Button>
      </Link>
    </div>
  );
}
