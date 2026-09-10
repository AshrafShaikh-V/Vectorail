import React, { useState } from 'react';
import {
  TrainFront,
  Clock,
  AlertTriangle,
  Activity,
} from 'lucide-react';
import {
  KpiCard,
  useToast,
  Button
} from '@/components/ui';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardControls } from '@/components/dashboard/DashboardControls';
import { DashboardSection } from '@/components/dashboard/DashboardSection';
import { NetworkOverviewPlaceholder } from '@/components/dashboard/NetworkOverviewPlaceholder';
import { TrainOperationsPreview } from '@/components/dashboard/TrainOperationsPreview';
import { AlertsOverview } from '@/components/dashboard/AlertsOverview';
import { PerformanceOverview } from '@/components/dashboard/PerformanceOverview';
import { SmartOperationsPreview } from '@/components/dashboard/SmartOperationsPreview';
import { OperationalHealthCard } from '@/components/dashboard/OperationalHealthCard';
import { NetworkStatusWidget } from '@/components/dashboard/NetworkStatusWidget';
import { TrainStatusSummary } from '@/components/dashboard/TrainStatusSummary';
import { SystemStatusSummary } from '@/components/dashboard/SystemStatusSummary';
import { DASHBOARD_MOCK_DATA } from '@/data/dashboardData';
import { ExternalLink } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { toast } = useToast();

  const handleRefresh = () => {
    toast({
      type: 'info',
      title: 'Telemetry Sync',
      message: 'Refreshing real-time operational data from sector gateways...',
    });
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 animate-fadeIn">
      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Operational Control Bar */}
      <DashboardControls onRefresh={handleRefresh} />

      {/* Primary Overview Area - KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DASHBOARD_MOCK_DATA.primaryKpis.map((kpi) => (
          <KpiCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            icon={kpi.icon}
            status={kpi.status}
            trend={{
              value: kpi.trend?.value || '0%',
              direction: kpi.trend?.direction || 'neutral',
              label: kpi.trend?.label,
            }}
            description={kpi.description}
          />
        ))}
      </div>

      {/* Operational Health Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <OperationalHealthCard data={DASHBOARD_MOCK_DATA.operationalHealth} />
        </div>
        <div className="lg:col-span-1">
          <NetworkStatusWidget data={DASHBOARD_MOCK_DATA.networkStatus} />
        </div>
        <div className="lg:col-span-1">
          <TrainStatusSummary data={DASHBOARD_MOCK_DATA.trainStatus} />
        </div>
      </div>

      {/* System Health Summary */}
      <DashboardSection
        title="System Infrastructure Status"
        description="Real-time health of control center services"
      >
        <SystemStatusSummary data={DASHBOARD_MOCK_DATA.systemStatus} />
      </DashboardSection>

      {/* Main Operational Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Network Overview */}
        <DashboardSection
          title="Network Overview"
          description="Real-time topological state and track occupancy"
          action={
            <Button variant="ghost" size="sm" className="text-xs gap-1 h-7" onClick={() => {}}>
              Full Map <ExternalLink className="h-3 w-3" />
            </Button>
          }
        >
          <NetworkOverviewPlaceholder />
        </DashboardSection>

        {/* Train Operations */}
        <DashboardSection
          title="Train Operations"
          description="Active fleet telemetry and schedule compliance"
          action={
            <Button variant="ghost" size="sm" className="text-xs gap-1 h-7" onClick={() => {}}>
              Fleet List <ExternalLink className="h-3 w-3" />
            </Button>
          }
        >
          <TrainOperationsPreview />
        </DashboardSection>

        {/* Alerts & Incidents */}
        <DashboardSection
          title="Alerts & Incidents"
          description="High-priority operational events and safety warnings"
          action={
            <Button variant="ghost" size="sm" className="text-xs gap-1 h-7" onClick={() => {}}>
              Incident Log <ExternalLink className="h-3 w-3" />
            </Button>
          }
        >
          <AlertsOverview />
        </DashboardSection>

        {/* Performance Overview */}
        <DashboardSection
          title="Performance Overview"
          description="Key operational metrics and throughput analysis"
          action={
            <Button variant="ghost" size="sm" className="text-xs gap-1 h-7" onClick={() => {}}>
              Analytics <ExternalLink className="h-3 w-3" />
            </Button>
          }
        >
          <PerformanceOverview />
        </DashboardSection>
      </div>

      {/* Smart Operations Preview */}
      <DashboardSection
        title="Smart Operations"
        description="AI-driven optimization recommendations for Sector 01"
      >
        <SmartOperationsPreview />
      </DashboardSection>
    </div>
  );
};
