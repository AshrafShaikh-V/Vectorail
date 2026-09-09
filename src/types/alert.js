/**
 * @typedef {'CRITICAL' | 'WARNING' | 'INFORMATION' | 'OPERATIONAL'} AlertSeverity
 * @typedef {'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED' | 'SUPPRESSED'} AlertStatus
 * @typedef {'SIGNAL' | 'TRACK_CIRCUIT' | 'SPEED_VIOLATION' | 'WEATHER' | 'TRACTION' | 'CONGESTION'} AlertCategory
 * 
 * @typedef {Object} Alert
 * @property {string} id - Unique alert ID (e.g., 'ALT-9821')
 * @property {string} code - System rule code (e.g., 'SIG_FAIL_04')
 * @property {string} title - Brief headline
 * @property {string} description - Detailed alert message
 * @property {AlertSeverity} severity - Criticality level
 * @property {AlertCategory} category - System domain
 * @property {AlertStatus} status - Lifecycle status
 * @property {string|null} sectionId - Associated section if localized
 * @property {string|null} trainId - Associated train if applicable
 * @property {string|null} stationId - Associated station if applicable
 * @property {string} timestamp - ISO timestamp of trigger
 * @property {string|null} acknowledgedBy - Operator ID
 * @property {string|null} acknowledgedAt - ISO timestamp of acknowledgment
 */

export const AlertSeverityLevels = {
  CRITICAL: 'CRITICAL',
  WARNING: 'WARNING',
  INFORMATION: 'INFORMATION',
  OPERATIONAL: 'OPERATIONAL',
};

export const AlertStatusTypes = {
  ACTIVE: 'ACTIVE',
  ACKNOWLEDGED: 'ACKNOWLEDGED',
  RESOLVED: 'RESOLVED',
  SUPPRESSED: 'SUPPRESSED',
};
