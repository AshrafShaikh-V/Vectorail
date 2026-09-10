import React from 'react';
import { Alert } from '../types';
import { AlertRow } from './AlertRow';

interface AlertTableProps {
  alerts: Alert[];
  selectedAlert: Alert | null;
  onSelectAlert: (alert: Alert) => void;
}

export const AlertTable: React.FC<AlertTableProps> = ({ alerts, selectedAlert, onSelectAlert }) => {
  return (
    <div className="overflow-x-auto w-full rounded-lg border border-border">
      <table className="w-full text-left border-collapse">
        <thead className="bg-secondary/50 text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
          <tr>
            <th className="p-3 font-bold">Severity</th>
            <th className="p-3 font-bold">Alert</th>
            <th className="p-3 font-bold">Category</th>
            <th className="p-3 font-bold">Source</th>
            <th className="p-3 font-bold">Location</th>
            <th className="p-3 font-bold">Train</th>
            <th className="p-3 font-bold">Status</th>
            <th className="p-3 font-bold">Impact</th>
            <th className="p-3 font-bold text-right">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/40">
          {alerts.map((alert) => (
            <AlertRow
              key={alert.id}
              alert={alert}
              isSelected={selectedAlert?.id === alert.id}
              onSelect={onSelectAlert}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
