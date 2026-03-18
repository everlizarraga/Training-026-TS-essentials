# DÍA 3 - PARTE 3: Ejercicios

---

## Archivos que vas a crear

```
src/day-3/
├── generics-basics.ts            ← Ejercicio 1: Funciones genéricas
├── generics-basics.test.ts
├── generic-classes.ts            ← Ejercicio 2: Clases genéricas
├── generic-classes.test.ts
├── classes-interfaces.ts         ← Ejercicio 3: Classes + Interfaces + Abstract
└── classes-interfaces.test.ts
```

Recordá: `npm run test:watch` corriendo en una terminal mientras trabajás.

---

## EJERCICIO 1: Funciones Genéricas

⏱️ **TIEMPO LÍMITE:** 30 min

---

### Creá: `src/day-3/generics-basics.ts`

```typescript
// ============================================
// EJERCICIO 1: Funciones Genéricas
// ============================================

// TODO: Implementar función genérica swap
//
// DEBE:
// - Recibir dos valores de tipos potencialmente distintos (T y U)
// - Retornar un tuple con los valores intercambiados [U, T]
//
// Ejemplo:
//   swap(1, 'hello') → ['hello', 1]
//   swap(true, 42)   → [42, true]

export function swap<T, U>(a: T, b: U): [U, T] {
  // TU CÓDIGO AQUÍ
}


// TODO: Implementar función genérica filterArray
//
// DEBE:
// - Recibir un array de tipo T
// - Recibir una función predicado que recibe T y retorna boolean
// - Retornar un nuevo array con solo los elementos que cumplen el predicado
//
// Ejemplo:
//   filterArray([1, 2, 3, 4, 5], n => n > 3) → [4, 5]
//   filterArray(['hello', 'hi', 'hey'], s => s.length > 2) → ['hello', 'hey']

export function filterArray<T>(
  arr: T[],
  predicate: (item: T) => boolean
): T[] {
  // TU CÓDIGO AQUÍ
}


// TODO: Implementar función genérica mapArray
//
// DEBE:
// - Recibir un array de tipo T
// - Recibir una función que transforma T en U
// - Retornar un nuevo array de tipo U
//
// Ejemplo:
//   mapArray([1, 2, 3], n => n.toString()) → ['1', '2', '3']
//   mapArray(['hello', 'hi'], s => s.length) → [5, 2]

export function mapArray<T, U>(
  arr: T[],
  mapper: (item: T) => U
): U[] {
  // TU CÓDIGO AQUÍ
}


// TODO: Implementar función genérica con constraint
//
// DEBE:
// - Recibir un array de objetos que tengan al menos una propiedad "id" (string)
// - Recibir un id (string)
// - Retornar el objeto con ese id, o undefined si no existe
//
// Constraint: T debe tener { id: string }
//
// Ejemplo:
//   const users = [{ id: '1', name: 'Alice' }, { id: '2', name: 'Bob' }];
//   findById(users, '1') → { id: '1', name: 'Alice' }
//   findById(users, '99') → undefined

export function findById<T extends { id: string }>(
  items: T[],
  id: string
): T | undefined {
  // TU CÓDIGO AQUÍ
}


// TODO: Implementar función genérica getProperty
//
// DEBE:
// - Recibir un objeto de tipo T
// - Recibir una key K que sea una de las propiedades de T
// - Retornar el valor de esa propiedad (T[K])
//
// Constraint: K extends keyof T
//
// Ejemplo:
//   getProperty({ name: 'Alice', age: 25 }, 'name') → 'Alice'
//   getProperty({ name: 'Alice', age: 25 }, 'age') → 25

export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  // TU CÓDIGO AQUÍ
}


// TODO: Implementar función genérica que haga merge de Partial<T>
//
// DEBE:
// - Recibir un objeto original de tipo T
// - Recibir un objeto de updates de tipo Partial<T>
// - Retornar un nuevo objeto con las propiedades actualizadas
// - NO modificar el objeto original
//
// Ejemplo:
//   mergeUpdate({ name: 'Alice', age: 25 }, { age: 26 })
//   → { name: 'Alice', age: 26 }

export function mergeUpdate<T extends object>(original: T, updates: Partial<T>): T {
  // TU CÓDIGO AQUÍ
}
```

### Creá: `src/day-3/generics-basics.test.ts`

```typescript
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
```

### 💡 HINTS:

**Hint 1 (swap):** Retorná un tuple con los valores en orden inverso. Es más simple de lo que parece.

**Hint 2 (filterArray/mapArray):** Los arrays ya tienen métodos nativos que hacen exactamente esto. No reinventes la rueda.

**Hint 3 (findById):** Los arrays tienen un método que busca el primer elemento que cumple una condición.

**Hint 4 (mergeUpdate):** Pensá en el spread operator. ¿Qué pasa si combinás un objeto con otro? ¿Cuál sobreescribe al otro?

---

## EJERCICIO 2: Clases Genéricas

⏱️ **TIEMPO LÍMITE:** 40 min

---

### Creá: `src/day-3/generic-classes.ts`

```typescript
// ============================================
// EJERCICIO 2: Clases Genéricas
// ============================================

// TODO: Implementar clase genérica Queue<T> (Cola)
//
// Una cola es FIFO: First In, First Out
// (como una fila de personas: el primero que llega es el primero que sale)
//
// Métodos:
// - enqueue(item: T): void         → Agrega al final
// - dequeue(): T | undefined       → Saca del frente (el primero)
// - peek(): T | undefined          → Ver el frente sin sacarlo
// - size(): number                 → Cantidad de elementos
// - isEmpty(): boolean             → ¿Está vacía?
// - toArray(): T[]                 → Retorna copia como array
//
// Ejemplo:
//   const q = new Queue<number>();
//   q.enqueue(1); q.enqueue(2); q.enqueue(3);
//   q.peek();    → 1 (el primero)
//   q.dequeue(); → 1 (lo saca)
//   q.peek();    → 2 (ahora es el primero)
//   q.size();    → 2

export class Queue<T> {
  // TU CÓDIGO AQUÍ
}


// TODO: Implementar clase genérica Repository<T>
//
// Constraint: T debe tener { id: string }
// Usa Map<string, T> internamente para almacenar items
//
// Métodos:
// - add(item: T): void                              → Agrega item (usa item.id como key)
// - getById(id: string): T | undefined              → Buscar por id
// - getAll(): T[]                                    → Todos los items
// - update(id: string, updates: Partial<T>): T | null → Actualizar (merge updates, retorna actualizado o null si no existe)
// - remove(id: string): boolean                      → Eliminar (true si existía, false si no)
// - filter(predicate: (item: T) => boolean): T[]     → Filtrar
// - count(): number                                  → Cantidad de items
// - exists(id: string): boolean                      → ¿Existe el id?
//
// Ejemplo:
//   const repo = new Repository<{ id: string; name: string }>();
//   repo.add({ id: '1', name: 'Alice' });
//   repo.getById('1'); → { id: '1', name: 'Alice' }
//   repo.update('1', { name: 'Alicia' }); → { id: '1', name: 'Alicia' }
//   repo.remove('1'); → true

export class Repository<T extends { id: string }> {
  // TU CÓDIGO AQUÍ
}
```

### Creá: `src/day-3/generic-classes.test.ts`

```typescript
import { Queue, Repository } from './generic-classes';

describe('Ejercicio 2: Clases Genéricas', () => {

  // ── Queue ──
  describe('Queue', () => {
    let queue: Queue<number>;

    beforeEach(() => {
      queue = new Queue<number>();
    });

    test('should start empty', () => {
      expect(queue.isEmpty()).toBe(true);
      expect(queue.size()).toBe(0);
    });

    test('should enqueue items', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.size()).toBe(2);
      expect(queue.isEmpty()).toBe(false);
    });

    test('should dequeue in FIFO order', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
    });

    test('should return undefined when dequeue empty', () => {
      expect(queue.dequeue()).toBeUndefined();
    });

    test('should peek without removing', () => {
      queue.enqueue(10);
      queue.enqueue(20);
      expect(queue.peek()).toBe(10);
      expect(queue.size()).toBe(2); // No se removió
    });

    test('should return undefined when peek empty', () => {
      expect(queue.peek()).toBeUndefined();
    });

    test('should return array copy with toArray', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      const arr = queue.toArray();
      expect(arr).toEqual([1, 2, 3]);

      // Modificar la copia no afecta la queue
      arr.push(99);
      expect(queue.size()).toBe(3);
    });

    test('should work with strings', () => {
      const strQueue = new Queue<string>();
      strQueue.enqueue('hello');
      strQueue.enqueue('world');
      expect(strQueue.dequeue()).toBe('hello');
      expect(strQueue.dequeue()).toBe('world');
    });
  });

  // ── Repository ──
  describe('Repository', () => {
    interface TestUser {
      id: string;
      name: string;
      age: number;
    }

    let repo: Repository<TestUser>;

    beforeEach(() => {
      repo = new Repository<TestUser>();
    });

    test('should start empty', () => {
      expect(repo.count()).toBe(0);
      expect(repo.getAll()).toEqual([]);
    });

    test('should add and retrieve items', () => {
      repo.add({ id: '1', name: 'Alice', age: 25 });
      expect(repo.getById('1')).toEqual({ id: '1', name: 'Alice', age: 25 });
    });

    test('should return undefined for non-existing id', () => {
      expect(repo.getById('99')).toBeUndefined();
    });

    test('should get all items', () => {
      repo.add({ id: '1', name: 'Alice', age: 25 });
      repo.add({ id: '2', name: 'Bob', age: 30 });
      expect(repo.getAll().length).toBe(2);
    });

    test('should update existing item', () => {
      repo.add({ id: '1', name: 'Alice', age: 25 });
      const updated = repo.update('1', { name: 'Alicia' });
      expect(updated).not.toBeNull();
      expect(updated?.name).toBe('Alicia');
      expect(updated?.age).toBe(25); // No cambió
    });

    test('should return null when updating non-existing', () => {
      expect(repo.update('99', { name: 'Ghost' })).toBeNull();
    });

    test('should remove existing item', () => {
      repo.add({ id: '1', name: 'Alice', age: 25 });
      expect(repo.remove('1')).toBe(true);
      expect(repo.getById('1')).toBeUndefined();
      expect(repo.count()).toBe(0);
    });

    test('should return false when removing non-existing', () => {
      expect(repo.remove('99')).toBe(false);
    });

    test('should filter items', () => {
      repo.add({ id: '1', name: 'Alice', age: 25 });
      repo.add({ id: '2', name: 'Bob', age: 30 });
      repo.add({ id: '3', name: 'Charlie', age: 35 });

      const over28 = repo.filter(u => u.age > 28);
      expect(over28.length).toBe(2);
    });

    test('should check if item exists', () => {
      repo.add({ id: '1', name: 'Alice', age: 25 });
      expect(repo.exists('1')).toBe(true);
      expect(repo.exists('99')).toBe(false);
    });

    test('should persist update in storage', () => {
      repo.add({ id: '1', name: 'Alice', age: 25 });
      repo.update('1', { age: 26 });
      // Verificar que getById retorna el dato actualizado
      expect(repo.getById('1')?.age).toBe(26);
    });
  });
});
```

### 💡 HINTS:

**Hint 1 (Queue):** Usá un array interno. `enqueue` agrega al final (push), `dequeue` saca del principio. ¿Qué método de array saca el primer elemento?

**Hint 2 (Queue - toArray):** Para retornar una copia, usá spread operator `[...this.items]`. Así el usuario no puede modificar el array interno.

**Hint 3 (Repository - update):** Primero verificá que el item existe (get del Map). Si existe, creá un nuevo objeto combinando el existente con los updates (spread). Después guardalo de vuelta en el Map con set.

**Hint 4 (Repository - Map):** Recordá que Map tiene: `.set(key, value)`, `.get(key)`, `.has(key)`, `.delete(key)`, `.size`, `Array.from(map.values())`.

---

## EJERCICIO 3: Classes + Interfaces + Abstract

⏱️ **TIEMPO LÍMITE:** 40 min

---

### Creá: `src/day-3/classes-interfaces.ts`

```typescript
// ============================================
// EJERCICIO 3: Classes + Interfaces + Abstract
// ============================================

// TODO: Definir interface Shape
//
// Métodos:
// - getArea(): number
// - getPerimeter(): number
// - describe(): string

export interface Shape {
  // TU CÓDIGO AQUÍ
}


// TODO: Implementar clase Rectangle que implemente Shape
//
// Constructor: (width: number, height: number)
// - getArea()      → width * height
// - getPerimeter() → 2 * (width + height)
// - describe()     → "Rectangle: [width]x[height]"
//
// Ejemplo:
//   new Rectangle(4, 3).getArea() → 12
//   new Rectangle(4, 3).describe() → "Rectangle: 4x3"

export class Rectangle implements Shape {
  // TU CÓDIGO AQUÍ
  // Usá shorthand en constructor
}


// TODO: Implementar clase Circle que implemente Shape
//
// Constructor: (radius: number)
// - getArea()      → Math.PI * radius * radius
// - getPerimeter() → 2 * Math.PI * radius
// - describe()     → "Circle: radius [radius]"
//
// Ejemplo:
//   new Circle(5).describe() → "Circle: radius 5"

export class Circle implements Shape {
  // TU CÓDIGO AQUÍ
  // Usá shorthand en constructor
}


// TODO: Implementar clase Triangle que implemente Shape
//
// Constructor: (base: number, height: number, sideA: number, sideB: number, sideC: number)
// - base y height son para calcular el área
// - sideA, sideB, sideC son los 3 lados para el perímetro
// - getArea()      → (base * height) / 2
// - getPerimeter() → sideA + sideB + sideC
// - describe()     → "Triangle: base [base], height [height]"
//
// Ejemplo:
//   new Triangle(6, 4, 5, 6, 5).getArea() → 12

export class Triangle implements Shape {
  // TU CÓDIGO AQUÍ
}


// TODO: Función que calcula el área total de un array de Shapes
//
// DEBE:
// - Recibir un array de Shape
// - Retornar la suma de todas las áreas
//
// Ejemplo:
//   getTotalArea([new Rectangle(4, 3), new Circle(5)]) → 12 + 78.54 = 90.54

export function getTotalArea(shapes: Shape[]): number {
  // TU CÓDIGO AQUÍ
}


// TODO: Función que encuentra la shape con mayor área
//
// DEBE:
// - Recibir un array de Shape
// - Retornar la Shape con el área más grande
// - Si el array está vacío, retornar undefined
//
// Ejemplo:
//   getLargestShape([new Rectangle(4, 3), new Circle(5)])
//   → el Circle (78.54 > 12)

export function getLargestShape(shapes: Shape[]): Shape | undefined {
  // TU CÓDIGO AQUÍ
}


// ============================================
// ABSTRACT CLASS + HERENCIA
// ============================================

// TODO: Implementar abstract class Vehicle
//
// Constructor: (brand: string, year: number)   ← usar shorthand
// Propiedad privada: _speed: number = 0
//
// Getter: speed → retorna _speed
//
// Métodos concretos:
// - accelerate(amount: number): void → Suma amount a _speed (no menor a 0)
// - brake(amount: number): void      → Resta amount de _speed (no menor a 0)
// - getInfo(): string                → "[brand] ([year]) - [_speed] km/h"
//
// Método abstracto:
// - honk(): string → Cada vehículo tiene su propio sonido

export abstract class Vehicle {
  // TU CÓDIGO AQUÍ
}


// TODO: Implementar clase Car que extiende Vehicle
//
// Constructor: (brand: string, year: number, doors: number)
// - honk() → "Beep beep!"
// - Método propio: getDoors() → retorna doors

export class Car extends Vehicle {
  // TU CÓDIGO AQUÍ
}


// TODO: Implementar clase Motorcycle que extiende Vehicle
//
// Constructor: (brand: string, year: number)
// - honk() → "Vroom!"
// - Método propio: wheelie() → "[brand] does a wheelie!"

export class Motorcycle extends Vehicle {
  // TU CÓDIGO AQUÍ
}
```

### Creá: `src/day-3/classes-interfaces.test.ts`

```typescript
import {
  Shape,
  Rectangle,
  Circle,
  Triangle,
  getTotalArea,
  getLargestShape,
  Vehicle,
  Car,
  Motorcycle
} from './classes-interfaces';

describe('Ejercicio 3: Classes + Interfaces + Abstract', () => {

  // ── Shapes ──
  describe('Rectangle', () => {
    const rect = new Rectangle(4, 3);

    test('should calculate area', () => {
      expect(rect.getArea()).toBe(12);
    });

    test('should calculate perimeter', () => {
      expect(rect.getPerimeter()).toBe(14);
    });

    test('should describe', () => {
      expect(rect.describe()).toBe('Rectangle: 4x3');
    });
  });

  describe('Circle', () => {
    const circle = new Circle(5);

    test('should calculate area', () => {
      expect(circle.getArea()).toBeCloseTo(78.5398, 2);
    });

    test('should calculate perimeter', () => {
      expect(circle.getPerimeter()).toBeCloseTo(31.4159, 2);
    });

    test('should describe', () => {
      expect(circle.describe()).toBe('Circle: radius 5');
    });
  });

  describe('Triangle', () => {
    const tri = new Triangle(6, 4, 5, 6, 5);

    test('should calculate area', () => {
      expect(tri.getArea()).toBe(12);
    });

    test('should calculate perimeter', () => {
      expect(tri.getPerimeter()).toBe(16);
    });

    test('should describe', () => {
      expect(tri.describe()).toBe('Triangle: base 6, height 4');
    });
  });

  describe('getTotalArea', () => {
    test('should sum all areas', () => {
      const shapes: Shape[] = [
        new Rectangle(4, 3),   // 12
        new Rectangle(2, 5)    // 10
      ];
      expect(getTotalArea(shapes)).toBe(22);
    });

    test('should handle empty array', () => {
      expect(getTotalArea([])).toBe(0);
    });

    test('should work with mixed shapes', () => {
      const shapes: Shape[] = [
        new Rectangle(10, 10),  // 100
        new Circle(1)           // ~3.14
      ];
      expect(getTotalArea(shapes)).toBeCloseTo(103.1416, 2);
    });
  });

  describe('getLargestShape', () => {
    test('should find largest shape', () => {
      const small = new Rectangle(2, 2);   // 4
      const big = new Rectangle(10, 10);   // 100
      const medium = new Circle(3);        // ~28.27

      const largest = getLargestShape([small, big, medium]);
      expect(largest).toBe(big);
    });

    test('should return undefined for empty array', () => {
      expect(getLargestShape([])).toBeUndefined();
    });

    test('should handle single shape', () => {
      const only = new Circle(5);
      expect(getLargestShape([only])).toBe(only);
    });
  });

  // ── Vehicles ──
  describe('Car', () => {
    let car: Car;

    beforeEach(() => {
      car = new Car('Toyota', 2024, 4);
    });

    test('should start with 0 speed', () => {
      expect(car.speed).toBe(0);
    });

    test('should accelerate', () => {
      car.accelerate(50);
      expect(car.speed).toBe(50);
    });

    test('should brake', () => {
      car.accelerate(50);
      car.brake(20);
      expect(car.speed).toBe(30);
    });

    test('should not go below 0 speed', () => {
      car.accelerate(10);
      car.brake(50);
      expect(car.speed).toBe(0);
    });

    test('should honk', () => {
      expect(car.honk()).toBe('Beep beep!');
    });

    test('should get doors', () => {
      expect(car.getDoors()).toBe(4);
    });

    test('should get info', () => {
      car.accelerate(60);
      expect(car.getInfo()).toBe('Toyota (2024) - 60 km/h');
    });
  });

  describe('Motorcycle', () => {
    let moto: Motorcycle;

    beforeEach(() => {
      moto = new Motorcycle('Yamaha', 2023);
    });

    test('should honk', () => {
      expect(moto.honk()).toBe('Vroom!');
    });

    test('should do wheelie', () => {
      expect(moto.wheelie()).toBe('Yamaha does a wheelie!');
    });

    test('should get info', () => {
      moto.accelerate(100);
      expect(moto.getInfo()).toBe('Yamaha (2023) - 100 km/h');
    });
  });

  describe('Polimorfismo', () => {
    test('should treat all vehicles as Vehicle', () => {
      const vehicles: Vehicle[] = [
        new Car('Toyota', 2024, 4),
        new Motorcycle('Yamaha', 2023)
      ];

      // Todos pueden honk (cada uno a su manera)
      const honks = vehicles.map(v => v.honk());
      expect(honks).toEqual(['Beep beep!', 'Vroom!']);
    });
  });
});
```

### 💡 HINTS:

**Hint 1 (Rectangle/Circle):** Usá shorthand en el constructor. Todos los métodos son cálculos simples. `describe()` retorna un template literal.

**Hint 2 (getTotalArea):** `reduce` con acumulador sumando `shape.getArea()` para cada shape.

**Hint 3 (getLargestShape):** Primero verificá si el array está vacío. Después usá `reduce` para comparar áreas y quedarte con la mayor.

**Hint 4 (Vehicle):** `_speed` es private con valor inicial 0. `accelerate` suma pero no deja que sea negativo. `brake` resta pero no deja que sea menor a 0. Pensá en `Math.max(0, ...)`.

**Hint 5 (Car):** `super(brand, year)` en el constructor para pasar datos al padre. `doors` es propiedad propia de Car.

---

## Una vez que termines los 3 ejercicios

```bash
npm test
```

Deberías ver todos los tests de day-1, day-2 Y day-3 pasando.

Después hacé commit:

```bash
git add .
git commit -m "Day 3: Generics, generic classes, abstract classes, interfaces - all tests passing"
git push
```

---

## ✅ CHECKLIST DÍA 3 COMPLETO

- [ ] Ejercicio 1: Funciones genéricas, tests en verde
- [ ] Ejercicio 2: Clases genéricas (Queue, Repository), tests en verde
- [ ] Ejercicio 3: Classes + Interfaces + Abstract, tests en verde
- [ ] Todos los tests pasan con `npm test`
- [ ] Commit pusheado a GitHub
- [ ] Dominás funciones genéricas con `<T>` y constraints
- [ ] Sabés crear clases genéricas (Queue<T>, Repository<T>)
- [ ] Sabés usar Map como almacenamiento interno
- [ ] Entendés abstract classes y cuándo usarlas
- [ ] Sabés implementar interfaces en clases
- [ ] Entendés extends vs implements
- [ ] Entendés polimorfismo (tratar hijos como tipo del padre)

---

**Siguiente:** Día 4 - Parte 1: Proyecto Integrador (cuando tengas todo en verde, avisame)
