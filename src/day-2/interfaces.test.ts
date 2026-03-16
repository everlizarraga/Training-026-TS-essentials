import {
  Product,
  CartItem,
  DiscountFunction,
  calculateCartTotal,
  applyDiscountToProduct,
  filterByPriceRange
} from './interfaces';

describe('Ejercicio 1: Interfaces', () => {

  // Datos de prueba reutilizables
  const laptop: Product = { id: '1', name: 'Laptop', price: 1000, category: 'tech' };
  const mouse: Product = { id: '2', name: 'Mouse', price: 25, category: 'tech' };
  const book: Product = { id: '3', name: 'Book', price: 15, category: 'books' };
  const phone: Product = { id: '4', name: 'Phone', price: 800, category: 'tech' };

  describe('calculateCartTotal', () => {
    test('should calculate total with multiple items', () => {
      const cart: CartItem[] = [
        { ...laptop, quantity: 1 },
        { ...mouse, quantity: 2 }
      ];
      expect(calculateCartTotal(cart)).toBe(1050);
    });

    test('should return 0 for empty cart', () => {
      expect(calculateCartTotal([])).toBe(0);
    });

    test('should handle single item', () => {
      const cart: CartItem[] = [{ ...laptop, quantity: 3 }];
      expect(calculateCartTotal(cart)).toBe(3000);
    });
  });

  describe('applyDiscountToProduct', () => {
    const halfOff: DiscountFunction = (price) => price * 0.5;
    const tenOff: DiscountFunction = (price) => price - 10;

    test('should apply percentage discount', () => {
      const result = applyDiscountToProduct(laptop, halfOff);
      expect(result.price).toBe(500);
      expect(result.name).toBe('Laptop');
    });

    test('should apply fixed discount', () => {
      const result = applyDiscountToProduct(mouse, tenOff);
      expect(result.price).toBe(15);
    });

    test('should NOT modify original product', () => {
      applyDiscountToProduct(laptop, halfOff);
      expect(laptop.price).toBe(1000); // Original sin modificar
    });
  });

  describe('filterByPriceRange', () => {
    const products = [laptop, mouse, book, phone];

    test('should filter products in range', () => {
      const result = filterByPriceRange(products, 20, 900);
      expect(result).toEqual([mouse, phone]);
    });

    test('should include boundary values', () => {
      const result = filterByPriceRange(products, 25, 800);
      expect(result).toEqual([mouse, phone]);
    });

    test('should return empty if none match', () => {
      const result = filterByPriceRange(products, 2000, 5000);
      expect(result).toEqual([]);
    });

    test('should return all if range covers everything', () => {
      const result = filterByPriceRange(products, 0, 10000);
      expect(result).toEqual(products);
    });
  });
});
