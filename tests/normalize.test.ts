const { detectDateFormat, parseDateString, formatDate } = require('../src/normalize');

describe('Date Normalization', () => {
  describe('detectDateFormat', () => {
    test('detects ISO format', () => {
      expect(detectDateFormat('2024-03-15')).toBe('ISO');
    });

    test('detects US format', () => {
      expect(detectDateFormat('03/15/2024')).toBe('US');
    });

    test('detects EU format', () => {
      expect(detectDateFormat('15/03/2024')).toBe('EU');
    });

    test('detects verbose format', () => {
      expect(detectDateFormat('March 15, 2024')).toBe('VERBOSE');
    });

    test('returns null for invalid format', () => {
      expect(detectDateFormat('invalid-date')).toBeNull();
    });
  });

  describe('parseDateString', () => {
    test('parses ISO format correctly', () => {
      const result = parseDateString('2024-03-15');
      expect(result).toEqual({
        year: 2024,
        month: 3,
        day: 15
      });
    });

    test('parses US format correctly', () => {
      const result = parseDateString('03/15/2024');
      expect(result).toEqual({
        year: 2024,
        month: 3,
        day: 15
      });
    });

    test('parses EU format correctly', () => {
      const result = parseDateString('15/03/2024');
      expect(result).toEqual({
        year: 2024,
        month: 3,
        day: 15
      });
    });

    test('parses verbose format correctly', () => {
      const result = parseDateString('March 15, 2024');
      expect(result).toEqual({
        year: 2024,
        month: 3,
        day: 15
      });
    });

    test('throws error for invalid date', () => {
      expect(() => parseDateString('invalid-date')).toThrow();
    });
  });

  describe('formatDate', () => {
    const testDate = {
      year: 2024,
      month: 3,
      day: 15
    };

    test('formats to ISO correctly', () => {
      expect(formatDate(testDate, 'ISO')).toBe('2024-03-15');
    });

    test('formats to US format correctly', () => {
      expect(formatDate(testDate, 'US')).toBe('03/15/2024');
    });

    test('formats to EU format correctly', () => {
      expect(formatDate(testDate, 'EU')).toBe('15/03/2024');
    });

    test('formats to verbose format correctly', () => {
      expect(formatDate(testDate, 'VERBOSE')).toBe('March 15, 2024');
    });

    test('throws error for invalid format', () => {
      expect(() => formatDate(testDate, 'INVALID')).toThrow();
    });
  });
});
