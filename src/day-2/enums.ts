// ============================================
// EJERCICIO 3: Enums y Type Guards
// ============================================

// TODO: Definir enum OrderStatus con valores string
// PENDING = 'PENDING'
// PROCESSING = 'PROCESSING'
// SHIPPED = 'SHIPPED'
// DELIVERED = 'DELIVERED'
// CANCELLED = 'CANCELLED'

export enum OrderStatus {
  // TU CÓDIGO AQUÍ
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Shipped = 'SHIPPED',
  Delivered = 'DELIVERED',
  Cancelled = 'CANCELLED'
}


// TODO: Definir interface Order
// Propiedades: id (string), status (OrderStatus), total (number)

export interface Order {
  // TU CÓDIGO AQUÍ
  readonly id: string;
  status: OrderStatus;
  total: number;
}


// TODO: Función que verifica si un pedido puede cancelarse
//
// DEBE:
// - Solo PENDING y PROCESSING pueden cancelarse
// - SHIPPED, DELIVERED y CANCELLED NO pueden cancelarse
//
// Ejemplo:
//   canCancelOrder({ id: '1', status: OrderStatus.Pending, total: 100 }) → true
//   canCancelOrder({ id: '2', status: OrderStatus.Shipped, total: 50 })  → false

export function canCancelOrder(order: Order): boolean {
  // TU CÓDIGO AQUÍ
  const puedenCancelarse: OrderStatus[] = [
    OrderStatus.Pending, 
    OrderStatus.Processing
  ];
  return puedenCancelarse.includes(order.status);
}


// TODO: Función que retorna el siguiente estado del pedido
//
// Flujo: PENDING → PROCESSING → SHIPPED → DELIVERED
// Si el estado es DELIVERED o CANCELLED, retornar el mismo estado (no cambia)
//
// Ejemplo:
//   getNextStatus(OrderStatus.Pending)    → OrderStatus.Processing
//   getNextStatus(OrderStatus.Delivered)  → OrderStatus.Delivered

export function getNextStatus(status: OrderStatus): OrderStatus {
  // TU CÓDIGO AQUÍ
  switch (status) {
    case OrderStatus.Pending:
      return OrderStatus.Processing;
    case OrderStatus.Processing:
      return OrderStatus.Shipped;
    case OrderStatus.Shipped:
      return OrderStatus.Delivered;
    case OrderStatus.Delivered:
      return status;
    case OrderStatus.Cancelled:
      return status;
    default:
      const _never: never = status;
      return _never;
  }
}


// TODO: Función que retorna un resumen del pedido como string
//
// Formato: "Order #[id] - Status: [status] - Total: $[total con 2 decimales]"
//
// Ejemplo:
//   getOrderSummary({ id: '123', status: OrderStatus.Pending, total: 99.9 })
//   → 'Order #123 - Status: PENDING - Total: $99.90'

export function getOrderSummary(order: Order): string {
  // TU CÓDIGO AQUÍ
  return `Order #${order.id} - Status: ${order.status} - Total: $${order.total.toFixed(2)}`;
}


// ============================================
// TYPE GUARDS
// ============================================

// TODO: Definir types para un sistema de figuras
//
// interface Circle: kind 'circle', radius (number)
// interface Square: kind 'square', side (number)
// type Figure = Circle | Square

export interface Circle {
  // TU CÓDIGO AQUÍ
  kind: 'circle';
  radius: number;
}

export interface Square {
  // TU CÓDIGO AQUÍ
  kind: 'square';
  side: number;
}

export type Figure = Circle | Square;


// TODO: Type guard que verifica si una Figure es Circle
//
// DEBE:
// - Retornar "figure is Circle" (type predicate)
// - Verificar que kind sea 'circle'

export function isCircle(figure: Figure): figure is Circle {
  // TU CÓDIGO AQUÍ
  return figure.kind === 'circle';
  
}


// TODO: Type guard que verifica si una Figure es Square

export function isSquare(figure: Figure): figure is Square {
  // TU CÓDIGO AQUÍ
  return figure.kind === 'square';
}


// TODO: Función que describe una figura usando los type guards
//
// DEBE:
// - Usar isCircle e isSquare para determinar el tipo
// - Circle → "Circle with radius [radius]"
// - Square → "Square with side [side]"
//
// Ejemplo:
//   describeFigure({ kind: 'circle', radius: 5 })
//   → 'Circle with radius 5'

export function describeFigure(figure: Figure): string {
  // TU CÓDIGO AQUÍ
  if(isCircle(figure)) {
    return `Circle with radius ${figure.radius}`;
  }
  return `Square with side ${figure.side}`;
}
