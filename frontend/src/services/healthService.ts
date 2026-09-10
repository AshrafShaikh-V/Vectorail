import { request } from './apiClient';
import type { SystemHealth } from '../types';

export const healthService = {
  async getHealth(): Promise<SystemHealth> {
    return request<SystemHealth>('/health');
  },
};
