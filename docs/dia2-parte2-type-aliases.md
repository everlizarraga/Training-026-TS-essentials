# DÍA 2 - PARTE 2: Type Aliases + Union/Intersection

---

## ¿Qué es un Type Alias?

Un type alias es un **nombre** que le das a un tipo. Es como crear un atajo:

```typescript
// Sin alias (verbose):
let userId: string | number = '123';
let productId: string | number = 456;
let orderId: string | number = '789';
// Repetís "string | number" en todos lados

// Con alias (limpio):
type ID = string | number;

let userId: ID = '123';
let productId: ID = 456;
let orderId: ID = '789';
// Definís una vez, usás en todos lados
```

**Analogía:** Es como crear un contacto en el celular. En vez de escribir el número completo cada vez que llamás, le ponés un nombre ("Mamá") y usás ese nombre.

---

## 1. Type Aliases Básicos

```typescript
// ============================================
// TYPE ALIASES BÁSICOS
// ============================================

// Alias de primitivos (dar nombres descriptivos):
type ID = string;
type Age = number;
type IsActive = boolean;

let userId: ID = 'user-123';
let userAge: Age = 25;
let active: IsActive = true;

// Alias de objetos (similar a interface):
type User = {
  id: ID;
  name: string;
  age: Age;
};

const user: User = {
  id: 'user-1',
  name: 'Alice',
  age: 25
};

// Alias de arrays:
type StringList = string[];
type NumberList = number[];

const nombres: StringList = ['Alice', 'Bob'];
const edades: NumberList = [25, 30];

// Alias de funciones:
type Formatter = (value: number) => string;

const formatPrice: Formatter = (value) => `$${value.toFixed(2)}`;
const formatPercent: Formatter = (value) => `${value}%`;
```

---

## 2. Union Types (el poder real de Type Aliases)

Un union type dice: "puede ser ESTE tipo **O** ESTE otro". Se escribe con `|` (pipe).

**Esto es algo que las interfaces NO pueden hacer.**

```typescript
// ============================================
// UNION TYPES - "Uno u otro"
// ============================================

// Union de primitivos:
type StringOrNumber = string | number;

let valor: StringOrNumber = 'texto';  // ✅ OK (es string)
valor = 123;                           // ✅ OK (es number)
// valor = true;                       // ❌ Error (boolean no está en la unión)


// Union de strings literales (MUY COMÚN):
type Status = 'pending' | 'approved' | 'rejected';

let estado: Status = 'pending';   // ✅ OK
// estado = 'cancelled';          // ❌ Error: 'cancelled' no es Status

// Esto es como un enum pero más ligero
// Solo puede ser uno de esos 3 valores exactos


// Más ejemplos de unions de strings literales:
type Direction = 'up' | 'down' | 'left' | 'right';
type Size = 'small' | 'medium' | 'large';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type Role = 'admin' | 'user' | 'guest';
```

### Narrowing (Estrechamiento de tipos)

Cuando tenés un union type, TypeScript no sabe cuál de los tipos es. Necesitás **estrechar** (narrowing) para usar métodos específicos:

```typescript
// ============================================
// NARROWING - Estrechar el tipo con verificaciones
// ============================================

type StringOrNumber = string | number;

function formatValue(value: StringOrNumber): string {
  // Acá TypeScript sabe que value es string | number
  // No podés usar .toUpperCase() directamente (¿y si es number?)
  // No podés usar .toFixed() directamente (¿y si es string?)

  // SOLUCIÓN: verificar el tipo primero
  if (typeof value === 'string') {
    // Acá DENTRO, TypeScript sabe que es string
    return value.toUpperCase(); // ✅ OK
  }

  // Si llegó acá, TypeScript sabe que es number (el único que queda)
  return value.toFixed(2); // ✅ OK
}

formatValue('hello');  // "HELLO"
formatValue(19.999);   // "20.00"
```

```
Flujo visual del narrowing:

value: string | number
         │
    ┌────┴────┐
    │ typeof  │
    │ check   │
    └────┬────┘
    ┌────┴────────────────┐
    │                     │
 string               number
 (puede usar          (puede usar
  .toUpperCase()       .toFixed()
  .includes()          .toString()
  .split()             etc.)
  etc.)
```

### Discriminated Unions (Uniones Discriminadas)

Este es un patrón MUY poderoso. Objetos que comparten una propiedad "tipo" que los distingue:

```typescript
// ============================================
// DISCRIMINATED UNIONS
// Objetos con una propiedad "type" que los diferencia
// ============================================

type PaymentMethod =
  | { type: 'credit-card'; cardNumber: string; cvv: string }
  | { type: 'paypal'; email: string }
  | { type: 'cash' };

// Cada variante tiene propiedades distintas
// Pero TODAS comparten "type" → es el discriminante

function processPayment(payment: PaymentMethod): string {
  // Usás switch sobre el discriminante:
  switch (payment.type) {
    case 'credit-card':
      // Acá TypeScript SABE que tiene cardNumber y cvv
      return `Procesando tarjeta: ****${payment.cardNumber.slice(-4)}`;

    case 'paypal':
      // Acá TypeScript SABE que tiene email
      return `Procesando PayPal: ${payment.email}`;

    case 'cash':
      // Acá TypeScript SABE que solo tiene type
      return 'Procesando efectivo';
  }
}

processPayment({ type: 'credit-card', cardNumber: '1234567890', cvv: '123' });
processPayment({ type: 'paypal', email: 'alice@mail.com' });
processPayment({ type: 'cash' });

// ¿Por qué es tan bueno?
// 1. TypeScript verifica que cubras TODOS los cases
// 2. Dentro de cada case, sabés exactamente qué propiedades tiene
// 3. Si agregás un nuevo type, TypeScript te avisa dónde falta manejar
```

**Analogía:** Pensá en sobres de correo. Todos son "sobres" (tipo base), pero un sobre certificado tiene número de tracking, un sobre urgente tiene fecha límite, y un sobre normal no tiene nada extra. El "tipo de envío" escrito en el sobre te dice qué datos buscar.

```
┌─────────────────────────────────────────────┐
│              PaymentMethod                   │
│                                              │
│  ┌──────────────┐  type = 'credit-card'     │
│  │ cardNumber   │  Tiene: cardNumber, cvv    │
│  │ cvv          │                            │
│  └──────────────┘                            │
│                                              │
│  ┌──────────────┐  type = 'paypal'          │
│  │ email        │  Tiene: email              │
│  └──────────────┘                            │
│                                              │
│  ┌──────────────┐  type = 'cash'            │
│  │ (nada extra) │  Tiene: solo type          │
│  └──────────────┘                            │
└─────────────────────────────────────────────┘
```

---

## 3. Intersection Types (Combinar tipos)

Mientras union (`|`) dice "uno u otro", intersection (`&`) dice "los dos a la vez":

```typescript
// ============================================
// INTERSECTION TYPES - "Ambos a la vez"
// ============================================

type HasId = {
  id: string;
};

type HasTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};

type HasName = {
  name: string;
};

// Intersection: COMBINA todo
type Entity = HasId & HasTimestamps & HasName;

// Entity tiene TODAS las propiedades de los 3 tipos:
const entity: Entity = {
  id: '1',              // de HasId
  createdAt: new Date(), // de HasTimestamps
  updatedAt: new Date(), // de HasTimestamps
  name: 'Test'           // de HasName
};

// Si te falta alguna propiedad → ❌ Error


// Ejemplo práctico:
type UserBase = {
  name: string;
  email: string;
};

type WithRole = {
  role: 'admin' | 'user' | 'guest';
};

type WithId = {
  id: string;
};

// Combinaciones a medida:
type UserWithRole = UserBase & WithRole;
type UserComplete = UserBase & WithRole & WithId;

const admin: UserComplete = {
  id: '1',
  name: 'Alice',
  email: 'alice@mail.com',
  role: 'admin'
};
```

### Union vs Intersection (comparación visual)

```
UNION (|) = "UNO u OTRO"
─────────────────────────
type A = { x: number };
type B = { y: number };
type AorB = A | B;

// Puede ser A:
const val1: AorB = { x: 1 };         // ✅
// Puede ser B:
const val2: AorB = { y: 2 };         // ✅
// Puede ser ambos:
const val3: AorB = { x: 1, y: 2 };   // ✅


INTERSECTION (&) = "AMBOS a la vez"
────────────────────────────────────
type AandB = A & B;

// DEBE tener todo:
const val: AandB = { x: 1, y: 2 };   // ✅
// const mal: AandB = { x: 1 };       // ❌ Falta y
// const mal2: AandB = { y: 2 };      // ❌ Falta x
```

---

## 4. Interface vs Type (Cuándo usar cada uno)

Esta es una pregunta muy común. Acá va la guía clara:

```typescript
// ============================================
// ¿CUÁNDO USAR INTERFACE?
// ============================================

// ✅ Para definir la forma de OBJETOS:
interface User {
  id: string;
  name: string;
}

// ✅ Para definir CONTRATOS que las clases deben cumplir:
interface Drawable {
  draw(): void;
}

// ✅ Cuando necesitás HERENCIA (extends):
interface Admin extends User {
  permissions: string[];
}


// ============================================
// ¿CUÁNDO USAR TYPE?
// ============================================

// ✅ Para UNION types (interface NO puede):
type Status = 'active' | 'inactive';
type ID = string | number;

// ✅ Para INTERSECTION types:
type AdminUser = User & { permissions: string[] };

// ✅ Para TUPLES:
type Coordinate = [number, number];

// ✅ Para alias de PRIMITIVOS:
type Age = number;
type Email = string;

// ✅ Para DISCRIMINATED UNIONS:
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; side: number };
```

### Regla simple para recordar:

```
¿Es un objeto/contrato?           → interface
¿Es una unión, tupla o primitivo?  → type
¿Podría ser cualquiera?            → interface (convención de la industria)
```

En la práctica, para objetos simples ambos funcionan igual. La diferencia real aparece cuando necesitás unions o intersections (solo type) o herencia con extends y clases (interface es más natural).

---

## 5. Combinando Todo (Ejemplo Real)

```typescript
// ============================================
// EJEMPLO REAL: Sistema de notificaciones
// ============================================

// ── Types para valores específicos ──
type NotificationType = 'email' | 'sms' | 'push';
type Priority = 'low' | 'medium' | 'high';
type Status = 'pending' | 'sent' | 'failed';

// ── Interface para la estructura base ──
interface Notification {
  readonly id: string;
  type: NotificationType;
  message: string;
  priority: Priority;
  status: Status;
  createdAt: Date;
}

// ── Discriminated union para los canales ──
type NotificationChannel =
  | { channel: 'email'; to: string; subject: string }
  | { channel: 'sms'; phoneNumber: string }
  | { channel: 'push'; deviceToken: string; title: string };

// ── Intersection: Notification + Channel ──
type FullNotification = Notification & NotificationChannel;

// ── Funciones ──
function createNotification(
  message: string,
  priority: Priority,
  channel: NotificationChannel
): FullNotification {
  return {
    id: Date.now().toString(),
    type: channel.channel === 'email' ? 'email'
        : channel.channel === 'sms' ? 'sms'
        : 'push',
    message,
    priority,
    status: 'pending',
    createdAt: new Date(),
    ...channel
  };
}

function sendNotification(notification: FullNotification): string {
  switch (notification.channel) {
    case 'email':
      return `Email enviado a ${notification.to}: ${notification.subject}`;
    case 'sms':
      return `SMS enviado a ${notification.phoneNumber}`;
    case 'push':
      return `Push enviado a device ${notification.deviceToken}: ${notification.title}`;
  }
}

// ── Uso ──
const emailNotif = createNotification(
  'Tu pedido fue enviado',
  'high',
  { channel: 'email', to: 'alice@mail.com', subject: 'Pedido enviado' }
);

sendNotification(emailNotif);
// "Email enviado a alice@mail.com: Pedido enviado"

// Acá ves el poder:
// - Types para valores restrictivos (Priority, Status)
// - Interface para estructura de objetos (Notification)
// - Discriminated union para variantes (NotificationChannel)
// - Intersection para combinar todo (FullNotification)
```

---

## Resumen Visual

```
TYPE ALIAS:
type Nombre = tipo;                          // Alias simple
type Union = 'a' | 'b' | 'c';               // Union de literales
type NumOrStr = number | string;             // Union de tipos
type Combined = TypeA & TypeB;               // Intersection

NARROWING (para unions):
if (typeof valor === 'string') { ... }       // Para primitivos
switch (objeto.type) { ... }                 // Para discriminated unions

INTERFACE vs TYPE:
Objetos/Contratos    → interface
Unions/Tuples/Alias  → type
```

---

## ✅ CHECKLIST PARTE 2

Antes de avanzar, verificá que entendés:

- [ ] Qué es un type alias y cómo se define
- [ ] Union types con `|` (primitivos y string literals)
- [ ] Narrowing con `typeof` para estrechar tipos
- [ ] Discriminated unions (objetos con propiedad discriminante)
- [ ] Intersection types con `&` (combinar tipos)
- [ ] Diferencia entre union (`|` = uno u otro) e intersection (`&` = ambos)
- [ ] Cuándo usar interface vs type

---

**Siguiente:** Día 2 - Parte 3: Enums + Ejercicios (cuando estés listo, avisame)
