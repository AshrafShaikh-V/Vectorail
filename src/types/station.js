/**
 * @typedef {Object} StationPlatform
 * @property {number} platformNumber
 * @property {boolean} isOccupied
 * @property {string|null} occupiedByTrainId
 * @property {number} lengthMeters
 */

/**
 * @typedef {Object} Station
 * @property {string} id - Station code / ID (e.g., 'NDLS')
 * @property {string} code - Official railway alpha code (e.g., 'NDLS', 'CNB')
 * @property {string} name - Full station name
 * @property {string} division - Railway division
 * @property {string} zone - Railway zone (e.g., 'NR', 'NCR')
 * @property {number} totalTracks - Number of track lines through station
 * @property {number} totalPlatforms - Total platform count
 * @property {StationPlatform[]} platforms - Platform statuses
 * @property {{ lat: number, lng: number }} coordinates - Geo coordinates for network maps
 * @property {'NORMAL' | 'CONGESTED' | 'HALTED'} operationalState
 */

export const StationState = {
  NORMAL: 'NORMAL',
  CONGESTED: 'CONGESTED',
  HALTED: 'HALTED',
};
