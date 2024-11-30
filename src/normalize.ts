/**
 * normalize.ts
 * Core functionality for date string normalization
 */

// Common date format patterns
const DATE_PATTERNS = {
  ISO: /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
  US: /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/, // MM/DD/YYYY
  EU: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, // DD/MM/YYYY
  VERBOSE: /^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/ // Month DD, YYYY
};

interface ParsedDate {
  year: number;
  month: number;
  day: number;
}

/**
 * Detects the format of a given date string
 * @param dateString The date string to analyze
 * @returns The detected format or null if unknown
 */
export function detectDateFormat(dateString: string): string | null {
  for (const [format, pattern] of Object.entries(DATE_PATTERNS)) {
    if (pattern.test(dateString)) {
      return format;
    }
  }
  return null;
}

/**
 * Parses a date string into its component parts
 * @param dateString The date string to parse
 * @param format The format of the date string (optional, will be detected if not provided)
 * @returns ParsedDate object containing year, month, and day
 */
export function parseDateString(dateString: string, format?: string): ParsedDate {
  const detectedFormat = format || detectDateFormat(dateString);
  
  if (!detectedFormat) {
    throw new Error('Unable to detect date format');
  }

  let year: number, month: number, day: number;

  switch (detectedFormat) {
    case 'ISO': {
      const [y, m, d] = dateString.split('-').map(Number);
      year = y;
      month = m;
      day = d;
      break;
    }
    case 'US': {
      const [m, d, y] = dateString.split('/').map(Number);
      year = y;
      month = m;
      day = d;
      break;
    }
    case 'EU': {
      const [d, m, y] = dateString.split('/').map(Number);
      year = y;
      month = m;
      day = d;
      break;
    }
    case 'VERBOSE': {
      const match = dateString.match(DATE_PATTERNS.VERBOSE);
      if (!match) {
        throw new Error('Invalid verbose date format');
      }
      const monthName = match[1];
      day = parseInt(match[2], 10);
      year = parseInt(match[3], 10);
      month = getMonthNumberFromName(monthName);
      break;
    }
    default:
      throw new Error(`Unsupported date format: ${detectedFormat}`);
  }

  validateDateComponents(year, month, day);
  return { year, month, day };
}

/**
 * Formats a parsed date into a specified output format
 * @param parsedDate The parsed date components
 * @param outputFormat Desired output format
 * @returns Formatted date string
 */
export function formatDate(parsedDate: ParsedDate, outputFormat: string): string {
  const { year, month, day } = parsedDate;
  const paddedMonth = month.toString().padStart(2, '0');
  const paddedDay = day.toString().padStart(2, '0');

  switch (outputFormat) {
    case 'ISO':
      return `${year}-${paddedMonth}-${paddedDay}`;
    case 'US':
      return `${paddedMonth}/${paddedDay}/${year}`;
    case 'EU':
      return `${paddedDay}/${paddedMonth}/${year}`;
    case 'VERBOSE':
      return `${getMonthNameFromNumber(month)} ${day}, ${year}`;
    default:
      throw new Error(`Unsupported output format: ${outputFormat}`);
  }
}

/**
 * Validates date components are within valid ranges
 */
function validateDateComponents(year: number, month: number, day: number): void {
  if (year < 1000 || year > 9999) {
    throw new Error('Year must be between 1000 and 9999');
  }
  if (month < 1 || month > 12) {
    throw new Error('Month must be between 1 and 12');
  }
  if (day < 1 || day > 31) {
    throw new Error('Day must be between 1 and 31');
  }
  // Additional validation for days in month could be added here
}

/**
 * Converts month name to number (1-12)
 */
function getMonthNumberFromName(monthName: string): number {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const index = months.findIndex(m => 
    m.toLowerCase() === monthName.toLowerCase()
  );
  if (index === -1) {
    throw new Error(`Invalid month name: ${monthName}`);
  }
  return index + 1;
}

/**
 * Converts month number to name
 */
function getMonthNameFromNumber(month: number): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1];
}
