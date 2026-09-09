import { mockAlerts } from '../data/alerts';

/**
 * Service for operational alerts, signal alarms, and dispatch notifications.
 */
export const alertService = {
  /**
   * Get all active and recent alerts
   * @returns {Promise<import('../types/alert').Alert[]>}
   */
  async getAlerts() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockAlerts]), 100);
    });
  },

  /**
   * Acknowledge an alert by operator
   * @param {string} alertId
   * @param {string} operatorId
   */
  async acknowledgeAlert(alertId, operatorId) {
    return new Promise((resolve, reject) => {
      const alert = mockAlerts.find((a) => a.id === alertId);
      if (!alert) {
        return reject(new Error(`Alert ${alertId} not found`));
      }
      alert.status = 'ACKNOWLEDGED';
      alert.acknowledgedBy = operatorId;
      alert.acknowledgedAt = new Date().toISOString();
      setTimeout(() => resolve({ ...alert }), 120);
    });
  },
};
