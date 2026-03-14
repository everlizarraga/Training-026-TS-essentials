import { filterEven, minMax, formatPerson, sumAll } from './arrays-tuples';

describe('Ejercicio 2: Arrays y Tuples', () => {

  // Tests para filterEven
  describe('filterEven', () => {
    test('should return only even numbers', () => {
      expect(filterEven([1, 2, 3, 4, 5])).toEqual([2, 4]);
    });

    test('should return empty array when no evens', () => {
      expect(filterEven([1, 3, 5])).toEqual([]);
    });

    test('should handle empty array', () => {
      expect(filterEven([])).toEqual([]);
    });

    test('should handle all even numbers', () => {
      expect(filterEven([2, 4, 6])).toEqual([2, 4, 6]);
    });
  });

  // Tests para minMax
  describe('minMax', () => {
    test('should return [min, max]', () => {
      expect(minMax([3, 1, 4, 1, 5, 9])).toEqual([1, 9]);
    });

    test('should handle single element', () => {
      expect(minMax([5])).toEqual([5, 5]);
    });

    test('should handle negative numbers', () => {
      expect(minMax([-5, -1, -10, 0])).toEqual([-10, 0]);
    });

    test('should handle already sorted', () => {
      expect(minMax([1, 2, 3])).toEqual([1, 3]);
    });
  });

  // Tests para formatPerson
  describe('formatPerson', () => {
    test('should format person tuple', () => {
      expect(formatPerson(['Alice', 25])).toBe('Alice (25)');
    });

    test('should format another person', () => {
      expect(formatPerson(['Bob', 30])).toBe('Bob (30)');
    });
  });

  // Tests para sumAll
  describe('sumAll', () => {
    test('should sum all numbers', () => {
      expect(sumAll([1, 2, 3, 4])).toBe(10);
    });

    test('should return 0 for empty array', () => {
      expect(sumAll([])).toBe(0);
    });

    test('should handle single number', () => {
      expect(sumAll([5])).toBe(5);
    });

    test('should handle negative numbers', () => {
      expect(sumAll([10, -5, 3])).toBe(8);
    });
  });
});
