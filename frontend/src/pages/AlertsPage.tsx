import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertSummaryView } from '@/features/alerts/components/AlertSummary';
import { AlertFilters } from '@/features/alerts/components/AlertFilters';
import { AlertTable } from '@/features/alerts/components/AlertTable';
import { AlertDetailsPanel } from '@/features/alerts/components/AlertDetailsPanel';
import { AlertEmptyState } from '@/features/alerts/components/AlertEmptyState';
import { alertService } from '@/features/alerts/services/alertService';
import { Alert, AlertFilter, AlertSortOption } from '@/features/alerts/types';
import { useToast } from '@/components/ui';

export const AlertsPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [filter, setFilter] = useState<AlertFilter>({});
  const [sort, setSort] = useState<AlertSortOption>('newest');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAlerts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [data, summ] = await Promise.all([
        alertService.getAlerts(filter, sort),
        alertService.getAlertSummary()
      ]);
      setAlerts(data);
      setSummary(summ);
    } catch (err) {
      setError('Failed to fetch operational alerts');
      toast({
        type: 'error',
        title: 'Service Error',
        message: 'Unable to load alert data from the monitoring service.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  useEffect(() => {
    loadAlerts();
  }, [filter, sort]);

  const handleRefresh = async () => {
    toast({
      type: 'info',
      title: 'Refreshing',
      message: 'Updating operational alert feed...',
    });
    await loadAlerts();
  };

  if (error) {
    return (
      <div className="p-6 min-h-[80vh]">
        <AlertEmptyState type="error" onReset={loadAlerts} />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-screen-2xl mx-auto space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Alerts & Incidents</h1>
        <p className="text-sm text-muted-foreground">Monitor active operational alerts and network conditions across the Vectorail system.</p>
      </div>

      {summary && <AlertSummaryView summary={summary} />}

      <div className="space-y-6">
        <AlertFilters
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
          onRefresh={handleRefresh}
        />

        {isLoading ? (
          <AlertEmptyState type="loading" />
        ) : alerts.length === 0 ? (
          <AlertEmptyState type="empty" />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-mono">
                Showing {alerts.length} operational alerts
              </p>
            </div>
            <AlertTable
              alerts={alerts}
              selectedAlert={selectedAlert}
              onSelectAlert={setSelectedAlert}
            />
          </div>
        )}
      </div>

      <AlertDetailsPanel
        alert={selectedAlert}
        isOpen={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />
    </div>
  );
};
