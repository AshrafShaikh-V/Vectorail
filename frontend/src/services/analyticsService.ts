import { request } from './apiClient';

export interface AnalyticsMetrics {
  onTimePerformanceRate: number;
  averageDelayMinutes: number;
  activeTrainCount: number;
  criticalAlertsCount: number;
}

export const analyticsService = {
  async getMetrics(): Promise<AnalyticsMetrics> {
    return request<AnalyticsMetrics>('/analytics/metrics');
  },
};
