/**
 * @typedef {'STATION_JUNCTION' | 'TERMINAL' | 'WAYPOINT' | 'SWITCH_CROSSOVER' | 'BLOCK_SIGNAL'} NetworkNodeType
 * 
 * @typedef {Object} NetworkNode
 * @property {string} id - Node identifier (e.g., 'NODE-NDLS-01')
 * @property {string} label - Node display label
 * @property {NetworkNodeType} type - Node classification
 * @property {number} x - Relative canvas/topology X position
 * @property {number} y - Relative canvas/topology Y position
 * @property {number} lat - Real geographic latitude
 * @property {number} lng - Real geographic longitude
 * @property {string[]} connectedNodeIds - Direct topology adjacencies
 * @property {'ACTIVE' | 'CONGESTED' | 'FAULT' | 'OFFLINE'} status
 */

/**
 * @typedef {Object} NetworkEdge
 * @property {string} id - Edge ID
 * @property {string} source - Source node ID
 * @property {string} target - Target node ID
 * @property {number} distanceKm - Edge track length
 * @property {number} capacity - Max trains simultaneously supported
 * @property {number} currentLoad - Current active trains
 */

export const NodeTypes = {
  STATION_JUNCTION: 'STATION_JUNCTION',
  TERMINAL: 'TERMINAL',
  WAYPOINT: 'WAYPOINT',
  SWITCH_CROSSOVER: 'SWITCH_CROSSOVER',
  BLOCK_SIGNAL: 'BLOCK_SIGNAL',
};
