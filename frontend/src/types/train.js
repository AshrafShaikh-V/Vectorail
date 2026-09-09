/**
 * @typedef {'OPERATIONAL' | 'DELAYED' | 'CRITICAL' | 'HOLD' | 'MAINTENANCE'} TrainOperationalStatus
 * @typedef {'PASSENGER' | 'FREIGHT' | 'EXPRESS' | 'SUPERFAST' | 'HIGH_SPEED'} TrainCategory
 * 
 * @typedef {Object} Train
 * @property {string} id - Unique identifier (e.g., 'TRN-12001')
 * @property {string} trainNumber - Railway number (e.g., '12001')
 * @property {string} name - Official train name (e.g., 'Bhopal Shatabdi Express')
 * @property {TrainCategory} category - Train class/category
 * @property {string} originStationId - Starting station ID
 * @property {string} destinationStationId - Terminus station ID
 * @property {string} currentSectionId - Section currently occupied
 * @property {number} speedKmph - Real-time speed in km/h
 * @property {number} maxAllowedSpeed - Section speed limit in km/h
 * @property {TrainOperationalStatus} status - Operational state
 * @property {number} delayMinutes - Minutes behind scheduled timetable
 * @property {number} priorityLevel - Priority index (1 = Highest, 5 = Lowest)
 * @property {string} lastUpdated - ISO 8601 timestamp
 */

export const TrainStatus = {
  OPERATIONAL: 'OPERATIONAL',
  DELAYED: 'DELAYED',
  CRITICAL: 'CRITICAL',
  HOLD: 'HOLD',
  MAINTENANCE: 'MAINTENANCE',
};

export const TrainCategories = {
  PASSENGER: 'PASSENGER',
  FREIGHT: 'FREIGHT',
  EXPRESS: 'EXPRESS',
  SUPERFAST: 'SUPERFAST',
  HIGH_SPEED: 'HIGH_SPEED',
};
