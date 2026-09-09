import { mockSections, mockNetworkNodes } from '../data/network';
import { mockStations } from '../data/stations';

/**
 * Service for railway infrastructure, sections, stations, and topology.
 */
export const networkService = {
  /**
   * Get all railway corridor sections
   * @returns {Promise<import('../types/section').RailwaySection[]>}
   */
  async getSections() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockSections]), 150);
    });
  },

  /**
   * Get all corridor stations
   * @returns {Promise<import('../types/station').Station[]>}
   */
  async getStations() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockStations]), 120);
    });
  },

  /**
   * Get network graph nodes and topology
   * @returns {Promise<{ nodes: import('../types/network').NetworkNode[], sections: import('../types/section').RailwaySection[] }>}
   */
  async getNetworkTopology() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          nodes: [...mockNetworkNodes],
          sections: [...mockSections],
        });
      }, 180);
    });
  },
};
