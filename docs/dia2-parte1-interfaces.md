# DÍA 2 - PARTE 1: Interfaces

---

## ¿Qué problema resuelven las interfaces?

En el Día 1 tipaste objetos inline (directamente en la función). Funciona, pero tiene un problema:

```typescript
// ❌ PROBLEMA: Repetición
// Si 5 funciones reciben el mismo tipo de objeto,
// tenés que escribir el tipo 5 veces:

function mostrarUsuario(usuario: { name: string; age: number; email: string }): string {
  return `${usuario.name} (${usuario.age})`;
}

function validarUsuario(usuario: { name: string; age: number; email: string }): boolean {
  return usuario.age > 0 && usuario.email.includes('@');
}

function actualizarUsuario(usuario: { name: string; age: number; email: string }): void {
  // ...
}

// ¿Qué pasa si necesitás agregar una propiedad "role"?
// → Tenés que modificar las 5 funciones
// → Propenso a errores, tedioso, difícil de mantener
```

Las interfaces resuelven esto definiendo la forma del objeto **UNA sola vez**:

```typescript
// ✅ SOLUCIÓN: Interface
// Definís la forma UNA vez, la usás en todos lados:

interface User {
  name: string;
  age: number;
  email: string;
}

function mostrarUsuario(usuario: User): string {
  return `${usuario.name} (${usuario.age})`;
}

function validarUsuario(usuario: User): boolean {
  return usuario.age > 0 && usuario.email.includes('@');
}

function actualizarUsuario(usuario: User): void {
  // ...
}

// ¿Necesitás agregar "role"?
// → Modificás la interface UNA vez → se actualiza en TODOS lados
```

**Analogía:** Una interface es como un **plano de arquitectura**. Definís una vez cómo es la estructura, y después cada casa (objeto) que construyas tiene que seguir ese plano.

---

## 1. Interfaces Básicas

```typescript
// ============================================
// INTERFACES BÁSICAS
// ============================================

// Definir una interface:
// La convención es usar PascalCase (primera letra mayúscula)
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Crear un objeto que cumpla la interface:
const user: User = {
  id: '1',
  name: 'Alice',
  email: 'alice@example.com',
  age: 25
};

// ❌ Falta una propiedad:
// const userMal: User = {
//   id: '1',
//   name: 'Alice'
// };
// Error: faltan email y age

// ❌ Propiedad extra:
// const userMal2: User = {
//   id: '1',
//   name: 'Alice',
//   email: 'alice@example.com',
//   age: 25,
//   telefono: '123'   // ❌ 'telefono' no existe en User
// };
```

### Propiedades opcionales

```typescript
// ============================================
// PROPIEDADES OPCIONALES (?)
// ============================================

// El ? indica que la propiedad puede no estar
interface Config {
  url: string;           // Obligatoria
  timeout?: number;      // Opcional
  retries?: number;      // Opcional
}

// ✅ Todas estas son válidas:
const config1: Config = { url: 'https://api.com' };
const config2: Config = { url: 'https://api.com', timeout: 5000 };
const config3: Config = { url: 'https://api.com', timeout: 5000, retries: 3 };

// Cuando accedés a una propiedad opcional, puede ser undefined:
function conectar(config: Config): void {
  console.log(config.url);       // string (siempre existe)
  console.log(config.timeout);   // number | undefined (puede no existir)

  // Por eso necesitás verificar antes de usar:
  if (config.timeout !== undefined) {
    console.log(`Timeout: ${config.timeout}ms`);
  }

  // O usar valor por defecto:
  const timeout = config.timeout ?? 3000; // Si es undefined, usa 3000
}
```

### Propiedades readonly

```typescript
// ============================================
// PROPIEDADES READONLY
// ============================================

// readonly = no se puede modificar después de crear el objeto
interface Point {
  readonly x: number;
  readonly y: number;
}

const punto: Point = { x: 10, y: 20 };

console.log(punto.x); // ✅ Leer: OK
// punto.x = 5;       // ❌ Error: no podés reasignar una propiedad readonly

// ¿Cuándo usar readonly?
// - IDs que nunca cambian
// - Coordenadas fijas
// - Configuraciones inmutables
// - Cualquier dato que no debería modificarse después de crearse

interface Entity {
  readonly id: string;       // El ID nunca cambia
  readonly createdAt: Date;  // La fecha de creación nunca cambia
  name: string;              // Pero el nombre sí puede cambiar
}
```

---

## 2. Interfaces Extendidas (Herencia)

Una interface puede **heredar** de otra. Esto significa que toma todas las propiedades de la interface padre y agrega las suyas.

```typescript
// ============================================
// HERENCIA DE INTERFACES (extends)
// ============================================

// Interface base:
interface Entity {
  id: string;
  createdAt: Date;
}

// Interface que EXTIENDE a Entity:
// User tiene TODO lo de Entity + sus propias propiedades
interface User extends Entity {
  name: string;
  email: string;
}

// User ahora tiene: id, createdAt, name, email
const user: User = {
  id: '1',                      // ← viene de Entity
  createdAt: new Date(),         // ← viene de Entity
  name: 'Alice',                 // ← propia de User
  email: 'alice@example.com'     // ← propia de User
};

// Otro ejemplo: Product también extiende Entity
interface Product extends Entity {
  name: string;
  price: number;
}

// Product tiene: id, createdAt, name, price
```

**Analogía:** Es como la herencia biológica. `Entity` es el "padre" con características base (id, createdAt). `User` y `Product` son "hijos" que heredan esas características y agregan las suyas.

```
        Entity
       (id, createdAt)
       /           \
      /             \
   User            Product
(name, email)    (name, price)
```

### Herencia múltiple

```typescript
// ============================================
// HERENCIA MÚLTIPLE
// ============================================

// Una interface puede extender VARIAS interfaces a la vez

interface HasId {
  id: string;
}

interface HasTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

interface HasName {
  name: string;
}

// Admin hereda de las 3:
interface Admin extends HasId, HasTimestamps, HasName {
  permissions: string[];
}

// Admin tiene: id, createdAt, updatedAt, name, permissions
const admin: Admin = {
  id: '1',
  createdAt: new Date(),
  updatedAt: new Date(),
  name: 'Alice',
  permissions: ['read', 'write', 'delete']
};
```

---

## 3. Interfaces para Funciones

Las interfaces también pueden definir la **forma de una función** (qué recibe y qué retorna):

```typescript
// ============================================
// INTERFACES PARA FUNCIONES
// ============================================

// Definir el "contrato" de una función:
interface MathOperation {
  (a: number, b: number): number;
}
// Esto dice: "cualquier función que reciba 2 numbers y retorne 1 number"

// Ahora podés crear funciones que cumplan ese contrato:
const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;
const multiply: MathOperation = (a, b) => a * b;

// TypeScript verifica que cumplan el contrato:
// const invalid: MathOperation = (a, b) => `${a + b}`;
// ❌ Error: retorna string, no number

// ¿Para qué sirve? Para garantizar que funciones
// intercambiables tengan la misma forma:
function calcular(a: number, b: number, operacion: MathOperation): number {
  return operacion(a, b);
}

calcular(10, 5, add);       // 15
calcular(10, 5, subtract);  // 5
calcular(10, 5, multiply);  // 50
// Cualquier MathOperation funciona acá
```

### Interfaces con métodos

```typescript
// ============================================
// INTERFACES CON MÉTODOS
// ============================================

// Una interface puede tener propiedades Y métodos:
interface Calculator {
  // Propiedad
  name: string;

  // Métodos (dos formas de declararlos):
  add(a: number, b: number): number;        // Forma 1: method syntax
  subtract: (a: number, b: number) => number; // Forma 2: property syntax
}

// Ambas formas son equivalentes. Forma 1 es más común.

const calc: Calculator = {
  name: 'BasicCalc',
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

console.log(calc.add(5, 3));      // 8
console.log(calc.subtract(5, 3)); // 2
```

---

## 4. Index Signatures (Propiedades Dinámicas)

A veces no sabés de antemano qué propiedades va a tener un objeto, pero sabés qué TIPO van a ser:

```typescript
// ============================================
// INDEX SIGNATURES
// ============================================

// "Cualquier cantidad de propiedades string que tengan valor string"
interface Dictionary {
  [key: string]: string;
}

const traducciones: Dictionary = {
  hello: 'hola',
  goodbye: 'adiós',
  thanks: 'gracias'
  // Podés agregar las que quieras
};

// ✅ Acceder:
console.log(traducciones['hello']); // 'hola'
console.log(traducciones.goodbye);  // 'adiós'

// ✅ Agregar nuevas:
traducciones.please = 'por favor'; // ✅ OK

// ❌ Valor incorrecto:
// traducciones.number = 123;
// Error: 123 no es string


// Index signature con propiedades fijas:
interface UserScores {
  name: string;                   // Propiedad fija (siempre existe)
  [subject: string]: string | number; // Propiedades dinámicas
}

// ⚠️ Las propiedades fijas deben ser compatibles con el index signature
// "name" es string, y el index dice string | number, string es compatible ✅

const scores: UserScores = {
  name: 'Alice',
  math: 95,
  english: 88,
  science: 92
};
```

---

## 5. Interfaces en Acción (Ejemplo Real)

Acá va un ejemplo más realista para ver cómo se conecta todo:

```typescript
// ============================================
// EJEMPLO REAL: Sistema de productos
// ============================================

// Interface base
interface Entity {
  readonly id: string;
  readonly createdAt: Date;
}

// Product extiende Entity
interface Product extends Entity {
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

// CartItem extiende Product con cantidad
interface CartItem extends Product {
  quantity: number;
}

// Interface para funciones de descuento
interface DiscountFn {
  (price: number): number;
}

// ── Funciones que usan las interfaces ──

function createProduct(name: string, price: number, category: string): Product {
  return {
    id: Date.now().toString(),
    createdAt: new Date(),
    name,
    price,
    category,
    inStock: true
  };
}

function addToCart(product: Product, quantity: number): CartItem {
  return {
    ...product,      // Copia todas las propiedades de product
    quantity          // Agrega quantity
  };
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

function applyDiscount(price: number, discountFn: DiscountFn): number {
  return discountFn(price);
}

// ── Uso ──

const laptop = createProduct('Laptop', 999.99, 'electronics');
const mouse = createProduct('Mouse', 25.50, 'electronics');

const cart: CartItem[] = [
  addToCart(laptop, 1),
  addToCart(mouse, 2)
];

const total = calculateTotal(cart);
// 999.99 * 1 + 25.50 * 2 = 1050.99

// Descuento del 10%
const tenPercentOff: DiscountFn = (price) => price * 0.9;
const finalPrice = applyDiscount(total, tenPercentOff);
// 1050.99 * 0.9 = 945.891

// Flujo visual:
//
// Product (laptop) ──→ addToCart ──→ CartItem (laptop, qty: 1) ──┐
//                                                                 ├──→ calculateTotal ──→ applyDiscount
// Product (mouse)  ──→ addToCart ──→ CartItem (mouse, qty: 2)  ──┘
```

---

## Resumen Visual

```
INTERFACE BÁSICA:
interface Nombre {
  propiedad: tipo;
  opcional?: tipo;
  readonly fija: tipo;
}

HERENCIA:
interface Hijo extends Padre {
  propiedadExtra: tipo;
}

HERENCIA MÚLTIPLE:
interface Hijo extends Padre1, Padre2 {
  propiedadExtra: tipo;
}

FUNCIÓN:
interface NombreFn {
  (param: tipo): tipoRetorno;
}

INDEX SIGNATURE:
interface Diccionario {
  [key: string]: tipo;
}
```

---

## ✅ CHECKLIST PARTE 1

Antes de avanzar, verificá que entendés:

- [ ] Qué problema resuelven las interfaces (evitar repetición de tipos)
- [ ] Cómo definir una interface básica
- [ ] Propiedades opcionales (?) y readonly
- [ ] Herencia con extends (simple y múltiple)
- [ ] Interfaces para funciones
- [ ] Index signatures (propiedades dinámicas)
- [ ] Cómo se usan interfaces en funciones (como tipo de parámetro o retorno)

---

**Siguiente:** Día 2 - Parte 2: Type Aliases + Union/Intersection (cuando estés listo, avisame)
