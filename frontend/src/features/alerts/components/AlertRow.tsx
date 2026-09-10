import React from 'react';
import { Alert } from '../types';
import {
  getSeverityLabel,
  getSeverityColor,
  getStatusLabel,
  getCategoryLabel,
  getImpactLabel,
  formatRelativeTime
} from '../utils';
import { cn } from '@/lib/utils';

interface AlertRowProps {
  alert: Alert;
  isSelected: boolean;
  onSelect: (alert: Alert) => void;
}

export const AlertRow: React.FC<AlertRowProps> = ({ alert, isSelected, onSelect }) => {
  return (
    <tr
      onClick={() => onSelect(alert)}
      className={cn(
        'group cursor-pointer transition-colors border-b border-border/40',
        isSelected ? 'bg-emerald-500/10' : 'hover:bg-secondary/30'
      )}
    >
      <td className="p-3 w-24">
        <span className={cn(
          'text-[10px] font-bold px-1.5 py-0.5 rounded border font-mono',
          getSeverityColor(alert.severity),
          'border-current/30 bg-current/10'
        )}>
          {getSeverityLabel(alert.severity)}
        </span>
      </td>
      <td className="p-3">
        <div className="flex flex-col">
          <span className={cn(
            'text-sm font-medium',
            !alert.isRead ? 'text-foreground font-bold' : 'text-foreground/80'
          )}>
            {alert.title}
          </span>
          <span className="text-[10px] font-mono text-muted-foreground">{alert.alertCode}</span>
        </div>
      </td>
      <td className="p-3 text-xs text-muted-foreground">
        {getCategoryLabel(alert.category)}
      </td>
      <td className="p-3 text-xs font-mono text-muted-foreground">
        {alert.source}
      </td>
      <td className="p-3 text-xs text-muted-foreground">
        {alert.location}
      </td>
      <td className="p-3 text-xs font-mono text-muted-foreground">
        {alert.trainId || '—'}
      </td>
      <td className="p-3 text-xs">
        <span className="text-muted-foreground">{getStatusLabel(alert.status)}</span>
      </td>
      <td className="p-3 text-xs">
        <span className={cn(
          'font-medium',
          alert.impact === 'SEVERE' ? 'text-rose-400' :
          alert.impact === 'HIGH' ? 'text-orange-400' :
          'text-muted-foreground'
        )}>
          {getImpactLabel(alert.impact)}
        </span>
      </td>
      <td className="p-3 text-xs font-mono text-muted-foreground text-right">
        {formatRelativeTime(alert.createdAt)}
      </td>
    </tr>
  );
};
