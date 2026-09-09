/**
 * Service for network performance analytics, throughput, and punctuality metrics.
 */
export const analyticsService = {
  /**
   * Get operational KPIs summary
   */
  async getOperationalKPIs() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          onTimePunctualityRate: 92.4, // percentage
          activeCorridorThroughput: 88, // trains / hour
          averageDelayMinutes: 8.2,
          criticalAlertsCount: 1,
          totalTrackOccupancyPct: 64.5,
          timestamp: new Date().toISOString(),
        });
      }, 150);
    });
  },

  /**
   * Get historical delay distribution by corridor
   */
  async getCorridorPerformance() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { corridor: 'NDLS-CNB Main', punctuality: 94.2, volume: 142 },
          { corridor: 'GZB-MB Moradabad', punctuality: 89.1, volume: 98 },
          { corridor: 'DLI-RE Rewari', punctuality: 96.0, volume: 64 },
          { corridor: 'TDL-AGC Agra Chord', punctuality: 91.8, volume: 76 },
        ]);
      }, 150);
    });
  },
};
