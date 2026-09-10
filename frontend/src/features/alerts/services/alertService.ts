import {
  Alert,
  AlertSummary,
  AlertFilter,
  AlertSortOption
} from '../types';
import { MOCK_ALERTS } from '../data/mockAlerts';

class AlertService {
  private alerts: Alert[];

  constructor() {
    this.alerts = [...MOCK_ALERTS];
  }

  async getAlerts(filter?: AlertFilter, sort?: AlertSortOption): Promise<Alert[]> {
    let filteredAlerts = [...this.alerts];

    if (filter) {
      if (filter.severity) {
        filteredAlerts = filteredAlerts.filter(a => filter.severity!.includes(a.severity));
      }
      if (filter.category) {
        filteredAlerts = filteredAlerts.filter(a => filter.category!.includes(a.category));
      }
      if (filter.status) {
        filteredAlerts = filteredAlerts.filter(a => filter.status!.includes(a.status));
      }
      if (filter.source) {
        filteredAlerts = filteredAlerts.filter(a => filter.source!.includes(a.source));
      }
      if (filter.impact) {
        filteredAlerts = filteredAlerts.filter(a => filter.impact!.includes(a.impact));
      }
      if (filter.trainId) {
        filteredAlerts = filteredAlerts.filter(a => a.trainId === filter.trainId);
      }
      if (filter.stationId) {
        filteredAlerts = filteredAlerts.filter(a => a.stationId === filter.stationId);
      }
      if (filter.sectionId) {
        filteredAlerts = filteredAlerts.filter(a => a.sectionId === filter.sectionId);
      }
      if (filter.lineId) {
        filteredAlerts = filteredAlerts.filter(a => a.lineId === filter.lineId);
      }
      if (filter.isRead !== undefined) {
        filteredAlerts = filteredAlerts.filter(a => a.isRead === filter.isRead);
      }
      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        filteredAlerts = filteredAlerts.filter(a =>
          a.title.toLowerCase().includes(searchLower) ||
          a.description.toLowerCase().includes(searchLower) ||
          a.alertCode.toLowerCase().includes(searchLower) ||
          a.location.toLowerCase().includes(searchLower)
        );
      }
    }

    if (sort) {
      filteredAlerts.sort((a, b) => {
        switch (sort) {
          case 'newest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'oldest':
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          case 'highestSeverity':
            return a.priority - b.priority;
          case 'lowestSeverity':
            return b.priority - a.priority;
          case 'highestImpact':
            const impactOrder: Record<string, number> = { SEVERE: 1, HIGH: 2, MODERATE: 3, LOW: 4, NONE: 5 };
            return (impactOrder[a.impact] || 5) - (impactOrder[b.impact] || 5);
          case 'unresolvedFirst':
            if (a.status === 'ACTIVE' && b.status !== 'ACTIVE') return -1;
            if (a.status !== 'ACTIVE' && b.status === 'ACTIVE') return 1;
            return 0;
          default:
            return 0;
        }
      });
    }

    return filteredAlerts;
  }

  async getAlertById(id: string): Promise<Alert | null> {
    return this.alerts.find(a => a.id === id) || null;
  }

  async getActiveAlerts(): Promise<Alert[]> {
    return this.getAlerts({ status: ['ACTIVE'] });
  }

  async getAlertsBySeverity(severity: any): Promise<Alert[]> {
    return this.getAlerts({ severity: [severity] });
  }

  async getAlertsByStatus(status: any): Promise<Alert[]> {
    return this.getAlerts({ status: [status] });
  }

  async getAlertsByCategory(category: any): Promise<Alert[]> {
    return this.getAlerts({ category: [category] });
  }

  async getAlertsByTrain(trainId: string): Promise<Alert[]> {
    return this.getAlerts({ trainId });
  }

  async getAlertsByStation(stationId: string): Promise<Alert[]> {
    return this.getAlerts({ stationId });
  }

  async getAlertsBySection(sectionId: string): Promise<Alert[]> {
    return this.getAlerts({ sectionId });
  }

  async getAlertsByLine(lineId: string): Promise<Alert[]> {
    return this.getAlerts({ lineId });
  }

  async getAlertSummary(): Promise<AlertSummary> {
    const alerts = this.alerts;
    return {
      totalAlerts: alerts.length,
      activeAlerts: alerts.filter(a => a.status === 'ACTIVE').length,
      criticalAlerts: alerts.filter(a => a.severity === 'CRITICAL').length,
      highAlerts: alerts.filter(a => a.severity === 'HIGH').length,
      mediumAlerts: alerts.filter(a => a.severity === 'MEDIUM').length,
      acknowledgedAlerts: alerts.filter(a => a.status === 'ACKNOWLEDGED').length,
      resolvedAlerts: alerts.filter(a => a.status === 'RESOLVED').length,
      unreadAlerts: alerts.filter(a => !a.isRead).length,
    };
  }

  async markAsRead(id: string): Promise<void> {
    const alert = this.alerts.find(a => a.id === id);
    if (alert) {
      alert.isRead = true;
    }
  }

  async acknowledgeAlert(id: string): Promise<void> {
    const alert = this.alerts.find(a => a.id === id);
    if (alert) {
      alert.status = 'ACKNOWLEDGED';
      alert.acknowledgedAt = new Date().toISOString();
    }
  }

  async resolveAlert(id: string): Promise<void> {
    const alert = this.alerts.find(a => a.id === id);
    if (alert) {
      alert.status = 'RESOLVED';
      alert.resolvedAt = new Date().toISOString();
    }
  }
}

export const alertService = new AlertService();
