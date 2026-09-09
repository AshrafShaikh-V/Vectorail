/**
 * @typedef {'PRECEDENCE_OVERTAKE' | 'SPEED_REGULATION' | 'PLATFORM_REALLOCATION' | 'CORRIDOR_REROUTE'} OptimizationType
 * @typedef {'PENDING' | 'ACCEPTED' | 'REJECTED' | 'EXECUTED'} RecommendationState
 * 
 * @typedef {Object} OptimizationRecommendation
 * @property {string} id - Recommendation ID (e.g., 'OPT-REC-402')
 * @property {OptimizationType} type - Recommendation strategy
 * @property {string} title - Executive summary
 * @property {string} description - Operational action plan
 * @property {string} trainId - Target primary train ID
 * @property {string|null} conflictingTrainId - Secondary train ID involved in conflict
 * @property {string} targetSectionId - Section where maneuver takes place
 * @property {number} delayReductionMinutes - Projected delay saved across network
 * @property {number} confidenceScore - AI algorithmic confidence (0.0 to 1.0)
 * @property {RecommendationState} state - Action status by dispatcher
 * @property {string} generatedAt - ISO timestamp
 */

export const RecommendationType = {
  PRECEDENCE_OVERTAKE: 'PRECEDENCE_OVERTAKE',
  SPEED_REGULATION: 'SPEED_REGULATION',
  PLATFORM_REALLOCATION: 'PLATFORM_REALLOCATION',
  CORRIDOR_REROUTE: 'CORRIDOR_REROUTE',
};

export const RecommendationStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  EXECUTED: 'EXECUTED',
};
