/**
 * Service for automated train routing, speed regulation, and precedence recommendations.
 */
export const optimizationService = {
  /**
   * Get active AI-generated dispatch recommendations
   * @returns {Promise<import('../types/optimization').OptimizationRecommendation[]>}
   */
  async getRecommendations() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'OPT-REC-401',
            type: 'PRECEDENCE_OVERTAKE',
            title: 'Overtake Freight BTPN-8812 at Tundla Loop Track 4',
            description: 'Hold Freight BTPN-8812 on Loop 4 at TDL to allow Vande Bharat 22436 clear block passage, preventing a 14-minute cascade delay.',
            trainId: 'TRN-22436',
            conflictingTrainId: 'TRN-FRT-901',
            targetSectionId: 'SEC-ALJN-TDL-01',
            delayReductionMinutes: 14,
            confidenceScore: 0.94,
            state: 'PENDING',
            generatedAt: new Date(Date.now() - 5 * 60000).toISOString(),
          },
        ]);
      }, 160);
    });
  },

  /**
   * Apply recommendation decision
   * @param {string} recId
   * @param {'ACCEPTED' | 'REJECTED'} action
   */
  async decideRecommendation(recId, action) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          recommendationId: recId,
          state: action,
          decidedAt: new Date().toISOString(),
        });
      }, 150);
    });
  },
};
