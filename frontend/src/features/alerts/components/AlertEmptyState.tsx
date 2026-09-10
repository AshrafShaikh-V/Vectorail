import React from 'react';
import { Button } from '@/components/ui';
import { AlertTriangle, SearchX } from 'lucide-react';

interface AlertEmptyStateProps {
  type: 'loading' | 'empty' | 'no-results' | 'error';
  onReset?: () => void;
  message?: string;
}

export const AlertEmptyState: React.FC<AlertEmptyStateProps> = ({ type, onReset, message }) => {
  switch (type) {
    case 'loading':
      return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
          <div className="h-12 w-12 rounded-full bg-secondary/20 animate-pulse flex items-center justify-center">
            <div className="h-6 w-6 bg-emerald-500/40 rounded-full animate-bounce" />
          </div>
          <p className="text-sm text-muted-foreground font-mono">Fetching latest operational alerts...</p>
        </div>
      );
    case 'empty':
      return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
          <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center text-muted-foreground/40">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">All Clear</h3>
            <p className="text-sm text-muted-foreground">No active operational alerts at this time.</p>
          </div>
        </div>
      );
    case 'no-results':
      return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
          <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center text-muted-foreground/40">
            <SearchX className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">No Alerts Found</h3>
            <p className="text-sm text-muted-foreground">{message || 'No alerts match the current filters.'}</p>
          </div>
          {onReset && (
            <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
              Clear All Filters
            </Button>
          )}
        </div>
      );
    case 'error':
      return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
          <div className="h-16 w-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500/40">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Data Retrieval Error</h3>
            <p className="text-sm text-muted-foreground">Unable to connect to the alert monitoring service.</p>
          </div>
          {onReset && (
            <Button variant="outline" size="sm" onClick={onReset} className="gap-2">
              Retry Connection
            </Button>
          )}
        </div>
      );
  }
};

import { CheckCircle2 } from 'lucide-react';
