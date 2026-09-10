import { request } from './apiClient';
import type { Alert } from '../types';

export const alertService = {
  async getAlerts(): Promise<Alert[]> {
    return request<Alert[]>('/alerts');
  },
  async acknowledgeAlert(id: string): Promise<{ success: boolean }> {
    return request<{ success: boolean }>(`/alerts/${id}/ack`, { method: 'POST' });
  },
};
