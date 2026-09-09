/**
 * @typedef {'SECTION_CONTROLLER' | 'CHIEF_DISPATCHER' | 'TRAFFIC_MANAGER' | 'STATION_MASTER' | 'ADMINISTRATOR'} UserRole
 * 
 * @typedef {Object} User
 * @property {string} id - Operator ID (e.g., 'OP-NR-882')
 * @property {string} employeeId - Formal railway badge / employee ID
 * @property {string} name - Full Name
 * @property {string} email - Work email address
 * @property {UserRole} role - Operations authorization role
 * @property {string} assignedDivision - Operating division (e.g., 'Delhi Division')
 * @property {string} assignedZone - Operating zone (e.g., 'Northern Railway')
 * @property {string} deskLocation - Operations control center desk (e.g., 'Console 4 - Main Line')
 * @property {string} lastLogin - ISO timestamp
 */

export const UserRoles = {
  SECTION_CONTROLLER: 'SECTION_CONTROLLER',
  CHIEF_DISPATCHER: 'CHIEF_DISPATCHER',
  TRAFFIC_MANAGER: 'TRAFFIC_MANAGER',
  STATION_MASTER: 'STATION_MASTER',
  ADMINISTRATOR: 'ADMINISTRATOR',
};
