# DÍA 1 - PARTE 2: Types Básicos

---

## ¿Qué cambia de JavaScript a TypeScript?

En JavaScript, las variables pueden ser cualquier cosa en cualquier momento:

```javascript
// JavaScript - Sin tipos
let edad = 25;        // número
edad = 'veinticinco'; // ahora es string... ¿y nadie se queja?
edad = true;          // ahora es boolean... caos total

// El error aparece EN PRODUCCIÓN cuando tu app explota
```

En TypeScript, le decís a cada variable QUÉ TIPO de dato puede contener:

```typescript
// TypeScript - Con tipos
let edad: number = 25;
edad = 'veinticinco'; // ❌ ERROR en compile-time (antes de ejecutar)
                       // Type 'string' is not assignable to type 'number'
```

**Analogía:** JavaScript es como una caja sin etiqueta, le metés lo que sea. TypeScript es una caja con etiqueta que dice "SOLO NÚMEROS" y si intentás meter un string, te avisa antes de que todo se rompa.

```
JavaScript:  Errores aparecen cuando el usuario usa la app 💥
TypeScript:  Errores aparecen mientras programás ✅ (tu editor te avisa)
```

---

## 1. Tipos Primitivos

Son los tipos más básicos. Los mismos que ya conocés de JavaScript, pero ahora con nombre explícito.

### La sintaxis es simple:

```typescript
// La estructura siempre es:
// let/const nombreVariable: tipo = valor;
//                          ^^^^
//                    Esto es la ANOTACIÓN DE TIPO
```

### String

```typescript
// ============================================
// STRING - Texto
// ============================================

let nombre: string = 'Alice';           // Comillas simples
let apellido: string = "Smith";         // Comillas dobles
let saludo: string = `Hola ${nombre}`;  // Template literal (backticks)

// ❌ Esto falla:
// nombre = 123;
// Error: Type 'number' is not assignable to type 'string'
```

### Number

```typescript
// ============================================
// NUMBER - Números (enteros y decimales, todo es number)
// ============================================

let edad: number = 25;          // Entero
let precio: number = 19.99;     // Decimal
let negativo: number = -10;     // Negativo
let hex: number = 0xf00d;       // Hexadecimal

// ❌ Esto falla:
// edad = '25';
// Error: Type 'string' is not assignable to type 'number'

// En TypeScript NO hay diferencia entre int y float
// Todo es "number" (igual que en JavaScript)
```

### Boolean

```typescript
// ============================================
// BOOLEAN - true o false (y nada más)
// ============================================

let isActive: boolean = true;
let isCompleted: boolean = false;

// ❌ Esto falla:
// isActive = 'true';
// Error: Type 'string' is not assignable to type 'boolean'

// ⚠️ Cuidado: 'true' (string) NO es lo mismo que true (boolean)
```

### Null y Undefined

```typescript
// ============================================
// NULL y UNDEFINED - Son tipos separados en TypeScript
// ============================================

let valorNull: null = null;
let valorUndefined: undefined = undefined;

// Con strictNullChecks (que tenemos activado en tsconfig):
let nombre: string = 'Alice';
// nombre = null;      // ❌ Error: null no es string
// nombre = undefined; // ❌ Error: undefined no es string

// Si QUERÉS permitir null, lo declarás explícitamente:
let nombreOpcional: string | null = 'Alice';
nombreOpcional = null; // ✅ OK porque dijiste que puede ser string O null
```

---

## 2. Tipos Especiales de TypeScript

Estos NO existen en JavaScript. Son exclusivos de TypeScript.

### Any (evitar)

```typescript
// ============================================
// ANY - Acepta cualquier tipo (ROMPE el propósito de TypeScript)
// ============================================

let cualquierCosa: any = 'texto';
cualquierCosa = 123;     // ✅ OK (no se queja)
cualquierCosa = true;    // ✅ OK (no se queja)
cualquierCosa.metodoInventado(); // ✅ OK (no se queja... pero EXPLOTA en runtime)

// ⚠️ "any" básicamente DESACTIVA TypeScript para esa variable
// Es como volver a JavaScript
// Usalo SOLO como último recurso temporal
```

### Unknown (mejor alternativa a any)

```typescript
// ============================================
// UNKNOWN - "No sé qué tipo es, pero voy a verificar antes de usar"
// ============================================

let valorDesconocido: unknown = 'texto';

// ❌ No podés usarlo directamente (TypeScript te protege):
// valorDesconocido.toUpperCase();
// Error: Object is of type 'unknown'

// ✅ Primero verificás el tipo, después lo usás:
if (typeof valorDesconocido === 'string') {
  // Acá DENTRO, TypeScript sabe que es string
  console.log(valorDesconocido.toUpperCase()); // ✅ OK
}

// Diferencia clave:
// any    → "Confiá en mí, yo sé lo que hago" (peligroso)
// unknown → "No sé qué es, verificá antes de usar" (seguro)
```

### Void

```typescript
// ============================================
// VOID - Para funciones que NO retornan nada
// ============================================

// Esta función hace algo pero no retorna un valor
function logMensaje(mensaje: string): void {
  console.log(mensaje);
  // No hay return (o return sin valor)
}

// Si intentás usar el "retorno" de una función void:
// const resultado = logMensaje('Hola');
// resultado sería "undefined" - no tiene sentido usarlo
```

### Never

```typescript
// ============================================
// NEVER - Para funciones que NUNCA terminan normalmente
// ============================================

// Función que SIEMPRE lanza error (nunca retorna)
function lanzarError(mensaje: string): never {
  throw new Error(mensaje);
}

// Función con loop infinito (nunca retorna)
function loopInfinito(): never {
  while (true) {
    // Nunca sale de acá
  }
}

// ¿Cuándo usarlo? Raramente, pero es útil para que TypeScript
// entienda que después de llamar a esta función, el código de abajo
// es inalcanzable.
```

---

## 3. Inferencia de Tipos (Type Inference)

TypeScript es inteligente. Si le das un valor, ADIVINA el tipo sin que se lo digas:

```typescript
// ============================================
// TYPE INFERENCE - TypeScript adivina el tipo
// ============================================

// ✅ CON anotación explícita (vos le decís el tipo):
let nombre: string = 'Alice';
let edad: number = 25;
let activo: boolean = true;

// ✅ SIN anotación (TypeScript lo infiere solo):
let nombre2 = 'Alice';   // TypeScript sabe que es string
let edad2 = 25;           // TypeScript sabe que es number
let activo2 = true;       // TypeScript sabe que es boolean

// Ambas formas son válidas. Si ponés el mouse sobre nombre2
// en VS Code, vas a ver: let nombre2: string

// ¿Cuándo usar cada una?

// INFERENCIA (sin anotar) - Cuando el tipo es obvio:
let precio = 19.99;                    // Obvio que es number
let mensaje = 'Hola';                  // Obvio que es string
const items = [1, 2, 3];              // Obvio que es number[]

// ANOTACIÓN EXPLÍCITA - Cuando el tipo no es obvio o querés ser claro:
let datos: string | number = 'texto';  // Podría ser string o number
let resultado: number;                 // Declarás sin valor inicial

// En FUNCIONES siempre es buena práctica anotar parámetros:
function sumar(a: number, b: number): number {
  return a + b;
}
// Los parámetros a y b NO se pueden inferir (TypeScript no sabe
// qué le vas a pasar), así que los tipás explícitamente.
// El retorno SÍ se puede inferir (a + b = number), pero
// anotarlo hace el código más claro.
```

---

## 4. Funciones Tipadas

En TypeScript, las funciones se tipan en dos lugares: **parámetros** y **retorno**.

```typescript
// ============================================
// FUNCIONES - Tipando parámetros y retorno
// ============================================

// Estructura:
// function nombre(param1: tipo, param2: tipo): tipoRetorno {
//                 ^^^^^^^^^^^^^  ^^^^^^^^^^^^^  ^^^^^^^^^^^
//                 Parámetro 1    Parámetro 2    Qué retorna
// }

// Ejemplo básico:
function sumar(a: number, b: number): number {
  return a + b;
}

sumar(5, 3);        // ✅ OK → retorna 8
// sumar('5', 3);   // ❌ Error: '5' no es number
// sumar(5);        // ❌ Error: faltan argumentos

// Parámetros opcionales (con ?):
function saludar(nombre: string, titulo?: string): string {
  //                              ^^^^^^
  //                     El ? significa OPCIONAL
  if (titulo) {
    return `Hola ${titulo} ${nombre}`;
  }
  return `Hola ${nombre}`;
}

saludar('Alice');           // ✅ "Hola Alice"
saludar('Alice', 'Dr.');   // ✅ "Hola Dr. Alice"

// Parámetros con valor por defecto:
function crearUsuario(nombre: string, rol: string = 'user'): string {
  //                                      ^^^^^^^^^^^^^^^
  //                              Si no le pasás rol, usa 'user'
  return `${nombre} (${rol})`;
}

crearUsuario('Alice');           // ✅ "Alice (user)"
crearUsuario('Alice', 'admin');  // ✅ "Alice (admin)"
```

### Arrow functions tipadas

```typescript
// ============================================
// ARROW FUNCTIONS - Misma lógica, sintaxis diferente
// ============================================

// Arrow function tipada:
const multiplicar = (a: number, b: number): number => {
  return a * b;
};

// Arrow function corta (return implícito):
const duplicar = (n: number): number => n * 2;

// Arrow function sin retorno:
const log = (mensaje: string): void => {
  console.log(mensaje);
};
```

---

## 5. Arrays Tipados

```typescript
// ============================================
// ARRAYS - Colección de un mismo tipo
// ============================================

// Sintaxis 1: tipo[] (la más común)
let numeros: number[] = [1, 2, 3, 4, 5];
let nombres: string[] = ['Alice', 'Bob', 'Charlie'];
let flags: boolean[] = [true, false, true];

// Sintaxis 2: Array<tipo> (genérica - la verás en Día 3)
let numeros2: Array<number> = [1, 2, 3];

// TypeScript protege el contenido del array:
numeros.push(6);        // ✅ OK (es number)
// numeros.push('7');   // ❌ Error: string no es number

// Inferencia en arrays:
let frutas = ['manzana', 'banana', 'naranja']; // TypeScript infiere string[]
// frutas.push(123);   // ❌ Error: number no es string

// Array vacío - ACÁ sí necesitás anotar:
let items: string[] = [];    // ✅ TypeScript sabe que solo acepta strings
items.push('item1');          // ✅ OK

// Sin anotación en array vacío:
let cosas = [];              // TypeScript infiere any[] ⚠️ peligroso
// Siempre anotá arrays vacíos
```

### Readonly arrays

```typescript
// ============================================
// READONLY ARRAYS - No se pueden modificar
// ============================================

const constantes: readonly number[] = [1, 2, 3];
// constantes.push(4);    // ❌ Error: push no existe en readonly number[]
// constantes[0] = 99;    // ❌ Error: readonly

// Útil cuando querés garantizar que nadie modifique el array
```

---

## 6. Tuples (Tuplas)

Un tuple es un **array con cantidad fija de elementos y tipos específicos por posición**.

```typescript
// ============================================
// TUPLES - Array con tipos fijos por posición
// ============================================

// Un tuple [string, number] significa:
// Posición 0 → DEBE ser string
// Posición 1 → DEBE ser number
// Exactamente 2 elementos

let persona: [string, number] = ['Alice', 25];

// ✅ Acceder por posición:
console.log(persona[0]); // 'Alice' (TypeScript sabe que es string)
console.log(persona[1]); // 25 (TypeScript sabe que es number)

// ❌ Orden incorrecto:
// let mal: [string, number] = [25, 'Alice'];
// Error: number no va en posición 0, string no va en posición 1

// ❌ Cantidad incorrecta:
// let corto: [string, number] = ['Alice'];
// Error: faltan elementos

// Ejemplo real: coordenadas
let coordenada: [number, number] = [40.7128, -74.0060];

// Ejemplo real: clave-valor
let entrada: [string, number] = ['edad', 25];

// Tuple con elemento opcional:
let flexible: [string, number?] = ['Alice'];     // ✅ OK
let flexible2: [string, number?] = ['Alice', 25]; // ✅ OK
```

### ¿Cuándo usar tuple vs array?

```typescript
// ARRAY: Cuando tenés N elementos del mismo tipo
let scores: number[] = [85, 90, 78, 92]; // Cantidad variable, mismo tipo

// TUPLE: Cuando cada posición tiene significado específico
let resultado: [string, number] = ['aprobado', 95]; // Posición fija, tipos distintos

// Si tu "array" siempre tiene exactamente 2 elementos y cada uno
// es de tipo distinto → probablemente querés un tuple.
```

---

## 7. Object Types (Inline)

Podés tipar objetos directamente (sin crear interfaces, eso es Día 2):

```typescript
// ============================================
// OBJECT TYPES - Tipar objetos inline
// ============================================

// Objeto con tipos explícitos:
let usuario: { name: string; age: number; email: string } = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com'
};

// ❌ No podés agregar propiedades que no declaraste:
// usuario.telefono = '123';
// Error: 'telefono' does not exist

// ❌ No podés omitir propiedades declaradas:
// let mal: { name: string; age: number } = { name: 'Alice' };
// Error: falta 'age'

// Propiedades opcionales (con ?):
let config: { url: string; timeout?: number } = {
  url: 'https://api.example.com'
  // timeout es opcional, no hace falta ponerlo
};

config.timeout = 5000; // ✅ Podés asignarlo después

// Propiedades readonly:
let punto: { readonly x: number; readonly y: number } = {
  x: 10,
  y: 20
};
// punto.x = 5; // ❌ Error: no podés modificar una propiedad readonly
```

### Objetos como parámetros de función

```typescript
// ============================================
// OBJETOS EN FUNCIONES
// ============================================

// Función que recibe un objeto tipado:
function mostrarUsuario(usuario: { name: string; age: number }): string {
  return `${usuario.name} tiene ${usuario.age} años`;
}

mostrarUsuario({ name: 'Alice', age: 25 }); // ✅ OK
// mostrarUsuario({ name: 'Alice' });        // ❌ Error: falta age

// Esto funciona pero es VERBOSE (mucho texto)
// En el Día 2 aprenderás INTERFACES que resuelven esto:
//
// interface User { name: string; age: number; }
// function mostrarUsuario(usuario: User): string { ... }
//
// Mucho más limpio. Por ahora, inline funciona para entender el concepto.
```

---

## 8. Type Assertions (Aserciones de Tipo)

A veces VOS sabés más que TypeScript sobre qué tipo es algo:

```typescript
// ============================================
// TYPE ASSERTIONS - "Confiá en mí, yo sé qué tipo es"
// ============================================

// Situación: tenés un valor que TypeScript ve como un tipo general,
// pero vos SABÉS que es un tipo más específico.

// Sintaxis con "as":
let valor: unknown = 'Hola Mundo';

// TypeScript no sabe que es string (es unknown)
// Pero VOS sabés que es string, entonces:
let longitud: number = (valor as string).length;
// "as string" le dice a TypeScript: "tratá esto como string"

// ⚠️ CUIDADO: TypeScript te CREE. Si mentís, explota en runtime:
let numero: unknown = 123;
let texto = (numero as string).toUpperCase();
// TypeScript no se queja... pero explota al ejecutar
// porque 123 no tiene .toUpperCase()

// REGLA: Solo usá "as" cuando REALMENTE sabés el tipo.
// Preferí siempre typeof checks (como con unknown arriba).
```

---

## Resumen Visual: Cuándo Usar Cada Tipo

```
¿Qué tipo necesitás?

Texto              → string
Número             → number
Verdadero/Falso    → boolean
Nada               → null / undefined
Cualquier cosa     → unknown (NO any)
Sin retorno        → void (en funciones)
Nunca retorna      → never (errores, loops infinitos)

Lista de cosas     → tipo[]     (ej: number[], string[])
Posiciones fijas   → [tipo, tipo] (tuple)
Objeto             → { key: tipo; key2: tipo }
```

---

## ✅ CHECKLIST PARTE 2

Antes de avanzar a los ejercicios, verificá que entendés:

- [ ] Diferencia entre JavaScript (sin tipos) y TypeScript (con tipos)
- [ ] Los 3 tipos primitivos principales: string, number, boolean
- [ ] null y undefined como tipos separados
- [ ] Diferencia entre any (peligroso) y unknown (seguro)
- [ ] void y never en funciones
- [ ] Type inference (TypeScript adivina el tipo)
- [ ] Cómo tipar funciones (parámetros + retorno)
- [ ] Parámetros opcionales (?) y con valor por defecto (=)
- [ ] Arrays tipados (number[], string[])
- [ ] Tuples ([string, number])
- [ ] Object types inline ({ key: tipo })
- [ ] Propiedades opcionales (?) y readonly

---

**Siguiente:** Día 1 - Parte 3: Ejercicios + Tests (cuando estés listo, avisame)
