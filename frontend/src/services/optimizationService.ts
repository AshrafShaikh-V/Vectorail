import { request } from './apiClient';
import type { OptimizationRecommendation } from '../types';

export const optimizationService = {
  async getRecommendations(): Promise<OptimizationRecommendation[]> {
    return request<OptimizationRecommendation[]>('/optimization/recommendations');
  },
  async applyRecommendation(id: string): Promise<{ success: boolean }> {
    return request<{ success: boolean }>(`/optimization/recommendations/${id}/apply`, {
      method: 'POST',
    });
  },
};
