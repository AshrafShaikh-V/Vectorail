import { request } from './apiClient';
import type { Train } from '../types';

export const trainService = {
  async getTrains(): Promise<Train[]> {
    return request<Train[]>('/trains');
  },
  async getTrainById(id: string): Promise<Train> {
    return request<Train>(`/trains/${id}`);
  },
};
