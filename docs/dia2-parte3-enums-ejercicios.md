# DÍA 2 - PARTE 3: Enums + Ejercicios

---

## 1. Enums

Un enum es una forma de definir un **conjunto de constantes con nombre**. En vez de usar strings o números sueltos, les das un nombre descriptivo.

```typescript
// ============================================
// SIN ENUM (propenso a errores)
// ============================================

// Usás strings directamente:
let status = 'pending';
status = 'aprovado'; // ⚠️ Typo! Nadie te avisa

// ¿Cuáles son los valores válidos? No hay forma de saberlo
// sin leer TODO el código.


// ============================================
// CON ENUM (seguro)
// ============================================

enum OrderStatus {
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Shipped = 'SHIPPED',
  Delivered = 'DELIVERED',
  Cancelled = 'CANCELLED'
}

let status: OrderStatus = OrderStatus.Pending;
// status = 'aprovado';  // ❌ Error: no es OrderStatus
// Tu editor te muestra los 5 valores válidos con autocomplete
```

### Enum con valores string

```typescript
// ============================================
// STRING ENUM (el más usado en la práctica)
// ============================================

enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT'
}

// Uso:
let dir: Direction = Direction.Up;
console.log(dir); // 'UP' (el valor es el string)

// Comparación:
if (dir === Direction.Up) {
  console.log('Yendo arriba');
}

// Útil en switch:
function mover(direction: Direction): string {
  switch (direction) {
    case Direction.Up:
      return 'Moviendo arriba';
    case Direction.Down:
      return 'Moviendo abajo';
    case Direction.Left:
      return 'Moviendo izquierda';
    case Direction.Right:
      return 'Moviendo derecha';
  }
}
```

### Enum con valores numéricos

```typescript
// ============================================
// NUMERIC ENUM
// ============================================

// Sin valores explícitos (auto-incrementa desde 0):
enum LogLevel {
  Debug,    // 0
  Info,     // 1
  Warning,  // 2
  Error     // 3
}

console.log(LogLevel.Debug);   // 0
console.log(LogLevel.Error);   // 3

// Con valores explícitos:
enum HttpStatus {
  OK = 200,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500
}

console.log(HttpStatus.OK);        // 200
console.log(HttpStatus.NotFound);  // 404

// Útil para comparar con códigos reales:
function handleResponse(status: number): string {
  if (status === HttpStatus.OK) return 'Todo bien';
  if (status === HttpStatus.NotFound) return 'No encontrado';
  return 'Error desconocido';
}
```

### La alternativa moderna: Union Types

```typescript
// ============================================
// UNION TYPES vs ENUMS
// ============================================

// Enum:
enum StatusEnum {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED'
}

// Union type (alternativa):
type StatusUnion = 'PENDING' | 'APPROVED' | 'REJECTED';

// Ambos funcionan similar:
let s1: StatusEnum = StatusEnum.Pending;
let s2: StatusUnion = 'PENDING';

// ¿Cuándo usar cuál?

// ✅ UNION TYPE cuando:
// - Querés algo simple y liviano
// - No necesitás iterar sobre los valores
// - Preferís menos código

// ✅ ENUM cuando:
// - Querés iterar sobre los valores posibles
// - Necesitás que el valor sea distinto al nombre
//   (ej: el nombre es "NotFound" pero el valor es 404)
// - Trabajás con librerías que esperan enums
// - El equipo prefiere enums por convención

// En la práctica moderna, muchos equipos prefieren union types
// porque son más simples y no generan código JavaScript extra.
// Los enums generan un objeto real en runtime, los unions no.
```

---

## 2. Type Guards (Guardias de Tipo)

Los type guards son funciones que **le dicen a TypeScript** qué tipo tiene un valor. Ya viste `typeof` para primitivos. Ahora veamos type guards personalizados:

```typescript
// ============================================
// TYPE GUARDS CON typeof (para primitivos)
// ============================================

type StringOrNumber = string | number;

function procesar(valor: StringOrNumber): string {
  if (typeof valor === 'string') {
    return valor.toUpperCase();    // TypeScript sabe: string
  }
  return valor.toFixed(2);          // TypeScript sabe: number
}


// ============================================
// TYPE GUARDS CON "in" (para objetos)
// ============================================

type Dog = { name: string; bark: () => string };
type Cat = { name: string; meow: () => string };
type Animal = Dog | Cat;

function makeSound(animal: Animal): string {
  if ('bark' in animal) {
    // Si tiene propiedad 'bark', es Dog
    return animal.bark();
  }
  // Si no, es Cat
  return animal.meow();
}


// ============================================
// TYPE GUARDS PERSONALIZADOS (con "is")
// ============================================

// Función que retorna "value is TipoEspecífico"
// Esto le enseña a TypeScript a estrechar el tipo

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

// Uso:
function formatear(valor: unknown): string {
  if (isString(valor)) {
    // TypeScript sabe que es string acá
    return valor.toUpperCase();
  }
  if (isNumber(valor)) {
    // TypeScript sabe que es number acá
    return valor.toFixed(2);
  }
  return String(valor);
}

// Type guard para objetos más complejos:
interface Admin {
  name: string;
  role: 'admin';
  permissions: string[];
}

interface RegularUser {
  name: string;
  role: 'user';
}

type AppUser = Admin | RegularUser;

// Type guard personalizado:
function isAdmin(user: AppUser): user is Admin {
  return user.role === 'admin';
}

function showDashboard(user: AppUser): string {
  if (isAdmin(user)) {
    // TypeScript sabe que user es Admin acá
    return `Admin: ${user.name}, Permisos: ${user.permissions.join(', ')}`;
  }
  // TypeScript sabe que user es RegularUser acá
  return `Usuario: ${user.name}`;
}
```

**¿Para qué sirve `value is string` en vez de solo retornar boolean?**

```typescript
// Sin "is" (solo boolean):
function esString(value: unknown): boolean {
  return typeof value === 'string';
}

let dato: unknown = 'hola';
if (esString(dato)) {
  // dato sigue siendo "unknown" acá ❌
  // TypeScript no sabe que es string
  // dato.toUpperCase(); // ❌ Error
}

// Con "is" (type guard):
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

if (isString(dato)) {
  // dato es "string" acá ✅
  // TypeScript lo estrechó automáticamente
  dato.toUpperCase(); // ✅ OK
}
```

---

## EJERCICIOS DÍA 2

Ahora vas a practicar todo lo del Día 2: interfaces, type aliases, unions, intersections, enums y type guards.

**Archivos que vas a crear:**

```
src/day-2/
├── interfaces.ts            ← Ejercicio 1
├── interfaces.test.ts
├── type-aliases.ts          ← Ejercicio 2
├── type-aliases.test.ts
├── enums.ts                 ← Ejercicio 3
└── enums.test.ts
```

---

## EJERCICIO 1: Interfaces

⏱️ **TIEMPO LÍMITE:** 30 min

---

### Creá: `src/day-2/interfaces.ts`

```typescript
// ============================================
// EJERCICIO 1: Interfaces
// ============================================

// TODO: Definir interface Product
//
// Propiedades:
// - id: string (readonly)
// - name: string
// - price: number
// - category: string

export interface Product {
  // TU CÓDIGO AQUÍ
}


// TODO: Definir interface CartItem que EXTIENDE Product
//
// Propiedades adicionales:
// - quantity: number

export interface CartItem extends Product {
  // TU CÓDIGO AQUÍ
}


// TODO: Función que calcula el total del carrito
//
// DEBE:
// - Recibir un array de CartItem
// - Retornar la suma de (price * quantity) de cada item
//
// Ejemplo:
//   calculateCartTotal([
//     { id: '1', name: 'Laptop', price: 1000, category: 'tech', quantity: 1 },
//     { id: '2', name: 'Mouse', price: 25, category: 'tech', quantity: 2 }
//   ]) → 1050

export function calculateCartTotal(items: CartItem[]): number {
  // TU CÓDIGO AQUÍ
}


// TODO: Definir interface para función de descuento
//
// La función recibe un price (number) y retorna un number

export interface DiscountFunction {
  // TU CÓDIGO AQUÍ
}


// TODO: Función que aplica descuento a un producto
//
// DEBE:
// - Recibir un Product
// - Recibir una DiscountFunction
// - Retornar un NUEVO Product (no modificar el original)
//   con el precio modificado por la función de descuento
//
// Ejemplo:
//   const halfOff: DiscountFunction = (price) => price * 0.5;
//   applyDiscountToProduct(
//     { id: '1', name: 'Laptop', price: 1000, category: 'tech' },
//     halfOff
//   ) → { id: '1', name: 'Laptop', price: 500, category: 'tech' }

export function applyDiscountToProduct(
  product: Product,
  discountFn: DiscountFunction
): Product {
  // TU CÓDIGO AQUÍ
}


// TODO: Función que filtra productos por rango de precio
//
// DEBE:
// - Recibir un array de Product
// - Recibir min (number)
// - Recibir max (number)
// - Retornar solo los productos cuyo precio esté entre min y max (inclusivo)
//
// Ejemplo:
//   filterByPriceRange(products, 10, 100)
//   → solo productos con precio >= 10 Y <= 100

export function filterByPriceRange(
  products: Product[],
  min: number,
  max: number
): Product[] {
  // TU CÓDIGO AQUÍ
}
```

### Creá: `src/day-2/interfaces.test.ts`

```typescript
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
```

### 💡 HINTS:

**Hint 1 (calculateCartTotal):** Usá `reduce` para acumular. Cada item aporta `item.price * item.quantity`.

**Hint 2 (applyDiscountToProduct):** Para crear un nuevo objeto sin modificar el original, pensá en el spread operator. Después sobrescribí solo el price.

**Hint 3 (filterByPriceRange):** Un método de array filtra según condición. La condición es que el precio sea `>=` min Y `<=` max.

---

## EJERCICIO 2: Type Aliases y Unions

⏱️ **TIEMPO LÍMITE:** 30 min

---

### Creá: `src/day-2/type-aliases.ts`

```typescript
// ============================================
// EJERCICIO 2: Type Aliases y Unions
// ============================================

// TODO: Definir type UserRole (union de string literals)
// Valores posibles: 'admin', 'user', 'guest'

export type UserRole = // TU CÓDIGO AQUÍ


// TODO: Definir type User
// Propiedades: id (string), name (string), role (UserRole)

export type User = {
  // TU CÓDIGO AQUÍ
};


// TODO: Función que verifica si un user es admin
//
// Ejemplo:
//   isAdmin({ id: '1', name: 'Alice', role: 'admin' }) → true
//   isAdmin({ id: '2', name: 'Bob', role: 'user' })    → false

export function isAdmin(user: User): boolean {
  // TU CÓDIGO AQUÍ
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
}


// TODO: Definir discriminated union PaymentMethod
//
// Tres variantes:
// - { type: 'card'; cardNumber: string; cvv: string }
// - { type: 'paypal'; email: string }
// - { type: 'bitcoin'; walletAddress: string }

export type PaymentMethod =
  // TU CÓDIGO AQUÍ


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
}


// TODO: Definir tipos para un sistema de formas (shapes)
//
// Discriminated union Shape con:
// - { kind: 'circle'; radius: number }
// - { kind: 'rectangle'; width: number; height: number }
// - { kind: 'triangle'; base: number; height: number }

export type Shape =
  // TU CÓDIGO AQUÍ


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
}
```

### Creá: `src/day-2/type-aliases.test.ts`

```typescript
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
```

### 💡 HINTS:

**Hint 1 (getPermissions):** Un switch sobre el role es la forma más limpia. Cada case retorna su array.

**Hint 2 (processPayment):** Para los últimos 4 dígitos de cardNumber, los strings tienen un método que extrae los últimos N caracteres.

**Hint 3 (calculateArea):** Switch sobre `shape.kind`. Dentro de cada case, TypeScript sabe exactamente qué propiedades tiene el shape.

---

## EJERCICIO 3: Enums y Type Guards

⏱️ **TIEMPO LÍMITE:** 30 min

---

### Creá: `src/day-2/enums.ts`

```typescript
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
}


// TODO: Definir interface Order
// Propiedades: id (string), status (OrderStatus), total (number)

export interface Order {
  // TU CÓDIGO AQUÍ
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
}

export interface Square {
  // TU CÓDIGO AQUÍ
}

export type Figure = Circle | Square;


// TODO: Type guard que verifica si una Figure es Circle
//
// DEBE:
// - Retornar "figure is Circle" (type predicate)
// - Verificar que kind sea 'circle'

export function isCircle(figure: Figure): figure is Circle {
  // TU CÓDIGO AQUÍ
}


// TODO: Type guard que verifica si una Figure es Square

export function isSquare(figure: Figure): figure is Square {
  // TU CÓDIGO AQUÍ
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
}
```

### Creá: `src/day-2/enums.test.ts`

```typescript
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
```

### 💡 HINTS:

**Hint 1 (canCancelOrder):** Podés comparar con `===` contra los valores del enum, o usar un array de estados cancelables y verificar si incluye el actual.

**Hint 2 (getNextStatus):** Un switch con cada estado retornando el siguiente es la forma más clara.

**Hint 3 (isCircle):** El type guard es una sola línea. Comparás la propiedad `kind` con el string literal correspondiente.

**Hint 4 (describeFigure):** Usá tus type guards `isCircle` e `isSquare` con `if`. Dentro de cada `if`, TypeScript sabe el tipo exacto.

---

## Una vez que termines los 3 ejercicios

```bash
npm test
```

Deberías ver todos los tests de day-1 Y day-2 pasando.

Después hacé commit:

```bash
git add .
git commit -m "Day 2: Interfaces, type aliases, unions, enums, type guards - all tests passing"
git push
```

---

## ✅ CHECKLIST DÍA 2 COMPLETO

- [ ] Ejercicio 1: Interfaces implementadas, tests en verde
- [ ] Ejercicio 2: Type aliases y unions, tests en verde
- [ ] Ejercicio 3: Enums y type guards, tests en verde
- [ ] Todos los tests pasan con `npm test`
- [ ] Commit pusheado a GitHub
- [ ] Entendés interfaces (básicas, herencia, para funciones)
- [ ] Entendés type aliases y cuándo usarlos vs interfaces
- [ ] Entendés union types y narrowing
- [ ] Entendés discriminated unions
- [ ] Entendés intersection types
- [ ] Entendés enums (string y numéricos)
- [ ] Entendés type guards (typeof, in, custom con "is")

---

**Siguiente:** Día 3 - Parte 1: Generics (cuando tengas todo en verde, avisame)
