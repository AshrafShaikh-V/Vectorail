import { request } from './apiClient';
import type { SimulationScenario } from '../types';

export const simulationService = {
  async getScenarios(): Promise<SimulationScenario[]> {
    return request<SimulationScenario[]>('/simulation/scenarios');
  },
  async runScenario(id: string): Promise<{ executionId: string; status: string }> {
    return request<{ executionId: string; status: string }>(`/simulation/scenarios/${id}/run`, {
      method: 'POST',
    });
  },
};
