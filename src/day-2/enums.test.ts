import {
  OrderStatus,
  Order,
  Figure,
  canCancelOrder,
  getNextStatus,
  getOrderSummary,
  isCircle,
  isSquare,
  describeFigure
} from './enums';

describe('Ejercicio 3: Enums y Type Guards', () => {

  // ── Enums ──
  describe('canCancelOrder', () => {
    test('should allow cancelling pending order', () => {
      const order: Order = { id: '1', status: OrderStatus.Pending, total: 100 };
      expect(canCancelOrder(order)).toBe(true);
    });

    test('should allow cancelling processing order', () => {
      const order: Order = { id: '2', status: OrderStatus.Processing, total: 50 };
      expect(canCancelOrder(order)).toBe(true);
    });

    test('should NOT allow cancelling shipped order', () => {
      const order: Order = { id: '3', status: OrderStatus.Shipped, total: 75 };
      expect(canCancelOrder(order)).toBe(false);
    });

    test('should NOT allow cancelling delivered order', () => {
      const order: Order = { id: '4', status: OrderStatus.Delivered, total: 200 };
      expect(canCancelOrder(order)).toBe(false);
    });

    test('should NOT allow cancelling already cancelled order', () => {
      const order: Order = { id: '5', status: OrderStatus.Cancelled, total: 30 };
      expect(canCancelOrder(order)).toBe(false);
    });
  });

  describe('getNextStatus', () => {
    test('Pending should go to Processing', () => {
      expect(getNextStatus(OrderStatus.Pending)).toBe(OrderStatus.Processing);
    });

    test('Processing should go to Shipped', () => {
      expect(getNextStatus(OrderStatus.Processing)).toBe(OrderStatus.Shipped);
    });

    test('Shipped should go to Delivered', () => {
      expect(getNextStatus(OrderStatus.Shipped)).toBe(OrderStatus.Delivered);
    });

    test('Delivered should stay Delivered', () => {
      expect(getNextStatus(OrderStatus.Delivered)).toBe(OrderStatus.Delivered);
    });

    test('Cancelled should stay Cancelled', () => {
      expect(getNextStatus(OrderStatus.Cancelled)).toBe(OrderStatus.Cancelled);
    });
  });

  describe('getOrderSummary', () => {
    test('should format order summary', () => {
      const order: Order = { id: '123', status: OrderStatus.Pending, total: 99.9 };
      expect(getOrderSummary(order)).toBe('Order #123 - Status: PENDING - Total: $99.90');
    });

    test('should handle whole number total', () => {
      const order: Order = { id: '456', status: OrderStatus.Shipped, total: 50 };
      expect(getOrderSummary(order)).toBe('Order #456 - Status: SHIPPED - Total: $50.00');
    });
  });

  // ── Type Guards ──
  describe('isCircle', () => {
    test('should return true for circle', () => {
      expect(isCircle({ kind: 'circle', radius: 5 })).toBe(true);
    });

    test('should return false for square', () => {
      expect(isCircle({ kind: 'square', side: 5 })).toBe(false);
    });
  });

  describe('isSquare', () => {
    test('should return true for square', () => {
      expect(isSquare({ kind: 'square', side: 5 })).toBe(true);
    });

    test('should return false for circle', () => {
      expect(isSquare({ kind: 'circle', radius: 5 })).toBe(false);
    });
  });

  describe('describeFigure', () => {
    test('should describe circle', () => {
      expect(describeFigure({ kind: 'circle', radius: 5 }))
        .toBe('Circle with radius 5');
    });

    test('should describe square', () => {
      expect(describeFigure({ kind: 'square', side: 10 }))
        .toBe('Square with side 10');
    });
  });
});
