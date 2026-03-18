# DÍA 3 - PARTE 1: Generics

---

## ¿Qué problema resuelven los Generics?

Imaginate que querés crear una función que retorne el primer elemento de un array. Sin generics:

```typescript
// ❌ PROBLEMA: Una función por cada tipo
function firstNumber(arr: number[]): number | undefined {
  return arr[0];
}

function firstString(arr: string[]): string | undefined {
  return arr[0];
}

function firstBoolean(arr: boolean[]): boolean | undefined {
  return arr[0];
}

// La lógica es IDÉNTICA. Solo cambia el tipo.
// ¿Vas a crear una función nueva por cada tipo? No escala.


// ❌ SOLUCIÓN MALA: Usar any
function first(arr: any[]): any {
  return arr[0];
}

const num = first([1, 2, 3]);     // any ← TypeScript no sabe que es number
const str = first(['a', 'b']);     // any ← TypeScript no sabe que es string
// Perdiste todo el tipado. Volviste a JavaScript.
```

Generics resuelven esto: escribís la función UNA vez y el tipo se adapta automáticamente:

```typescript
// ✅ SOLUCIÓN: Generics
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const num = first([1, 2, 3]);     // number ← TypeScript lo sabe
const str = first(['a', 'b']);     // string ← TypeScript lo sabe
const bool = first([true, false]); // boolean ← TypeScript lo sabe

// UNA función, TODOS los tipos, tipado completo
```

**Analogía:** Un generic es como un **molde de galletas ajustable**. El molde es uno solo (la función), pero se adapta al material que le ponés (el tipo). Si le ponés masa de chocolate, salen galletas de chocolate. Si le ponés masa de vainilla, salen de vainilla. La forma (la lógica) es la misma.

```
Sin Generics:                    Con Generics:

firstNumber()  ─┐               first<T>()
firstString()  ─┤ Misma lógica    │
firstBoolean() ─┘ repetida 3x     ├── first<number>()
                                   ├── first<string>()
                                   └── first<boolean>()
                                   Una función, infinitos tipos
```

---

## 1. Funciones Genéricas

### Sintaxis básica

```typescript
// ============================================
// FUNCIONES GENÉRICAS
// ============================================

// La <T> después del nombre es el "parámetro de tipo"
// T es una convención (Type). Podés usar cualquier nombre.
// Convenciones comunes: T (Type), U (segundo tipo), K (Key), V (Value)

function identity<T>(value: T): T {
  return value;
}

// ¿Qué pasa cuando la llamás?

// Forma 1: Especificando el tipo explícitamente
const a = identity<number>(5);       // T = number, retorna number
const b = identity<string>('hello'); // T = string, retorna string

// Forma 2: TypeScript INFIERE el tipo (más común)
const c = identity(5);       // T inferido como number
const d = identity('hello'); // T inferido como string
const e = identity(true);    // T inferido como boolean

// TypeScript reemplaza T por el tipo real:
//
// identity<number>(5)
// → function identity(value: number): number { return value; }
//
// identity<string>('hello')
// → function identity(value: string): string { return value; }
```

### Funciones genéricas con arrays

```typescript
// ============================================
// GENERICS CON ARRAYS
// ============================================

// Obtener el último elemento
function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

last([1, 2, 3]);         // number | undefined
last(['a', 'b', 'c']);   // string | undefined

// Invertir un array
function reverse<T>(arr: T[]): T[] {
  return [...arr].reverse(); // Copia para no mutar el original
}

reverse([1, 2, 3]);       // number[] → [3, 2, 1]
reverse(['a', 'b']);       // string[] → ['b', 'a']

// Filtrar con predicado genérico
function filter<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate);
}

filter([1, 2, 3, 4], n => n > 2);           // number[] → [3, 4]
filter(['hello', 'hi', 'hey'], s => s.length > 2); // string[] → ['hello', 'hey']
```

### Múltiples parámetros de tipo

```typescript
// ============================================
// MÚLTIPLES TIPOS GENÉRICOS
// ============================================

// Dos tipos distintos: T y U
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

pair('hello', 42);     // [string, number]
pair(true, 'yes');     // [boolean, string]

// Transformar un tipo en otro
function map<T, U>(arr: T[], transform: (item: T) => U): U[] {
  return arr.map(transform);
}

// number[] → string[]
map([1, 2, 3], n => n.toString());     // ['1', '2', '3']

// string[] → number[]
map(['hello', 'hi'], s => s.length);   // [5, 2]

// string[] → boolean[]
map(['a', 'bb', 'ccc'], s => s.length > 1); // [false, true, true]

// T = string, U = number en el segundo ejemplo:
// map<string, number>(['hello', 'hi'], s => s.length)
//     ^^^^^^  ^^^^^^
//     input   output
```

---

## 2. Generics con Constraints (Restricciones)

A veces no querés que T sea CUALQUIER tipo. Querés limitarlo:

```typescript
// ============================================
// SIN CONSTRAINT - T puede ser cualquier cosa
// ============================================

function logLength<T>(item: T): void {
  // console.log(item.length); // ❌ Error: T no tiene .length
  // Un number no tiene .length, un boolean tampoco
  // TypeScript no puede asumir que T tiene .length
}


// ============================================
// CON CONSTRAINT - T DEBE tener .length
// ============================================

// "T extends HasLength" = T debe cumplir con HasLength
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length); // ✅ OK - garantizado que tiene .length
}

logLength('hello');      // ✅ string tiene .length (5)
logLength([1, 2, 3]);   // ✅ array tiene .length (3)
logLength({ length: 10 }); // ✅ objeto con .length (10)
// logLength(123);       // ❌ Error: number no tiene .length
// logLength(true);      // ❌ Error: boolean no tiene .length
```

**Analogía:** `T extends HasLength` es como decir "aceptamos cualquier vehículo que tenga ruedas". Autos, motos, bicicletas → sí. Barcos, aviones → no. No importa QUÉ vehículo sea, mientras tenga ruedas.

### keyof constraint

```typescript
// ============================================
// keyof - Restringir a las keys de un objeto
// ============================================

// "K extends keyof T" = K debe ser una de las propiedades de T

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Alice', age: 25, email: 'alice@mail.com' };

getProperty(user, 'name');    // string ← TypeScript sabe el tipo del retorno
getProperty(user, 'age');     // number
getProperty(user, 'email');   // string
// getProperty(user, 'phone'); // ❌ Error: 'phone' no es key de user

// ¿Cómo funciona?
// T = { name: string; age: number; email: string }
// keyof T = 'name' | 'age' | 'email'
// K extends keyof T = K solo puede ser 'name', 'age', o 'email'
// T[K] = el tipo de esa propiedad
//   T['name'] = string
//   T['age'] = number
```

### Múltiples constraints

```typescript
// ============================================
// MÚLTIPLES CONSTRAINTS
// ============================================

// T debe tener id Y name
interface HasId {
  id: string;
}

interface HasName {
  name: string;
}

// Usar intersection para combinar constraints:
function displayEntity<T extends HasId & HasName>(entity: T): string {
  return `${entity.id}: ${entity.name}`;
}

displayEntity({ id: '1', name: 'Alice', age: 25 }); // ✅ tiene id y name
displayEntity({ id: '2', name: 'Laptop', price: 999 }); // ✅ tiene id y name
// displayEntity({ id: '1' }); // ❌ falta name
// displayEntity({ name: 'Alice' }); // ❌ falta id
```

---

## 3. Interfaces Genéricas

```typescript
// ============================================
// INTERFACES GENÉRICAS
// ============================================

// Interface que se adapta al tipo que le pases:

interface Result<T> {
  success: boolean;
  data: T;
  error?: string;
}

// Usar con distintos tipos:
const userResult: Result<{ name: string; age: number }> = {
  success: true,
  data: { name: 'Alice', age: 25 }
};

const numberResult: Result<number> = {
  success: true,
  data: 42
};

const errorResult: Result<null> = {
  success: false,
  data: null,
  error: 'Not found'
};

// La misma interface Result sirve para CUALQUIER tipo de data


// ============================================
// Interface genérica con múltiples tipos
// ============================================

interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const pair1: KeyValuePair<string, number> = { key: 'age', value: 25 };
const pair2: KeyValuePair<number, string> = { key: 1, value: 'first' };
const pair3: KeyValuePair<string, boolean> = { key: 'active', value: true };


// ============================================
// Interface genérica para respuestas de API
// ============================================

interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
  timestamp: Date;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

// Mismo formato de respuesta, distinto tipo de data:
const userResponse: ApiResponse<User> = {
  status: 200,
  data: { id: '1', name: 'Alice', email: 'alice@mail.com' },
  message: 'Success',
  timestamp: new Date()
};

const productResponse: ApiResponse<Product> = {
  status: 200,
  data: { id: '1', name: 'Laptop', price: 999 },
  message: 'Success',
  timestamp: new Date()
};

// Lista de items:
const usersListResponse: ApiResponse<User[]> = {
  status: 200,
  data: [
    { id: '1', name: 'Alice', email: 'alice@mail.com' },
    { id: '2', name: 'Bob', email: 'bob@mail.com' }
  ],
  message: 'Success',
  timestamp: new Date()
};
```

---

## 4. Clases Genéricas

Esto es **clave para patrones de diseño**. Muchos patrones usan clases genéricas.

```typescript
// ============================================
// CLASE GENÉRICA SIMPLE: Box
// ============================================

class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const numberBox = new Box<number>(123);
numberBox.getValue();    // number → 123
numberBox.setValue(456);  // OK
// numberBox.setValue('texto'); // ❌ Error: string no es number

const stringBox = new Box<string>('hello');
stringBox.getValue();    // string → 'hello'


// ============================================
// CLASE GENÉRICA: Stack (Pila)
// ============================================

// Stack = estructura LIFO (Last In, First Out)
// Como una pila de platos: el último que ponés es el primero que sacás

class Stack<T> {
  private items: T[] = [];

  // Agregar al tope
  push(item: T): void {
    this.items.push(item);
  }

  // Sacar del tope
  pop(): T | undefined {
    return this.items.pop();
  }

  // Ver el tope sin sacarlo
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// Stack de números
const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
numStack.push(3);
numStack.peek();  // 3 (el último)
numStack.pop();   // 3 (lo saca)
numStack.peek();  // 2 (ahora es el último)

// Stack de strings
const strStack = new Stack<string>();
strStack.push('hello');
strStack.push('world');
strStack.pop();   // 'world'


// ============================================
// CLASE GENÉRICA CON CONSTRAINT: Repository
// ============================================

// T DEBE tener id (para poder buscarlo, eliminarlo, etc.)

class Repository<T extends { id: string }> {
  private items: Map<string, T> = new Map();

  add(item: T): void {
    this.items.set(item.id, item);
  }

  getById(id: string): T | undefined {
    return this.items.get(id);
  }

  getAll(): T[] {
    return Array.from(this.items.values());
  }

  remove(id: string): boolean {
    return this.items.delete(id);
  }

  filter(predicate: (item: T) => boolean): T[] {
    return this.getAll().filter(predicate);
  }

  count(): number {
    return this.items.size;
  }
}

// Repository de Users
interface User {
  id: string;
  name: string;
}

const userRepo = new Repository<User>();
userRepo.add({ id: '1', name: 'Alice' });
userRepo.add({ id: '2', name: 'Bob' });
userRepo.getById('1');                          // User | undefined
userRepo.filter(u => u.name.startsWith('A'));   // User[]

// Repository de Products
interface Product {
  id: string;
  name: string;
  price: number;
}

const productRepo = new Repository<Product>();
productRepo.add({ id: '1', name: 'Laptop', price: 999 });
productRepo.filter(p => p.price > 500);  // Product[]

// MISMA clase Repository, distintos tipos de datos
// Esta clase la vas a ver mucho en patrones de diseño
```

**Sobre `Map`:** `Map` es una estructura de datos de JavaScript (como un objeto, pero mejor para colecciones de clave-valor). Las operaciones principales:

```typescript
const mapa = new Map<string, number>();

mapa.set('edad', 25);          // Guardar
mapa.get('edad');               // 25 (obtener)
mapa.has('edad');               // true (existe?)
mapa.delete('edad');            // Eliminar
mapa.size;                      // Cantidad de elementos
Array.from(mapa.values());     // Obtener todos los valores como array
Array.from(mapa.keys());       // Obtener todas las keys como array
```

---

## 5. Utility Types (Generics Incorporados)

TypeScript viene con generics ya creados que son muy útiles:

```typescript
// ============================================
// UTILITY TYPES - Generics que vienen con TypeScript
// ============================================

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}


// ── Partial<T> ──
// Hace TODAS las propiedades opcionales

type PartialUser = Partial<User>;
// Resultado:
// {
//   id?: string;
//   name?: string;
//   email?: string;
//   age?: number;
// }

// Útil para funciones de update (no necesitás pasar TODO):
function updateUser(id: string, updates: Partial<User>): void {
  // updates puede tener 1, 2, 3 o todas las propiedades
}

updateUser('1', { name: 'New Name' });           // ✅ Solo name
updateUser('1', { name: 'Alice', age: 26 });     // ✅ name y age
updateUser('1', {});                              // ✅ Nada (vacío)


// ── Required<T> ──
// Hace TODAS las propiedades obligatorias (opuesto de Partial)

interface Config {
  url: string;
  timeout?: number;
  retries?: number;
}

type RequiredConfig = Required<Config>;
// Resultado:
// {
//   url: string;
//   timeout: number;   ← Ya no es opcional
//   retries: number;   ← Ya no es opcional
// }


// ── Pick<T, Keys> ──
// Selecciona SOLO las propiedades que querés

type UserPreview = Pick<User, 'id' | 'name'>;
// Resultado:
// {
//   id: string;
//   name: string;
// }

// Útil para retornar versiones reducidas:
function getUserPreview(user: User): UserPreview {
  return { id: user.id, name: user.name };
}


// ── Omit<T, Keys> ──
// Quita las propiedades que NO querés (opuesto de Pick)

type UserWithoutEmail = Omit<User, 'email'>;
// Resultado:
// {
//   id: string;
//   name: string;
//   age: number;
// }

// Útil para crear tipos sin campos sensibles:
type PublicUser = Omit<User, 'email' | 'age'>;
// { id: string; name: string; }


// ── Readonly<T> ──
// Hace TODAS las propiedades readonly

type ReadonlyUser = Readonly<User>;
// Resultado:
// {
//   readonly id: string;
//   readonly name: string;
//   readonly email: string;
//   readonly age: number;
// }

const frozenUser: ReadonlyUser = {
  id: '1', name: 'Alice', email: 'alice@mail.com', age: 25
};
// frozenUser.name = 'Bob'; // ❌ Error: readonly


// ── Record<Keys, Type> ──
// Crea un objeto donde TODAS las keys tienen el mismo tipo de valor

type Roles = 'admin' | 'user' | 'guest';

type Permissions = Record<Roles, string[]>;
// Resultado:
// {
//   admin: string[];
//   user: string[];
//   guest: string[];
// }

const permisos: Permissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
};
```

### Resumen visual de Utility Types

```
Partial<User>        → Todas opcionales     { id?: ..., name?: ... }
Required<Config>     → Todas obligatorias    { url: ..., timeout: ... }
Pick<User, 'id'>     → Solo las que elijo    { id: ... }
Omit<User, 'email'>  → Todas menos estas     { id: ..., name: ..., age: ... }
Readonly<User>       → Todas readonly        { readonly id: ..., ... }
Record<Keys, Type>   → Keys con mismo tipo   { admin: string[], user: string[] }
```

### Combinando Utility Types

```typescript
// Se pueden combinar:

// Solo id y name, pero opcionales:
type OptionalPreview = Partial<Pick<User, 'id' | 'name'>>;
// { id?: string; name?: string; }

// Todo readonly excepto name:
type MostlyReadonly = Readonly<Omit<User, 'name'>> & { name: string };
// { readonly id: string; name: string; readonly email: string; readonly age: number; }

// Para updates: omitir id y createdAt, hacer el resto opcional
interface Entity {
  id: string;
  createdAt: Date;
  name: string;
  status: string;
}

type UpdateData = Partial<Omit<Entity, 'id' | 'createdAt'>>;
// { name?: string; status?: string; }
// No podés cambiar id ni createdAt, y el resto es opcional
```

---

## Resumen Visual: Generics

```
FUNCIÓN GENÉRICA:
function nombre<T>(param: T): T { }
function nombre<T, U>(a: T, b: U): [T, U] { }

CON CONSTRAINT:
function nombre<T extends Interface>(param: T): T { }
function nombre<T, K extends keyof T>(obj: T, key: K): T[K] { }

INTERFACE GENÉRICA:
interface Result<T> { success: boolean; data: T; }

CLASE GENÉRICA:
class Stack<T> { push(item: T): void; pop(): T | undefined; }

CON CONSTRAINT EN CLASE:
class Repository<T extends { id: string }> { }

UTILITY TYPES:
Partial<T>  Required<T>  Pick<T, K>  Omit<T, K>  Readonly<T>  Record<K, V>
```

---

## ✅ CHECKLIST PARTE 1

Antes de avanzar, verificá que entendés:

- [ ] Qué problema resuelven los generics (evitar repetición de lógica por tipo)
- [ ] Funciones genéricas con `<T>` y cómo TypeScript infiere T
- [ ] Múltiples parámetros de tipo `<T, U>`
- [ ] Constraints con `extends` (limitar qué tipos acepta T)
- [ ] `keyof` para restringir a propiedades de un objeto
- [ ] Interfaces genéricas (Result<T>, ApiResponse<T>)
- [ ] Clases genéricas (Box<T>, Stack<T>, Repository<T>)
- [ ] Map como estructura de datos
- [ ] Utility types: Partial, Required, Pick, Omit, Readonly, Record

---

**Siguiente:** Día 3 - Parte 2: Classes Avanzadas (cuando estés listo, avisame)
