/**
 * Service for what-if timetable and traffic simulation scenarios.
 */
export const simulationService = {
  /**
   * Get all registered simulation scenarios
   * @returns {Promise<import('../types/simulation').SimulationScenario[]>}
   */
  async getScenarios() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'SIM-PEAK-01',
            name: 'Morning Commuter Peak + Freight Cross-Traffic',
            description: 'Assesses Delhi Division capacity under 15% surge in passenger operations.',
            durationMinutes: 120,
            timeAcceleration: 5,
            injectedDelayFactor: 1.2,
            corridorIds: ['SEC-NDLS-GZB-01', 'SEC-GZB-ALJN-01'],
            activeTrainCount: 18,
            status: 'READY',
            createdAt: new Date().toISOString(),
          },
        ]);
      }, 140);
    });
  },

  /**
   * Trigger scenario execution
   * @param {string} scenarioId
   */
  async runScenario(scenarioId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          scenarioId,
          executionState: 'STARTED',
          startedAt: new Date().toISOString(),
        });
      }, 200);
    });
  },
};
