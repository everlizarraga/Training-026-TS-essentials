// ============================================
// EJERCICIO 2: Type Aliases y Unions
// ============================================

// TODO: Definir type UserRole (union de string literals)
// Valores posibles: 'admin', 'user', 'guest'

export type UserRole = 'admin' | 'user' | 'guest';// TU CÓDIGO AQUÍ


// TODO: Definir type User
// Propiedades: id (string), name (string), role (UserRole)

export type User = {
  // TU CÓDIGO AQUÍ
  id: string;
  name: string;
  role: UserRole;
};


// TODO: Función que verifica si un user es admin
//
// Ejemplo:
//   isAdmin({ id: '1', name: 'Alice', role: 'admin' }) → true
//   isAdmin({ id: '2', name: 'Bob', role: 'user' })    → false

export function isAdmin(user: User): boolean {
  // TU CÓDIGO AQUÍ
  return user.role === 'admin';
}


// TODO: Función que retorna los permisos según el rol
//
// DEBE:
// - admin  → ['read', 'write', 'delete']
// - user   → ['read', 'write']
// - guest  → ['read']
//
// Ejemplo:
//   getPermissions('admin') → ['read', 'write', 'delete']

export function getPermissions(role: UserRole): string[] {
  // TU CÓDIGO AQUÍ
  switch (role) {
    case 'admin':
      return ['read', 'write', 'delete'];
    case 'user':
      return ['read', 'write'];
    case 'guest':
      return ['read'];
    default:
      return [];
  }
}


// TODO: Definir discriminated union PaymentMethod
//
// Tres variantes:
// - { type: 'card'; cardNumber: string; cvv: string }
// - { type: 'paypal'; email: string }
// - { type: 'bitcoin'; walletAddress: string }

export type PaymentMethod =
  // TU CÓDIGO AQUÍ
  | { type: 'card'; cardNumber: string; cvv: string }
  | { type: 'paypal'; email: string }
  | { type: 'bitcoin'; walletAddress: string };


// TODO: Función que procesa un pago
//
// DEBE usar switch sobre payment.type
// Retornar un string descriptivo según el tipo:
// - card    → "Processing card ending in XXXX" (últimos 4 dígitos)
// - paypal  → "Processing PayPal payment for [email]"
// - bitcoin → "Processing Bitcoin payment to [walletAddress]"
//
// Ejemplo:
//   processPayment({ type: 'card', cardNumber: '1234567890', cvv: '123' })
//   → 'Processing card ending in 7890'

export function processPayment(payment: PaymentMethod): string {
  // TU CÓDIGO AQUÍ
  switch (payment.type) {
    case 'card':
      return `Processing card ending in ${payment.cardNumber
        .split('').reverse().slice(0,4).reverse().join('')}`;
    case 'paypal':
      return `Processing PayPal payment for ${payment.email}`;
    case 'bitcoin':
      return `Processing Bitcoin payment to ${payment.walletAddress}`;
    default:
      const _nuncaLlega: never = payment
      return _nuncaLlega;
  }
}


// TODO: Definir tipos para un sistema de formas (shapes)
//
// Discriminated union Shape con:
// - { kind: 'circle'; radius: number }
// - { kind: 'rectangle'; width: number; height: number }
// - { kind: 'triangle'; base: number; height: number }

export type Shape =
  // TU CÓDIGO AQUÍ
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

// TODO: Función que calcula el área de cualquier Shape
//
// Fórmulas:
// - circle:    Math.PI * radius * radius
// - rectangle: width * height
// - triangle:  (base * height) / 2
//
// Ejemplo:
//   calculateArea({ kind: 'circle', radius: 5 }) → 78.539...
//   calculateArea({ kind: 'rectangle', width: 4, height: 3 }) → 12

export function calculateArea(shape: Shape): number {
  // TU CÓDIGO AQUÍ
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius * shape.radius;
    case 'rectangle':
      return shape.height * shape.width;
    case 'triangle':
      return (shape.base * shape.height) / 2;
    default:
      const _nuncaLlega: never = shape;
      return _nuncaLlega;
  }
}
