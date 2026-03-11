# ROADMAP: TypeScript Essentials

## 📊 METADATA

**Objetivo:** Dominar TypeScript esencial para patrones de diseño y desarrollo profesional

**Prerequisitos:** JavaScript ES6+ dominado (✅ ya lo tenés)

**Horas diarias disponibles:** 3-4 horas

**Duración estimada total:** 3-4 días (12-16 horas)

**Fecha de inicio:** A definir

**Enfoque determinado:** Práctica intensiva + Testing desde día 1

**Justificación del enfoque:** 
- NO necesitás TODO TypeScript (solo lo esencial)
- Enfoque en lo que usarás en patrones de diseño
- Setup profesional desde día 1 (NPM + Jest + TS)
- Sin HTML/CSS (código puro + tests)
- Ejercicios con casos reales

**Número de días:** 3-4 días

**Justificación:**
- **Día 1:** Setup + Types básicos
- **Día 2:** Interfaces + Type aliases + Enums
- **Día 3:** Generics + Classes avanzadas
- **Día 4:** Práctica integradora + Refactoring JS→TS

No necesitás más - esto es el 90% que usarás en patrones.

---

## 🗺️ ESTRUCTURA COMPLETA DEL ENTRENAMIENTO

### DÍA 1: Setup Profesional + Types Básicos
**Duración estimada:** 3-4 horas  
**Objetivo:** Setup completo de entorno TS + Dominar types primitivos

#### PARTE 1: Setup Profesional (1 hora)

**Objetivo:** Configurar entorno TypeScript profesional con NPM + Jest

**Pasos:**

**1. Crear proyecto Node:**
```bash
mkdir typescript-essentials
cd typescript-essentials
npm init -y
```

**2. Instalar dependencias:**
```bash
# TypeScript
npm install --save-dev typescript @types/node

# Testing
npm install --save-dev jest ts-jest @types/jest

# Code quality
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install --save-dev prettier eslint-config-prettier

# Utility types (opcional pero útil)
npm install --save-dev type-fest
```

**3. Inicializar TypeScript:**
```bash
npx tsc --init
```

**4. Configurar tsconfig.json:**
```json
{
  "compilerOptions": {
    // Opciones básicas
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    
    // Strict mode (IMPORTANTE - habilita todas las verificaciones)
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    
    // Module resolution
    "moduleResolution": "node",
    "esModuleInterop": true,
    "resolveJsonModule": true,
    
    // Output
    "outDir": "./dist",
    "rootDir": "./src",
    
    // Source maps (para debugging)
    "sourceMap": true,
    
    // Otros
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

**5. Configurar Jest (jest.config.js):**
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/**/__tests__/**'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

**6. Scripts en package.json:**
```json
{
  "scripts": {
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint src/**/*.ts",
    "format": "prettier --write src/**/*.ts",
    "dev": "ts-node src/index.ts"
  }
}
```

**7. Estructura de carpetas:**
```
typescript-essentials/
├── src/
│   ├── day1/
│   │   ├── basics.ts
│   │   └── basics.test.ts
│   ├── day2/
│   ├── day3/
│   └── day4/
├── dist/          (generado por tsc)
├── node_modules/
├── package.json
├── tsconfig.json
└── jest.config.js
```

**8. Verificar setup:**
```bash
# Crear archivo de prueba
mkdir src/day1
echo 'const x: number = 5; console.log(x);' > src/day1/test.ts

# Compilar
npm run build

# Ejecutar
node dist/day1/test.js
```

**✅ Checklist de setup:**
- [ ] Node.js instalado
- [ ] NPM funcionando
- [ ] TypeScript instalado
- [ ] Jest configurado
- [ ] Scripts NPM funcionando
- [ ] tsconfig.json configurado con strict mode
- [ ] Estructura de carpetas creada

---

#### PARTE 2: Types Primitivos (1 hora)

**Objetivo:** Dominar tipos básicos y anotaciones

**Conceptos:**

**1. Tipos primitivos:**
```typescript
// ============================================
// TYPES PRIMITIVOS
// ============================================

// String
let nombre: string = 'Alice';
let mensaje: string = `Hola ${nombre}`;

// Number
let edad: number = 25;
let precio: number = 19.99;
let hex: number = 0xf00d;

// Boolean
let isActive: boolean = true;
let isCompleted: boolean = false;

// Null y Undefined
let valorNull: null = null;
let valorUndefined: undefined = undefined;

// Any (evitar - rompe el tipado)
let cualquierCosa: any = 'texto';
cualquierCosa = 123; // OK pero NO recomendado

// Unknown (mejor que any)
let valorDesconocido: unknown = 'texto';
// valorDesconocido.toUpperCase(); // ❌ Error
if (typeof valorDesconocido === 'string') {
  valorDesconocido.toUpperCase(); // ✅ OK
}

// Void (funciones que no retornan nada)
function log(mensaje: string): void {
  console.log(mensaje);
}

// Never (funciones que nunca retornan)
function error(mensaje: string): never {
  throw new Error(mensaje);
}
```

**2. Arrays:**
```typescript
// Array de strings
let nombres: string[] = ['Alice', 'Bob', 'Charlie'];
let numeros: Array<number> = [1, 2, 3]; // Sintaxis genérica

// Array de tipos mixtos (tuple)
let persona: [string, number] = ['Alice', 25];

// Array readonly
let readonly: readonly number[] = [1, 2, 3];
// readonly.push(4); // ❌ Error
```

**3. Object types:**
```typescript
// Objeto simple
let usuario: { name: string; age: number } = {
  name: 'Alice',
  age: 25
};

// Propiedades opcionales
let config: { url: string; timeout?: number } = {
  url: 'https://api.example.com'
};

// Propiedades readonly
let punto: { readonly x: number; readonly y: number } = {
  x: 10,
  y: 20
};
// punto.x = 5; // ❌ Error
```

**4. Type inference (inferencia de tipos):**
```typescript
// TS infiere automáticamente
let mensaje = 'Hola'; // string
let edad = 25; // number
let activo = true; // boolean

// Inferencia en funciones
function sumar(a: number, b: number) {
  return a + b; // TS infiere que retorna number
}
```

---

#### EJERCICIOS DÍA 1 (2 horas)

**Crear archivo:** `src/day1/basics.ts` y `src/day1/basics.test.ts`

**Ejercicio 1: Type annotations básicas**

```typescript
// ============================================
// EJERCICIO 1: Type Annotations
// ============================================

// TODO: Crear función que valide email
// Debe retornar boolean
// Usar tipos explícitos en parámetros y retorno

export function validateEmail(email: string): boolean {
  // TU CÓDIGO AQUÍ
  // Debe verificar que contenga @ y .
}

// TODO: Crear función que formatee precio
// Recibe number, retorna string con formato "$XX.XX"

export function formatPrice(price: number): string {
  // TU CÓDIGO AQUÍ
}

// TODO: Crear función que calcule descuento
// Si hay descuento (opcional), aplicarlo
// Si no, retornar precio original

export function applyDiscount(price: number, discount?: number): number {
  // TU CÓDIGO AQUÍ
}
```

**Tests:**
```typescript
// src/day1/basics.test.ts
import { validateEmail, formatPrice, applyDiscount } from './basics';

describe('Basics - Type Annotations', () => {
  test('validateEmail should validate correct email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid')).toBe(false);
  });

  test('formatPrice should format number as currency', () => {
    expect(formatPrice(19.99)).toBe('$19.99');
    expect(formatPrice(100)).toBe('$100.00');
  });

  test('applyDiscount should apply discount if provided', () => {
    expect(applyDiscount(100, 10)).toBe(90);
    expect(applyDiscount(100)).toBe(100);
  });
});
```

---

**Ejercicio 2: Arrays y Tuples**

```typescript
// ============================================
// EJERCICIO 2: Arrays y Tuples
// ============================================

// TODO: Crear función que filtre números pares
export function filterEven(numbers: number[]): number[] {
  // TU CÓDIGO AQUÍ
}

// TODO: Crear función que retorne [min, max] de array
// Usar tuple como tipo de retorno
export function minMax(numbers: number[]): [number, number] {
  // TU CÓDIGO AQUÍ
}

// TODO: Crear función que formatee persona como "Name (Age)"
// Recibe tuple [name, age]
export function formatPerson(person: [string, number]): string {
  // TU CÓDIGO AQUÍ
}
```

**Tests:**
```typescript
describe('Arrays y Tuples', () => {
  test('filterEven should return only even numbers', () => {
    expect(filterEven([1, 2, 3, 4, 5])).toEqual([2, 4]);
  });

  test('minMax should return [min, max]', () => {
    expect(minMax([3, 1, 4, 1, 5, 9])).toEqual([1, 9]);
  });

  test('formatPerson should format tuple', () => {
    expect(formatPerson(['Alice', 25])).toBe('Alice (25)');
  });
});
```

---

**Ejercicio 3: Object types**

```typescript
// ============================================
// EJERCICIO 3: Object Types
// ============================================

// TODO: Crear función que calcule área de rectángulo
// Recibe objeto { width: number, height: number }
// Retorna number

export function calculateArea(rectangle: { width: number; height: number }): number {
  // TU CÓDIGO AQUÍ
}

// TODO: Crear función que merge dos configs
// Config tiene { url: string, timeout?: number }
// Retornar config merged (segundo override primero)

export function mergeConfig(
  config1: { url: string; timeout?: number },
  config2: { url: string; timeout?: number }
): { url: string; timeout?: number } {
  // TU CÓDIGO AQUÍ
}
```

---

**✅ CHECKLIST DÍA 1:**
- [ ] Setup completo funcionando
- [ ] NPM scripts corriendo (build, test)
- [ ] Entendés tipos primitivos (string, number, boolean)
- [ ] Sabés usar arrays tipados
- [ ] Entendés tuples
- [ ] Podés tipar objetos inline
- [ ] Entendés propiedades opcionales (?)
- [ ] Todos los tests pasan
- [ ] Coverage >80%

---

### DÍA 2: Interfaces, Type Aliases, Enums
**Duración estimada:** 3-4 horas  
**Objetivo:** Dominar interfaces y tipos complejos

#### PARTE 1: Interfaces (1.5 horas)

**Conceptos:**

**1. Interfaces básicas:**
```typescript
// ============================================
// INTERFACES
// ============================================

// Interface simple
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Uso
const user: User = {
  id: '1',
  name: 'Alice',
  email: 'alice@example.com',
  age: 25
};

// Propiedades opcionales
interface Config {
  url: string;
  timeout?: number; // Opcional
  retries?: number;
}

// Propiedades readonly
interface Point {
  readonly x: number;
  readonly y: number;
}

const punto: Point = { x: 10, y: 20 };
// punto.x = 5; // ❌ Error
```

**2. Interfaces extendidas (herencia):**
```typescript
// Interface base
interface Entity {
  id: string;
  createdAt: Date;
}

// Interface que extiende
interface User extends Entity {
  name: string;
  email: string;
}

// User ahora tiene: id, createdAt, name, email

// Múltiple herencia
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface Admin extends User, Timestamped {
  permissions: string[];
}
```

**3. Interfaces para funciones:**
```typescript
// Función como tipo
interface MathOperation {
  (a: number, b: number): number;
}

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

// Interface con métodos
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};
```

**4. Index signatures (propiedades dinámicas):**
```typescript
// Objeto con keys dinámicas
interface Dictionary {
  [key: string]: string;
}

const translations: Dictionary = {
  hello: 'hola',
  goodbye: 'adiós',
  // Cualquier string key es válido
};

// Con tipos mixtos
interface MixedDictionary {
  [key: string]: string | number;
  // Pero podés forzar algunas keys específicas:
  length: number; // Siempre debe existir
}
```

---

#### PARTE 2: Type Aliases (1 hora)

**Conceptos:**

**1. Type aliases básicos:**
```typescript
// ============================================
// TYPE ALIASES
// ============================================

// Alias simple
type ID = string;
type Age = number;

let userId: ID = 'user-123';
let userAge: Age = 25;

// Alias de objeto (similar a interface)
type User = {
  id: ID;
  name: string;
  age: Age;
};

// Alias de unión (ESTO NO SE PUEDE CON INTERFACE)
type Status = 'pending' | 'approved' | 'rejected';

let orderStatus: Status = 'pending';
// orderStatus = 'invalid'; // ❌ Error

// Alias de intersección
type Timestamped = {
  createdAt: Date;
  updatedAt: Date;
};

type TimestampedUser = User & Timestamped;
```

**2. Union types:**
```typescript
// Unión de tipos primitivos
type StringOrNumber = string | number;

function formatValue(value: StringOrNumber): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}

// Unión de objetos
type PaymentMethod = 
  | { type: 'credit-card'; cardNumber: string }
  | { type: 'paypal'; email: string }
  | { type: 'cash' };

function processPayment(payment: PaymentMethod) {
  switch (payment.type) {
    case 'credit-card':
      console.log('Procesando tarjeta:', payment.cardNumber);
      break;
    case 'paypal':
      console.log('Procesando PayPal:', payment.email);
      break;
    case 'cash':
      console.log('Procesando efectivo');
      break;
  }
}
```

**3. Intersection types:**
```typescript
type HasId = { id: string };
type HasTimestamps = { createdAt: Date; updatedAt: Date };
type HasName = { name: string };

// Combinar tipos
type Entity = HasId & HasTimestamps & HasName;

const entity: Entity = {
  id: '1',
  name: 'Test',
  createdAt: new Date(),
  updatedAt: new Date()
};
```

**4. Interface vs Type (cuándo usar cada uno):**
```typescript
// ✅ USA INTERFACE cuando:
// - Defines contratos de clases
// - Necesitas extender (herencia)
// - Defines forma de objetos

interface Animal {
  name: string;
}

interface Dog extends Animal {
  bark(): void;
}

// ✅ USA TYPE cuando:
// - Union types (string | number)
// - Intersection types (A & B)
// - Tuple types
// - Alias de primitivos

type ID = string | number;
type Point = [number, number];
type Status = 'active' | 'inactive';
```

---

#### PARTE 3: Enums (0.5 horas)

**Conceptos:**

```typescript
// ============================================
// ENUMS
// ============================================

// Enum numérico
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

let dir: Direction = Direction.Up;

// Enum con valores custom
enum Status {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Rejected = 'REJECTED'
}

let orderStatus: Status = Status.Pending;

// Enum numérico con valores custom
enum HttpStatus {
  OK = 200,
  BadRequest = 400,
  NotFound = 404,
  ServerError = 500
}

// Const enum (más eficiente)
const enum LogLevel {
  Debug,
  Info,
  Warning,
  Error
}

// ⚠️ ALTERNATIVA MODERNA (más type-safe):
// Usar union types en vez de enums
type StatusType = 'PENDING' | 'APPROVED' | 'REJECTED';

// Ventaja: autocomplete + validación sin overhead de enum
```

---

#### EJERCICIOS DÍA 2 (1.5 horas)

**Ejercicio 1: Interfaces**

```typescript
// ============================================
// EJERCICIO 1: Interfaces
// ============================================

// TODO: Definir interface Product
interface Product {
  // id: string
  // name: string
  // price: number
  // category: string
}

// TODO: Definir interface CartItem (extiende Product)
interface CartItem extends Product {
  // quantity: number
}

// TODO: Función que calcula total del cart
export function calculateCartTotal(items: CartItem[]): number {
  // TU CÓDIGO AQUÍ
}

// TODO: Interface para función de descuento
interface DiscountFunction {
  // (price: number) => number
}

// TODO: Función que aplica descuento a producto
export function applyDiscountToProduct(
  product: Product,
  discountFn: DiscountFunction
): Product {
  // TU CÓDIGO AQUÍ
  // Retornar nuevo producto con precio descontado
}
```

---

**Ejercicio 2: Type Aliases y Unions**

```typescript
// ============================================
// EJERCICIO 2: Type Aliases y Unions
// ============================================

// TODO: Definir type UserRole
type UserRole = 'admin' | 'user' | 'guest';

// TODO: Definir type User con role
type User = {
  id: string;
  name: string;
  role: UserRole;
};

// TODO: Función que verifica si user es admin
export function isAdmin(user: User): boolean {
  // TU CÓDIGO AQUÍ
}

// TODO: Definir PaymentMethod (union type)
type PaymentMethod =
  | { type: 'card'; cardNumber: string; cvv: string }
  | { type: 'paypal'; email: string }
  | { type: 'bitcoin'; walletAddress: string };

// TODO: Función que procesa pago
export function processPayment(method: PaymentMethod): string {
  // TU CÓDIGO AQUÍ
  // Retornar mensaje según tipo de pago
  // Usar switch con narrowing
}
```

---

**Ejercicio 3: Enums y Type Guards**

```typescript
// ============================================
// EJERCICIO 3: Enums y Type Guards
// ============================================

// TODO: Definir enum OrderStatus
export enum OrderStatus {
  // PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
}

// TODO: Type para Order
type Order = {
  id: string;
  status: OrderStatus;
  total: number;
};

// TODO: Función que verifica si order puede cancelarse
// Solo PENDING y PROCESSING pueden cancelarse
export function canCancelOrder(order: Order): boolean {
  // TU CÓDIGO AQUÍ
}

// TODO: Type guard personalizado
export function isProcessing(order: Order): boolean {
  // TU CÓDIGO AQUÍ
}
```

---

**✅ CHECKLIST DÍA 2:**
- [ ] Entendés interfaces
- [ ] Sabés extender interfaces
- [ ] Podés definir index signatures
- [ ] Entendés type aliases
- [ ] Dominás union types (|)
- [ ] Dominás intersection types (&)
- [ ] Sabés cuándo usar interface vs type
- [ ] Entendés enums (y sus alternativas)
- [ ] Todos los tests pasan

---

### DÍA 3: Generics + Classes Avanzadas
**Duración estimada:** 3-4 horas  
**Objetivo:** Dominar generics y OOP avanzada en TypeScript

#### PARTE 1: Generics (2 horas)

**Conceptos:**

**1. Generics básicos:**
```typescript
// ============================================
// GENERICS
// ============================================

// Función genérica simple
function identity<T>(value: T): T {
  return value;
}

// Uso
const num = identity<number>(5); // T = number
const str = identity<string>('hello'); // T = string
const auto = identity(true); // T inferido como boolean

// Array genérico
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const first = firstElement([1, 2, 3]); // number | undefined
const firstStr = firstElement(['a', 'b']); // string | undefined
```

**2. Generics con constraints:**
```typescript
// Constraint: T debe tener propiedad length
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength('hello'); // OK - string tiene length
logLength([1, 2, 3]); // OK - array tiene length
// logLength(123); // ❌ Error - number no tiene length

// Constraint: T debe ser objeto
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Alice', age: 25 };
const name = getProperty(user, 'name'); // string
const age = getProperty(user, 'age'); // number
// getProperty(user, 'invalid'); // ❌ Error
```

**3. Generic interfaces:**
```typescript
// Interface genérica
interface Result<T> {
  success: boolean;
  data: T;
  error?: string;
}

const userResult: Result<User> = {
  success: true,
  data: { id: '1', name: 'Alice', email: 'alice@example.com', age: 25 }
};

const errorResult: Result<null> = {
  success: false,
  data: null,
  error: 'User not found'
};

// Interface genérica con múltiples tipos
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const pair: KeyValuePair<string, number> = {
  key: 'age',
  value: 25
};
```

**4. Generic classes:**
```typescript
// Clase genérica
class Box<T> {
  constructor(private value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const numberBox = new Box<number>(123);
const stringBox = new Box<string>('hello');

// Stack genérico
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
```

**5. Utility types (built-in generics):**
```typescript
// Partial - hace todas las propiedades opcionales
interface User {
  id: string;
  name: string;
  email: string;
}

type PartialUser = Partial<User>;
// { id?: string; name?: string; email?: string; }

// Required - hace todas las propiedades obligatorias
type RequiredUser = Required<PartialUser>;

// Pick - selecciona propiedades específicas
type UserPreview = Pick<User, 'id' | 'name'>;
// { id: string; name: string; }

// Omit - omite propiedades específicas
type UserWithoutEmail = Omit<User, 'email'>;
// { id: string; name: string; }

// Readonly - hace todas las propiedades readonly
type ReadonlyUser = Readonly<User>;

// Record - crea objeto con keys específicas
type Roles = 'admin' | 'user' | 'guest';
type Permissions = Record<Roles, string[]>;
// { admin: string[]; user: string[]; guest: string[]; }
```

---

#### PARTE 2: Classes Avanzadas (1.5 horas)

**Conceptos:**

**1. Classes con tipos:**
```typescript
// ============================================
// CLASSES AVANZADAS
// ============================================

class User {
  // Propiedades tipadas
  id: string;
  name: string;
  private password: string; // Solo accesible dentro de la clase

  // Constructor con tipos
  constructor(id: string, name: string, password: string) {
    this.id = id;
    this.name = name;
    this.password = password;
  }

  // Métodos tipados
  validatePassword(input: string): boolean {
    return this.password === input;
  }

  // Getters/setters
  get displayName(): string {
    return `User: ${this.name}`;
  }
}

// Shorthand en constructor
class Product {
  constructor(
    public id: string,
    public name: string,
    private price: number // private
  ) {}
  
  getPrice(): number {
    return this.price;
  }
}
```

**2. Abstract classes:**
```typescript
// Clase abstracta (no se puede instanciar)
abstract class Animal {
  constructor(public name: string) {}

  // Método abstracto (debe implementarse en subclases)
  abstract makeSound(): string;

  // Método concreto
  move(): string {
    return `${this.name} is moving`;
  }
}

class Dog extends Animal {
  makeSound(): string {
    return 'Woof!';
  }
}

// const animal = new Animal('Test'); // ❌ Error
const dog = new Dog('Rex'); // ✅ OK
```

**3. Classes implementando interfaces:**
```typescript
// Interface define contrato
interface Drawable {
  draw(): void;
  moveTo(x: number, y: number): void;
}

// Clase implementa interface
class Circle implements Drawable {
  constructor(
    private x: number,
    private y: number,
    private radius: number
  ) {}

  draw(): void {
    console.log(`Drawing circle at (${this.x}, ${this.y})`);
  }

  moveTo(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  // Métodos adicionales propios
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}
```

**4. Static members:**
```typescript
class MathUtils {
  static PI: number = 3.14159;

  static square(x: number): number {
    return x * x;
  }

  static cube(x: number): number {
    return x * x * x;
  }
}

// Uso sin instanciar
console.log(MathUtils.PI);
console.log(MathUtils.square(5));
```

---

#### EJERCICIOS DÍA 3 (1.5 horas)

**Ejercicio 1: Generics básicos**

```typescript
// ============================================
// EJERCICIO 1: Generics Básicos
// ============================================

// TODO: Implementar función genérica swap
// Debe intercambiar dos valores y retornar tupla
export function swap<T, U>(a: T, b: U): [U, T] {
  // TU CÓDIGO AQUÍ
}

// TODO: Implementar función genérica filterArray
// Debe filtrar array según predicado
export function filterArray<T>(
  arr: T[],
  predicate: (item: T) => boolean
): T[] {
  // TU CÓDIGO AQUÍ
}

// TODO: Implementar función genérica map
// Debe transformar array
export function mapArray<T, U>(
  arr: T[],
  mapper: (item: T) => U
): U[] {
  // TU CÓDIGO AQUÍ
}
```

---

**Ejercicio 2: Generic Classes (IMPORTANTE para patrones)**

```typescript
// ============================================
// EJERCICIO 2: Generic Classes
// ============================================

// TODO: Implementar clase genérica Repository<T>
// Debe tener:
// - private items: T[]
// - add(item: T): void
// - remove(id: string): boolean
// - getById(id: string): T | undefined
// - getAll(): T[]

export class Repository<T extends { id: string }> {
  // TU CÓDIGO AQUÍ
}

// TODO: Implementar Queue genérico
export class Queue<T> {
  // TU CÓDIGO AQUÍ
  // enqueue(item: T): void
  // dequeue(): T | undefined
  // peek(): T | undefined
  // size(): number
  // isEmpty(): boolean
}
```

---

**Ejercicio 3: Classes + Interfaces**

```typescript
// ============================================
// EJERCICIO 3: Classes + Interfaces
// ============================================

// TODO: Definir interface Shape
interface Shape {
  getArea(): number;
  getPerimeter(): number;
}

// TODO: Implementar Rectangle
export class Rectangle implements Shape {
  // TU CÓDIGO AQUÍ
  // constructor(width, height)
  // getArea(), getPerimeter()
}

// TODO: Implementar Circle
export class Circle implements Shape {
  // TU CÓDIGO AQUÍ
  // constructor(radius)
  // getArea(), getPerimeter()
}

// TODO: Función que calcula área total
export function getTotalArea(shapes: Shape[]): number {
  // TU CÓDIGO AQUÍ
}
```

---

**✅ CHECKLIST DÍA 3:**
- [ ] Entendés generics básicos (<T>)
- [ ] Sabés usar constraints (T extends X)
- [ ] Podés crear interfaces genéricas
- [ ] Dominás generic classes
- [ ] Conocés utility types (Partial, Pick, Omit)
- [ ] Entendés abstract classes
- [ ] Sabés implementar interfaces en classes
- [ ] Todos los tests pasan

---

### DÍA 4: Práctica Integradora + Refactoring
**Duración estimada:** 3-4 horas  
**Objetivo:** Integrar todo + Refactorizar código JS a TS

#### PARTE 1: Proyecto Integrador (2 horas)

**Objetivo:** Construir mini-aplicación usando TODO lo aprendido

**PROYECTO: Task Management System (lógica pura + tests)**

**Requisitos:**

**Crear:**
1. Interface `Task` con id, title, description, status, createdAt
2. Type `TaskStatus` = 'pending' | 'in-progress' | 'completed'
3. Generic class `Repository<T>` para persistencia
4. Class `TaskManager` que use `Repository<Task>`
5. Functions con tipos para filtrar, buscar, estadísticas
6. Tests completos (100% coverage)

**Archivo:** `src/day4/task-manager.ts`

```typescript
// ============================================
// PROYECTO INTEGRADOR: TASK MANAGER
// ============================================

// TODO: Definir types e interfaces

// Status type
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

// Task interface
export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// REPOSITORY GENÉRICO
// ============================================

export class Repository<T extends { id: string }> {
  private items: Map<string, T> = new Map();

  // TODO: Implementar métodos
  add(item: T): void {
    // TU CÓDIGO AQUÍ
  }

  update(id: string, updates: Partial<T>): T | null {
    // TU CÓDIGO AQUÍ
  }

  delete(id: string): boolean {
    // TU CÓDIGO AQUÍ
  }

  getById(id: string): T | undefined {
    // TU CÓDIGO AQUÍ
  }

  getAll(): T[] {
    // TU CÓDIGO AQUÍ
  }

  filter(predicate: (item: T) => boolean): T[] {
    // TU CÓDIGO AQUÍ
  }
}

// ============================================
// TASK MANAGER
// ============================================

export class TaskManager {
  private repository: Repository<Task>;

  constructor() {
    this.repository = new Repository<Task>();
  }

  // TODO: Implementar métodos

  createTask(title: string, description: string): Task {
    // TU CÓDIGO AQUÍ
    // Generar ID único
    // Status inicial = 'pending'
    // CreatedAt = now
  }

  updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null {
    // TU CÓDIGO AQUÍ
  }

  deleteTask(id: string): boolean {
    // TU CÓDIGO AQUÍ
  }

  getTaskById(id: string): Task | undefined {
    // TU CÓDIGO AQUÍ
  }

  getAllTasks(): Task[] {
    // TU CÓDIGO AQUÍ
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    // TU CÓDIGO AQUÍ
  }

  searchTasks(query: string): Task[] {
    // TU CÓDIGO AQUÍ
    // Buscar en title y description (case-insensitive)
  }

  getStatistics(): TaskStatistics {
    // TU CÓDIGO AQUÍ
  }
}

// ============================================
// HELPER TYPES
// ============================================

export interface TaskStatistics {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  completionRate: number; // Porcentaje
}
```

**Tests completos:**
```typescript
// src/day4/task-manager.test.ts
import { TaskManager, TaskStatus } from './task-manager';

describe('TaskManager Integration', () => {
  let manager: TaskManager;

  beforeEach(() => {
    manager = new TaskManager();
  });

  describe('CRUD operations', () => {
    test('should create task', () => {
      const task = manager.createTask('Test task', 'Description');
      
      expect(task.id).toBeDefined();
      expect(task.title).toBe('Test task');
      expect(task.status).toBe('pending');
    });

    test('should update task', () => {
      const task = manager.createTask('Test', 'Desc');
      const updated = manager.updateTask(task.id, { 
        status: 'in-progress' 
      });
      
      expect(updated?.status).toBe('in-progress');
    });

    test('should delete task', () => {
      const task = manager.createTask('Test', 'Desc');
      const deleted = manager.deleteTask(task.id);
      
      expect(deleted).toBe(true);
      expect(manager.getTaskById(task.id)).toBeUndefined();
    });
  });

  describe('Filtering and search', () => {
    beforeEach(() => {
      manager.createTask('Task 1', 'Description 1');
      manager.createTask('Task 2', 'Description 2');
      const task3 = manager.createTask('Task 3', 'Description 3');
      manager.updateTask(task3.id, { status: 'completed' });
    });

    test('should filter by status', () => {
      const pending = manager.getTasksByStatus('pending');
      const completed = manager.getTasksByStatus('completed');
      
      expect(pending.length).toBe(2);
      expect(completed.length).toBe(1);
    });

    test('should search tasks', () => {
      const results = manager.searchTasks('Task 1');
      
      expect(results.length).toBe(1);
      expect(results[0].title).toBe('Task 1');
    });
  });

  describe('Statistics', () => {
    test('should calculate statistics', () => {
      manager.createTask('Task 1', 'Desc');
      manager.createTask('Task 2', 'Desc');
      const task3 = manager.createTask('Task 3', 'Desc');
      manager.updateTask(task3.id, { status: 'completed' });
      
      const stats = manager.getStatistics();
      
      expect(stats.total).toBe(3);
      expect(stats.pending).toBe(2);
      expect(stats.completed).toBe(1);
      expect(stats.completionRate).toBeCloseTo(33.33);
    });
  });
});
```

---

#### PARTE 2: Refactoring JS → TS (1.5 horas)

**Objetivo:** Tomar código JavaScript y convertirlo a TypeScript

**Ejercicio: Refactorizar User Management (sin tipos)**

**ANTES (JavaScript):**
```javascript
// user-manager.js (sin tipos)
class UserManager {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  createUser(name, email, role) {
    const user = {
      id: this.nextId++,
      name,
      email,
      role,
      createdAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  getUserById(id) {
    return this.users.find(u => u.id === id);
  }

  updateUser(id, updates) {
    const user = this.getUserById(id);
    if (!user) return null;
    Object.assign(user, updates);
    return user;
  }

  deleteUser(id) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }

  getUsersByRole(role) {
    return this.users.filter(u => u.role === role);
  }
}
```

**DESPUÉS (TypeScript - TU TAREA):**
```typescript
// user-manager.ts (con tipos completos)

// TODO: Definir types e interfaces
export type UserRole = /* ... */;

export interface User {
  // ...
}

export class UserManager {
  // TODO: Convertir a TypeScript
  // - Tipar todas las propiedades
  // - Tipar todos los parámetros
  // - Tipar todos los retornos
  // - Usar tipos estrictos
}
```

**Tests (ya en TypeScript):**
```typescript
import { UserManager, UserRole } from './user-manager';

describe('UserManager Refactoring', () => {
  test('should create user with correct types', () => {
    const manager = new UserManager();
    const user = manager.createUser('Alice', 'alice@example.com', 'admin');
    
    expect(user.id).toBe(1);
    expect(user.role).toBe('admin');
  });

  // ... más tests
});
```

---

#### PARTE 3: Best Practices y Tips (0.5 horas)

**Lectura y práctica de mejores prácticas:**

**1. Usar strict mode SIEMPRE**
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true, // ✅ SIEMPRE activado
  }
}
```

**2. Evitar `any`**
```typescript
// ❌ MAL
function process(data: any) {
  return data.value;
}

// ✅ BIEN
function process(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: any }).value;
  }
}

// ✅ MEJOR
interface DataWithValue {
  value: string;
}

function process(data: DataWithValue) {
  return data.value;
}
```

**3. Preferir interfaces para objetos, types para uniones**
```typescript
// ✅ Interface para objetos
interface User {
  id: string;
  name: string;
}

// ✅ Type para uniones
type Status = 'active' | 'inactive';
type ID = string | number;
```

**4. Usar readonly cuando sea apropiado**
```typescript
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

// No se puede modificar después de crear
```

**5. Type guards personalizados**
```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processValue(value: unknown) {
  if (isString(value)) {
    // TS sabe que value es string aquí
    console.log(value.toUpperCase());
  }
}
```

---

**✅ CHECKLIST DÍA 4:**
- [ ] Proyecto integrador completo
- [ ] Todos los tests del proyecto pasan
- [ ] Coverage 100% en proyecto
- [ ] Refactoring JS→TS completado
- [ ] Entendés cuándo usar interface vs type
- [ ] Aplicás best practices
- [ ] Te sentís cómodo con TypeScript

---

## 📚 RECURSOS ADICIONALES

**Documentación oficial:**
- https://www.typescriptlang.org/docs/

**Playground:**
- https://www.typescriptlang.org/play

**Cheat sheets:**
- https://www.typescriptlang.org/cheatsheets

**TypeScript Handbook:**
- https://www.typescriptlang.org/docs/handbook/intro.html

---

## ✅ CHECKLIST FINAL (AL COMPLETAR 4 DÍAS)

**Setup:**
- [ ] Node.js + NPM configurado
- [ ] TypeScript instalado y configurado
- [ ] Jest con ts-jest funcionando
- [ ] Scripts NPM corriendo (build, test, lint)
- [ ] tsconfig.json con strict mode

**Conceptos:**
- [ ] Types primitivos dominados
- [ ] Arrays y tuples
- [ ] Object types
- [ ] Interfaces
- [ ] Type aliases
- [ ] Union types (|)
- [ ] Intersection types (&)
- [ ] Enums (y alternativas)
- [ ] Generics básicos
- [ ] Generic classes
- [ ] Utility types (Partial, Pick, Omit)
- [ ] Abstract classes
- [ ] Classes implementando interfaces

**Práctica:**
- [ ] Todos los ejercicios completados
- [ ] Todos los tests pasando
- [ ] Proyecto integrador completo
- [ ] Refactoring JS→TS completado
- [ ] Coverage >80% en todos los archivos

**Listo para:**
- [ ] ✅ Patrones de Diseño con TypeScript
- [ ] ✅ Testing avanzado
- [ ] ✅ Proyectos profesionales

---

## 🎯 DESPUÉS DE COMPLETAR

**Próximo paso:** Patrones de Diseño con TypeScript (4 semanas)

**Lo que cambió:**
- ❌ ANTES: JavaScript sin tipos, errores en runtime
- ✅ AHORA: TypeScript con tipos, errores en compile-time

**Beneficios conseguidos:**
- ✅ Código más seguro (menos bugs)
- ✅ IntelliSense completo (autocomplete perfecto)
- ✅ Refactoring seguro
- ✅ Preparado para patrones de diseño
- ✅ Preparado para React con TS
- ✅ CV más fuerte

---

## 📊 COMPARACIÓN: ANTES vs DESPUÉS

| Aspecto | JavaScript | TypeScript (después) |
|---------|-----------|---------------------|
| Errores | Runtime 💥 | Compile-time ✅ |
| Autocomplete | Básico | Completo ⭐ |
| Refactoring | Riesgoso | Seguro ✅ |
| Documentación | Manual | Auto-generada ✅ |
| Interfaces | ❌ No existen | ✅ Nativas |
| Contratos | ❌ No verificados | ✅ Verificados |
| Patrones | ⚠️ Más difícil | ✅ Más claro |

---

**FIN DEL ROADMAP DE TYPESCRIPT ESSENTIALS**

**Duración total:** 3-4 días (12-16 horas)  
**Nivel de salida:** TypeScript Intermediate (listo para patrones)  
**Formato:** Código puro + Tests (sin HTML/CSS)  
**Herramientas:** NPM + Jest + TS desde día 1

¡Éxito con el entrenamiento! 💪
