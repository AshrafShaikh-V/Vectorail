import React from 'react';

export const DashboardHeader: React.FC = () => {
  const now = new Date();
  const dateString = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const timeString = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono font-medium text-emerald-400 uppercase tracking-widest">
            System Online
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Control Center
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Real-time overview of railway network operations and traffic telemetry.
        </p>
      </div>
      <div className="flex items-center gap-4 font-mono text-right">
        <div className="text-right">
          <div className="text-xs text-muted-foreground uppercase tracking-tighter">Operational Date</div>
          <div className="text-sm font-medium text-foreground">{dateString}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground uppercase tracking-tighter">System Time</div>
          <div className="text-sm font-medium text-foreground">{timeString}</div>
        </div>
      </div>
    </div>
  );
};
