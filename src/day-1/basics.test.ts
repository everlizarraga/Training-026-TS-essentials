import { validateEmail, formatPrice, applyDiscount } from './basics';

describe('Ejercicio 1: Type Annotations', () => {

  // Tests para validateEmail
  describe('validateEmail', () => {
    test('should return true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    test('should return true for another valid email', () => {
      expect(validateEmail('user@domain.org')).toBe(true);
    });

    test('should return false for string without @', () => {
      expect(validateEmail('invalid.com')).toBe(false);
    });

    test('should return false for string without .', () => {
      expect(validateEmail('invalid@com')).toBe(false);
    });

    test('should return false for empty string', () => {
      expect(validateEmail('')).toBe(false);
    });
  });

  // Tests para formatPrice
  describe('formatPrice', () => {
    test('should format price with decimals', () => {
      expect(formatPrice(19.99)).toBe('$19.99');
    });

    test('should add .00 to whole numbers', () => {
      expect(formatPrice(100)).toBe('$100.00');
    });

    test('should handle zero', () => {
      expect(formatPrice(0)).toBe('$0.00');
    });

    test('should round to 2 decimals', () => {
      expect(formatPrice(19.999)).toBe('$20.00');
    });
  });

  // Tests para applyDiscount
  describe('applyDiscount', () => {
    test('should apply discount percentage', () => {
      expect(applyDiscount(100, 10)).toBe(90);
    });

    test('should apply 50% discount', () => {
      expect(applyDiscount(200, 50)).toBe(100);
    });

    test('should return original price without discount', () => {
      expect(applyDiscount(100)).toBe(100);
    });

    test('should handle zero discount', () => {
      expect(applyDiscount(100, 0)).toBe(100);
    });
  });
});
