/**
 * Utilidades de formateo de fechas para el sistema de reportes Cypress.
 *
 * Proporciona funciones consistentes de formateo de fechas utilizadas en toda la aplicación.
 */

/**
 * Formats a date string into a localized Spanish date format.
 *
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} Formatted date string in Spanish locale
 *
 * @example
 * ```js
 * formatDate('2024-01-15') // Returns '15 ene 2024' (Spanish)
 * ```
 */
export function formatDate(dateString) {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Formats a date and time string into a localized format.
 *
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @param {string} timeString - Time string in HH-MM-SS format
 * @returns {string} Formatted date and time string
 *
 * @example
 * ```js
 * formatDateTime('2024-01-15', '14-30-25') // Returns '15 ene 2024, 14:30:25'
 * ```
 */
export function formatDateTime(dateString, timeString) {
  if (!dateString) return '';

  const formattedDate = formatDate(dateString);
  if (!timeString) return formattedDate;

  try {
    // Convert HH-MM-SS to HH:MM:SS
    const formattedTime = timeString.replace(/-/g, ':');
    return `${formattedDate}, ${formattedTime}`;
  } catch (error) {
    console.error('Error formatting date time:', error);
    return `${formattedDate} ${timeString}`;
  }
}

/**
 * Checks if a date string is within a date range.
 *
 * @param {string} dateString - Date string to check
 * @param {string} fromDate - Start date of range (inclusive)
 * @param {string} toDate - End date of range (inclusive)
 * @returns {boolean} Whether the date is within the range
 *
 * @example
 * ```js
 * isDateInRange('2024-01-15', '2024-01-01', '2024-01-31') // Returns true
 * ```
 */
export function isDateInRange(dateString, fromDate, toDate) {
  if (!dateString) return false;

  const date = new Date(dateString);
  const from = fromDate ? new Date(fromDate) : new Date('1900-01-01');
  const to = toDate ? new Date(toDate) : new Date('2100-12-31');

  return date >= from && date <= to;
}

/**
 * Gets the current date in YYYY-MM-DD format.
 *
 * @returns {string} Current date string
 *
 * @example
 * ```js
 * getCurrentDate() // Returns '2024-01-15'
 * ```
 */
export function getCurrentDate() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/**
 * Gets the current date and time in a formatted string.
 *
 * @returns {string} Current date and time string
 *
 * @example
 * ```js
 * getCurrentDateTime() // Returns '2024-01-15 14:30:25'
 * ```
 */
export function getCurrentDateTime() {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '-');
  return `${date} ${time}`;
}