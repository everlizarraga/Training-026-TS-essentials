import { calculateArea, createUser, mergeConfig, describeProduct } from './object-types';

describe('Ejercicio 3: Object Types', () => {

  // Tests para calculateArea
  describe('calculateArea', () => {
    test('should calculate area of rectangle', () => {
      expect(calculateArea({ width: 5, height: 3 })).toBe(15);
    });

    test('should handle square', () => {
      expect(calculateArea({ width: 10, height: 10 })).toBe(100);
    });

    test('should handle decimals', () => {
      expect(calculateArea({ width: 2.5, height: 4 })).toBe(10);
    });
  });

  // Tests para createUser
  describe('createUser', () => {
    test('should create user with email', () => {
      expect(createUser('Alice', 25, 'alice@mail.com')).toEqual({
        name: 'Alice',
        age: 25,
        email: 'alice@mail.com'
      });
    });

    test('should create user without email', () => {
      expect(createUser('Bob', 30)).toEqual({
        name: 'Bob',
        age: 30,
        email: 'no-email'
      });
    });
  });

  // Tests para mergeConfig
  describe('mergeConfig', () => {
    test('should merge configs with config2 priority', () => {
      const result = mergeConfig(
        { url: 'http://old.com', timeout: 3000 },
        { url: 'http://new.com' }
      );
      expect(result.url).toBe('http://new.com');
      expect(result.timeout).toBe(3000);
    });

    test('should override timeout from config2', () => {
      const result = mergeConfig(
        { url: 'http://api.com', timeout: 3000 },
        { url: 'http://api.com', timeout: 5000 }
      );
      expect(result.timeout).toBe(5000);
    });

    test('should work with minimal configs', () => {
      const result = mergeConfig(
        { url: 'http://a.com' },
        { url: 'http://b.com' }
      );
      expect(result.url).toBe('http://b.com');
    });
  });

  // Tests para describeProduct
  describe('describeProduct', () => {
    test('should describe in-stock product', () => {
      expect(describeProduct({ name: 'Laptop', price: 999.9, inStock: true }))
        .toBe('Laptop - $999.90 (Available)');
    });

    test('should describe out-of-stock product', () => {
      expect(describeProduct({ name: 'Mouse', price: 25, inStock: false }))
        .toBe('Mouse - $25.00 (Out of Stock)');
    });

    test('should handle zero price', () => {
      expect(describeProduct({ name: 'Free Item', price: 0, inStock: true }))
        .toBe('Free Item - $0.00 (Available)');
    });
  });
});
