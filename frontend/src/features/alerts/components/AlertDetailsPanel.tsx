import React from 'react';
import { Drawer } from '@/components/ui';
import { Button } from '@/components/ui';
import { Alert } from '../types';
import {
  getStatusLabel,
  getImpactLabel
} from '../utils';
import { Calendar, Clock, MapPin, Train, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AlertDetailsPanelProps {
  alert: Alert | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AlertDetailsPanel: React.FC<AlertDetailsPanelProps> = ({ alert, isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!alert) return null;

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      title="Alert Details"
      width="md"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border">
            <span className="text-xs text-muted-foreground">Severity</span>
            <span className="text-sm font-bold">{alert.severity}</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border">
            <span className="text-xs text-muted-foreground">Status</span>
            <span className="text-sm font-bold">{getStatusLabel(alert.status)}</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 border border-border">
            <span className="text-xs text-muted-foreground">Impact</span>
            <span className="text-sm font-bold">{getImpactLabel(alert.impact)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Description</h4>
          <p className="text-sm leading-relaxed text-foreground/90">{alert.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" /> Created
            </div>
            <div className="text-xs font-mono">{new Date(alert.createdAt).toLocaleString()}</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" /> Updated
            </div>
            <div className="text-xs font-mono">{new Date(alert.updatedAt).toLocaleString()}</div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Related Entities</h4>
          <div className="space-y-3">
            {alert.trainId && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/10 border border-border">
                <div className="flex items-center gap-3">
                  <Train className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium">Train: {alert.trainId}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-[10px] gap-1"
                  onClick={() => navigate(`/trains/${alert.trainId}`)}
                >
                  View <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            )}
            {alert.stationId && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/10 border border-border">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium">Station: {alert.stationId}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-[10px] gap-1"
                  onClick={() => navigate('/network')}
                >
                  View <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            )}
            {alert.sectionId && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/10 border border-border">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium">Section: {alert.sectionId}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-[10px] gap-1"
                  onClick={() => navigate('/network')}
                >
                  View <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
