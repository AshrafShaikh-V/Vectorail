/**
 * @typedef {'DRAFT' | 'READY' | 'RUNNING' | 'COMPLETED' | 'FAILED'} SimulationState
 * 
 * @typedef {Object} SimulationScenario
 * @property {string} id - Scenario ID (e.g., 'SIM-PEAK-MORNING-01')
 * @property {string} name - Title (e.g., 'Monsoon Delay Cascade Simulation')
 * @property {string} description - Scenario parameters and hypothesis
 * @property {number} durationMinutes - Virtual duration to simulate
 * @property {number} timeAcceleration - Speed multiplier (1x, 5x, 10x)
 * @property {number} injectedDelayFactor - Synthetic delay multiplier
 * @property {string[]} corridorIds - Affected corridors
 * @property {number} activeTrainCount - Number of simulated trains
 * @property {SimulationState} status - Current simulation state
 * @property {string} createdAt - ISO timestamp
 */

export const SimulationStatus = {
  DRAFT: 'DRAFT',
  READY: 'READY',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
};
