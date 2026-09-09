import { mockTrains } from '../data/trains';

/**
 * Service to manage Train telemetry, live tracking, and status updates.
 * Structured for clean replacement by REST/WebSocket endpoints.
 */
export const trainService = {
  /**
   * Fetch all active monitored trains
   * @returns {Promise<import('../types/train').Train[]>}
   */
  async getAllTrains() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockTrains]), 150);
    });
  },

  /**
   * Get train telemetry by ID
   * @param {string} id
   * @returns {Promise<import('../types/train').Train|null>}
   */
  async getTrainById(id) {
    return new Promise((resolve) => {
      const train = mockTrains.find((t) => t.id === id);
      setTimeout(() => resolve(train ? { ...train } : null), 100);
    });
  },

  /**
   * Update operational status of a train
   * @param {string} id
   * @param {import('../types/train').TrainOperationalStatus} status
   */
  async updateTrainStatus(id, status) {
    return new Promise((resolve, reject) => {
      const trainIndex = mockTrains.findIndex((t) => t.id === id);
      if (trainIndex === -1) {
        return reject(new Error(`Train with ID ${id} not found`));
      }
      mockTrains[trainIndex].status = status;
      mockTrains[trainIndex].lastUpdated = new Date().toISOString();
      setTimeout(() => resolve({ ...mockTrains[trainIndex] }), 150);
    });
  },
};
