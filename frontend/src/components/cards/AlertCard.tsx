import React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '@/components/ui';

export interface AlertCardProps {
  id?: string;
  title: string;
  description: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFORMATION' | 'OPERATIONAL';
  timestamp?: string;
  source?: string;
  onAcknowledge?: () => void;
  acknowledged?: boolean;
  className?: string;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  title,
  description,
  severity,
  timestamp,
  source,
  onAcknowledge,
  acknowledged = false,
  className,
}) => {
  const config = {
    CRITICAL: {
      border: 'border-rose-500/40 bg-rose-950/10 hover:border-rose-500/60',
      icon: AlertCircle,
      iconColor: 'text-rose-400',
      badgeVariant: 'critical' as const,
    },
    WARNING: {
      border: 'border-amber-500/40 bg-amber-950/10 hover:border-amber-500/60',
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
      badgeVariant: 'warning' as const,
    },
    INFORMATION: {
      border: 'border-sky-500/40 bg-sky-950/10 hover:border-sky-500/60',
      icon: Info,
      iconColor: 'text-sky-400',
      badgeVariant: 'information' as const,
    },
    OPERATIONAL: {
      border: 'border-emerald-500/40 bg-emerald-950/10 hover:border-emerald-500/60',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
      badgeVariant: 'operational' as const,
    },
  }[severity];

  const Icon = config.icon;

  return (
    <Card className={cn('border transition-colors', config.border, className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', config.iconColor)} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{title}</span>
                <Badge variant={config.badgeVariant} className="text-[10px] uppercase font-mono px-1.5 py-0 h-4">
                  {severity}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
              <div className="mt-2 flex items-center gap-3 text-[11px] font-mono text-muted-foreground/80">
                {source && <span>SRC: {source}</span>}
                {timestamp && <span>{timestamp}</span>}
              </div>
            </div>
          </div>

          {onAcknowledge && !acknowledged && (
            <button
              onClick={onAcknowledge}
              className="shrink-0 rounded border border-border bg-secondary/80 px-2 py-1 text-[11px] font-medium text-foreground hover:bg-secondary hover:text-emerald-400 transition-colors"
            >
              Acknowledge
            </button>
          )}
          {acknowledged && (
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
              ACKNOWLEDGED
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
