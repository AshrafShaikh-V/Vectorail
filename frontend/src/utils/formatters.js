/**
 * Formats speed in km/h with unit
 * @param {number} speed
 * @returns {string}
 */
export function formatSpeed(speed) {
  if (typeof speed !== 'number') return '0 km/h';
  return `${Math.round(speed)} km/h`;
}

/**
 * Formats train timetable delay with operational sign
 * @param {number} delayMinutes
 * @returns {string}
 */
export function formatDelay(delayMinutes) {
  if (!delayMinutes || delayMinutes === 0) return 'On Time';
  if (delayMinutes > 0) return `+${delayMinutes} min`;
  return `${delayMinutes} min`;
}

/**
 * Formats ISO timestamp to short local time (HH:mm:ss)
 * @param {string} isoString
 * @returns {string}
 */
export function formatTime(isoString) {
  if (!isoString) return '--:--';
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}
