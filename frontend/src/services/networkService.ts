import { request } from './apiClient';
import type { Station, RailwaySection, NetworkNode } from '../types';

export const networkService = {
  async getStations(): Promise<Station[]> {
    return request<Station[]>('/network/stations');
  },
  async getSections(): Promise<RailwaySection[]> {
    return request<RailwaySection[]>('/network/sections');
  },
  async getNetworkNodes(): Promise<NetworkNode[]> {
    return request<NetworkNode[]>('/network/nodes');
  },
};
