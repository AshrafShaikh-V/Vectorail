/**
 * @typedef {'CLEAR' | 'OCCUPIED' | 'MAINTENANCE_BLOCKED' | 'SIGNAL_RESTRICTED'} SectionTrackState
 * 
 * @typedef {Object} RailwaySection
 * @property {string} id - Section unique code (e.g., 'SEC-NDLS-GZB-01')
 * @property {string} sectionCode - Human-readable label
 * @property {string} fromStationId - Starting boundary station
 * @property {string} toStationId - Ending boundary station
 * @property {number} lengthKm - Distance in kilometers
 * @property {number} maxPermissibleSpeed - Maximum permitted speed in km/h
 * @property {boolean} isElectrified - Overhead traction status
 * @property {number} totalTracks - Single / Double / Multiple tracks
 * @property {SectionTrackState} status - Real-time occupancy state
 * @property {string|null} activeTrainId - Train currently traversing this block
 * @property {string} signalAspect - Current aspect: 'GREEN' | 'DOUBLE_YELLOW' | 'YELLOW' | 'RED'
 */

export const TrackState = {
  CLEAR: 'CLEAR',
  OCCUPIED: 'OCCUPIED',
  MAINTENANCE_BLOCKED: 'MAINTENANCE_BLOCKED',
  SIGNAL_RESTRICTED: 'SIGNAL_RESTRICTED',
};

export const SignalAspect = {
  GREEN: 'GREEN',
  DOUBLE_YELLOW: 'DOUBLE_YELLOW',
  YELLOW: 'YELLOW',
  RED: 'RED',
};
