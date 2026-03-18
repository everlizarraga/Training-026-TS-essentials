import {
  swap,
  filterArray,
  mapArray,
  findById,
  getProperty,
  mergeUpdate
} from './generics-basics';

describe('Ejercicio 1: Funciones Genéricas', () => {

  describe('swap', () => {
    test('should swap number and string', () => {
      expect(swap(1, 'hello')).toEqual(['hello', 1]);
    });

    test('should swap boolean and number', () => {
      expect(swap(true, 42)).toEqual([42, true]);
    });

    test('should swap strings', () => {
      expect(swap('a', 'b')).toEqual(['b', 'a']);
    });
  });

  describe('filterArray', () => {
    test('should filter numbers', () => {
      expect(filterArray([1, 2, 3, 4, 5], n => n > 3)).toEqual([4, 5]);
    });

    test('should filter strings by length', () => {
      expect(filterArray(['hello', 'hi', 'hey'], s => s.length > 2))
        .toEqual(['hello', 'hey']);
    });

    test('should return empty array when nothing matches', () => {
      expect(filterArray([1, 2, 3], n => n > 10)).toEqual([]);
    });

    test('should handle empty array', () => {
      expect(filterArray([], () => true)).toEqual([]);
    });
  });

  describe('mapArray', () => {
    test('should map numbers to strings', () => {
      expect(mapArray([1, 2, 3], n => n.toString())).toEqual(['1', '2', '3']);
    });

    test('should map strings to lengths', () => {
      expect(mapArray(['hello', 'hi'], s => s.length)).toEqual([5, 2]);
    });

    test('should map numbers to booleans', () => {
      expect(mapArray([1, 2, 3], n => n > 1)).toEqual([false, true, true]);
    });

    test('should handle empty array', () => {
      expect(mapArray([], (x: number) => x * 2)).toEqual([]);
    });
  });

  describe('findById', () => {
    const users = [
      { id: '1', name: 'Alice', age: 25 },
      { id: '2', name: 'Bob', age: 30 },
      { id: '3', name: 'Charlie', age: 35 }
    ];

    test('should find existing item', () => {
      expect(findById(users, '1')).toEqual({ id: '1', name: 'Alice', age: 25 });
    });

    test('should return undefined for non-existing id', () => {
      expect(findById(users, '99')).toBeUndefined();
    });

    test('should work with different object shapes', () => {
      const products = [
        { id: 'p1', name: 'Laptop', price: 999 },
        { id: 'p2', name: 'Mouse', price: 25 }
      ];
      expect(findById(products, 'p2')).toEqual({ id: 'p2', name: 'Mouse', price: 25 });
    });
  });

  describe('getProperty', () => {
    const user = { name: 'Alice', age: 25, active: true };

    test('should get string property', () => {
      expect(getProperty(user, 'name')).toBe('Alice');
    });

    test('should get number property', () => {
      expect(getProperty(user, 'age')).toBe(25);
    });

    test('should get boolean property', () => {
      expect(getProperty(user, 'active')).toBe(true);
    });
  });

  describe('mergeUpdate', () => {
    test('should merge partial updates', () => {
      const original = { name: 'Alice', age: 25 };
      const result = mergeUpdate(original, { age: 26 });
      expect(result).toEqual({ name: 'Alice', age: 26 });
    });

    test('should not modify original', () => {
      const original = { name: 'Alice', age: 25 };
      mergeUpdate(original, { age: 26 });
      expect(original.age).toBe(25);
    });

    test('should handle empty updates', () => {
      const original = { name: 'Alice', age: 25 };
      const result = mergeUpdate(original, {});
      expect(result).toEqual({ name: 'Alice', age: 25 });
    });

    test('should handle multiple updates', () => {
      const original = { name: 'Alice', age: 25, active: true };
      const result = mergeUpdate(original, { name: 'Bob', active: false });
      expect(result).toEqual({ name: 'Bob', age: 25, active: false });
    });
  });
});
