import {
  User,
  UserRole,
  PaymentMethod,
  Shape,
  isAdmin,
  getPermissions,
  processPayment,
  calculateArea
} from './type-aliases';

describe('Ejercicio 2: Type Aliases y Unions', () => {

  describe('isAdmin', () => {
    test('should return true for admin', () => {
      const admin: User = { id: '1', name: 'Alice', role: 'admin' };
      expect(isAdmin(admin)).toBe(true);
    });

    test('should return false for user', () => {
      const user: User = { id: '2', name: 'Bob', role: 'user' };
      expect(isAdmin(user)).toBe(false);
    });

    test('should return false for guest', () => {
      const guest: User = { id: '3', name: 'Charlie', role: 'guest' };
      expect(isAdmin(guest)).toBe(false);
    });
  });

  describe('getPermissions', () => {
    test('admin should have all permissions', () => {
      expect(getPermissions('admin')).toEqual(['read', 'write', 'delete']);
    });

    test('user should have read and write', () => {
      expect(getPermissions('user')).toEqual(['read', 'write']);
    });

    test('guest should have read only', () => {
      expect(getPermissions('guest')).toEqual(['read']);
    });
  });

  describe('processPayment', () => {
    test('should process card payment', () => {
      const result = processPayment({
        type: 'card',
        cardNumber: '1234567890',
        cvv: '123'
      });
      expect(result).toBe('Processing card ending in 7890');
    });

    test('should process paypal payment', () => {
      const result = processPayment({
        type: 'paypal',
        email: 'alice@mail.com'
      });
      expect(result).toBe('Processing PayPal payment for alice@mail.com');
    });

    test('should process bitcoin payment', () => {
      const result = processPayment({
        type: 'bitcoin',
        walletAddress: '1A2b3C4d5E'
      });
      expect(result).toBe('Processing Bitcoin payment to 1A2b3C4d5E');
    });
  });

  describe('calculateArea', () => {
    test('should calculate circle area', () => {
      const area = calculateArea({ kind: 'circle', radius: 5 });
      expect(area).toBeCloseTo(78.5398, 2);
    });

    test('should calculate rectangle area', () => {
      const area = calculateArea({ kind: 'rectangle', width: 4, height: 3 });
      expect(area).toBe(12);
    });

    test('should calculate triangle area', () => {
      const area = calculateArea({ kind: 'triangle', base: 6, height: 4 });
      expect(area).toBe(12);
    });

    test('should handle circle with radius 1', () => {
      const area = calculateArea({ kind: 'circle', radius: 1 });
      expect(area).toBeCloseTo(Math.PI, 4);
    });
  });
});
