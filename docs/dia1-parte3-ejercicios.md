# DÍA 1 - PARTE 3: Ejercicios + Tests

---

## Cómo trabajar los ejercicios

```
1. Leé el ejemplo resuelto primero (estudialo, no lo copies)
2. Abrí los archivos .ts y .test.ts que vas a crear
3. Ejecutá los tests en modo watch: npm run test:watch
4. Implementá cada función hasta que los tests pasen
5. Si te trabás más de 15 min → mirá los hints
```

**Archivos que vas a crear:**

```
src/day-1/
├── basics.ts                ← Ejercicio 1: Type annotations
├── basics.test.ts           ← Tests ejercicio 1
├── arrays-tuples.ts         ← Ejercicio 2: Arrays y tuples
├── arrays-tuples.test.ts    ← Tests ejercicio 2
├── object-types.ts          ← Ejercicio 3: Object types
└── object-types.test.ts     ← Tests ejercicio 3
```

**Comando para correr tests en modo watch:**

```bash
npm run test:watch
```

Esto re-ejecuta los tests cada vez que guardás un archivo. Dejalo corriendo en una terminal mientras trabajás.

---

## EJEMPLO RESUELTO (estudiá esto primero)

Antes de arrancar, mirá cómo se ve un ejercicio completo resuelto:

### Archivo: ejemplo.ts

```typescript
// ============================================
// EJEMPLO: Función que verifica si un número es par
// ============================================

// Recibe un número, retorna boolean
// El tipo del parámetro es "number"
// El tipo del retorno es "boolean"
export function isEven(num: number): boolean {
  return num % 2 === 0;
}

// ============================================
// EJEMPLO: Función que repite un string N veces
// ============================================

// "times" es opcional (?) - si no lo pasás, vale 1
// Cuando un parámetro es opcional, su tipo es "number | undefined"
// Por eso usamos valor por defecto (= 1)
export function repeatString(text: string, times: number = 1): string {
  return text.repeat(times);
}
```

### Archivo: ejemplo.test.ts

```typescript
import { isEven, repeatString } from './ejemplo';

describe('Ejemplo resuelto', () => {
  test('isEven should return true for even numbers', () => {
    expect(isEven(4)).toBe(true);
    expect(isEven(0)).toBe(true);
  });

  test('isEven should return false for odd numbers', () => {
    expect(isEven(3)).toBe(false);
    expect(isEven(7)).toBe(false);
  });

  test('repeatString should repeat text', () => {
    expect(repeatString('ha', 3)).toBe('hahaha');
  });

  test('repeatString should default to 1 repetition', () => {
    expect(repeatString('ha')).toBe('ha');
  });
});
```

### ¿Cómo se conecta todo?

```
ejemplo.ts                          ejemplo.test.ts
──────────                          ────────────────
export function isEven(...)    ←    import { isEven } from './ejemplo'
                                    
La función se EXPORTA          →    El test la IMPORTA
con "export"                        con "import { } from './archivo'"
                                    (sin la extensión .ts)
```

**Nota sobre imports:** Usás `'./ejemplo'` sin `.ts` al final. TypeScript/Node resuelven la extensión solos.

---

## EJERCICIO 1: Type Annotations

⏱️ **TIEMPO LÍMITE:** 30 min

---

### Creá: `src/day-1/basics.ts`

```typescript
// ============================================
// EJERCICIO 1: Type Annotations
// ============================================

// TODO: Crear función que valide email
//
// DEBE:
// - Recibir un string (el email)
// - Retornar boolean
// - Verificar que contenga "@" Y que contenga "."
// - Ambas condiciones deben cumplirse
//
// Ejemplo:
//   validateEmail('test@example.com') → true
//   validateEmail('invalid')          → false

export function validateEmail(email: string): boolean {
  // TU CÓDIGO AQUÍ
}


// TODO: Crear función que formatee precio
//
// DEBE:
// - Recibir un number (el precio)
// - Retornar string con formato "$XX.XX"
// - Siempre mostrar 2 decimales
//
// Ejemplo:
//   formatPrice(19.99) → "$19.99"
//   formatPrice(100)   → "$100.00"
//
// PISTA: Buscá qué método de number te da decimales fijos

export function formatPrice(price: number): string {
  // TU CÓDIGO AQUÍ
}


// TODO: Crear función que aplique descuento
//
// DEBE:
// - Recibir precio (number, obligatorio)
// - Recibir descuento (number, OPCIONAL)
// - Si hay descuento: restarlo del precio como porcentaje
// - Si NO hay descuento: retornar precio original
// - Retornar number
//
// Ejemplo:
//   applyDiscount(100, 10) → 90   (10% de 100 = 10, 100-10 = 90)
//   applyDiscount(100)     → 100  (sin descuento)

export function applyDiscount(price: number, discount?: number): number {
  // TU CÓDIGO AQUÍ
}
```

### Creá: `src/day-1/basics.test.ts`

```typescript
import { validateEmail, formatPrice, applyDiscount } from './basics';

describe('Ejercicio 1: Type Annotations', () => {

  // Tests para validateEmail
  describe('validateEmail', () => {
    test('should return true for valid email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    test('should return true for another valid email', () => {
      expect(validateEmail('user@domain.org')).toBe(true);
    });

    test('should return false for string without @', () => {
      expect(validateEmail('invalid.com')).toBe(false);
    });

    test('should return false for string without .', () => {
      expect(validateEmail('invalid@com')).toBe(false);
    });

    test('should return false for empty string', () => {
      expect(validateEmail('')).toBe(false);
    });
  });

  // Tests para formatPrice
  describe('formatPrice', () => {
    test('should format price with decimals', () => {
      expect(formatPrice(19.99)).toBe('$19.99');
    });

    test('should add .00 to whole numbers', () => {
      expect(formatPrice(100)).toBe('$100.00');
    });

    test('should handle zero', () => {
      expect(formatPrice(0)).toBe('$0.00');
    });

    test('should round to 2 decimals', () => {
      expect(formatPrice(19.999)).toBe('$20.00');
    });
  });

  // Tests para applyDiscount
  describe('applyDiscount', () => {
    test('should apply discount percentage', () => {
      expect(applyDiscount(100, 10)).toBe(90);
    });

    test('should apply 50% discount', () => {
      expect(applyDiscount(200, 50)).toBe(100);
    });

    test('should return original price without discount', () => {
      expect(applyDiscount(100)).toBe(100);
    });

    test('should handle zero discount', () => {
      expect(applyDiscount(100, 0)).toBe(100);
    });
  });
});
```

### 💡 HINTS (solo si te trabás más de 15 min):

**Hint 1 (validateEmail):** Los strings tienen un método que verifica si contienen un substring. Pensá en qué método de string devuelve true/false.

**Hint 2 (formatPrice):** Existe un método de number que formatea con cantidad fija de decimales y retorna string. Después solo necesitás concatenar el "$" adelante.

**Hint 3 (applyDiscount):** Recordá que un parámetro opcional (`?`) puede ser `undefined`. ¿Cómo verificás si tiene valor?

---

## EJERCICIO 2: Arrays y Tuples

⏱️ **TIEMPO LÍMITE:** 30 min

---

### Creá: `src/day-1/arrays-tuples.ts`

```typescript
// ============================================
// EJERCICIO 2: Arrays y Tuples
// ============================================

// TODO: Crear función que filtre números pares
//
// DEBE:
// - Recibir un array de números
// - Retornar un nuevo array solo con los pares
//
// Ejemplo:
//   filterEven([1, 2, 3, 4, 5]) → [2, 4]
//   filterEven([1, 3, 5])       → []

export function filterEven(numbers: number[]): number[] {
  // TU CÓDIGO AQUÍ
}


// TODO: Crear función que retorne el mínimo y máximo de un array
//
// DEBE:
// - Recibir un array de números
// - Retornar un TUPLE [min, max]
// - Posición 0 = mínimo
// - Posición 1 = máximo
//
// Ejemplo:
//   minMax([3, 1, 4, 1, 5, 9]) → [1, 9]
//   minMax([5])                 → [5, 5]
//
// PISTA: Math tiene métodos útiles. Investigá cómo pasar un array a Math.min

export function minMax(numbers: number[]): [number, number] {
  // TU CÓDIGO AQUÍ
}


// TODO: Crear función que formatee persona como string
//
// DEBE:
// - Recibir un TUPLE [string, number] (nombre, edad)
// - Retornar string con formato "Nombre (Edad)"
//
// Ejemplo:
//   formatPerson(['Alice', 25]) → 'Alice (25)'
//   formatPerson(['Bob', 30])   → 'Bob (30)'

export function formatPerson(person: [string, number]): string {
  // TU CÓDIGO AQUÍ
}


// TODO: Crear función que sume todos los números de un array
//
// DEBE:
// - Recibir un array de números
// - Retornar la suma total
// - Si el array está vacío, retornar 0
//
// Ejemplo:
//   sumAll([1, 2, 3, 4]) → 10
//   sumAll([])            → 0

export function sumAll(numbers: number[]): number {
  // TU CÓDIGO AQUÍ
}
```

### Creá: `src/day-1/arrays-tuples.test.ts`

```typescript
import { filterEven, minMax, formatPerson, sumAll } from './arrays-tuples';

describe('Ejercicio 2: Arrays y Tuples', () => {

  // Tests para filterEven
  describe('filterEven', () => {
    test('should return only even numbers', () => {
      expect(filterEven([1, 2, 3, 4, 5])).toEqual([2, 4]);
    });

    test('should return empty array when no evens', () => {
      expect(filterEven([1, 3, 5])).toEqual([]);
    });

    test('should handle empty array', () => {
      expect(filterEven([])).toEqual([]);
    });

    test('should handle all even numbers', () => {
      expect(filterEven([2, 4, 6])).toEqual([2, 4, 6]);
    });
  });

  // Tests para minMax
  describe('minMax', () => {
    test('should return [min, max]', () => {
      expect(minMax([3, 1, 4, 1, 5, 9])).toEqual([1, 9]);
    });

    test('should handle single element', () => {
      expect(minMax([5])).toEqual([5, 5]);
    });

    test('should handle negative numbers', () => {
      expect(minMax([-5, -1, -10, 0])).toEqual([-10, 0]);
    });

    test('should handle already sorted', () => {
      expect(minMax([1, 2, 3])).toEqual([1, 3]);
    });
  });

  // Tests para formatPerson
  describe('formatPerson', () => {
    test('should format person tuple', () => {
      expect(formatPerson(['Alice', 25])).toBe('Alice (25)');
    });

    test('should format another person', () => {
      expect(formatPerson(['Bob', 30])).toBe('Bob (30)');
    });
  });

  // Tests para sumAll
  describe('sumAll', () => {
    test('should sum all numbers', () => {
      expect(sumAll([1, 2, 3, 4])).toBe(10);
    });

    test('should return 0 for empty array', () => {
      expect(sumAll([])).toBe(0);
    });

    test('should handle single number', () => {
      expect(sumAll([5])).toBe(5);
    });

    test('should handle negative numbers', () => {
      expect(sumAll([10, -5, 3])).toBe(8);
    });
  });
});
```

### 💡 HINTS (solo si te trabás más de 15 min):

**Hint 1 (filterEven):** Recordá el método de array que filtra elementos según una condición. El operador módulo (%) te ayuda a saber si es par.

**Hint 2 (minMax):** `Math.min()` y `Math.max()` no reciben arrays directamente. ¿Cómo "expandís" un array en argumentos individuales? Pensá en el spread operator.

**Hint 3 (sumAll):** Hay un método de array que "reduce" todos los elementos a un solo valor acumulándolos. Acepta un valor inicial como segundo argumento.

---

## EJERCICIO 3: Object Types

⏱️ **TIEMPO LÍMITE:** 30 min

---

### Creá: `src/day-1/object-types.ts`

```typescript
// ============================================
// EJERCICIO 3: Object Types
// ============================================

// TODO: Crear función que calcule área de rectángulo
//
// DEBE:
// - Recibir un objeto con width y height (ambos number)
// - Retornar el área (number)
//
// Ejemplo:
//   calculateArea({ width: 5, height: 3 }) → 15
//   calculateArea({ width: 10, height: 10 }) → 100

export function calculateArea(rectangle: { width: number; height: number }): number {
  // TU CÓDIGO AQUÍ
}


// TODO: Crear función que cree un usuario
//
// DEBE:
// - Recibir name (string, obligatorio)
// - Recibir age (number, obligatorio)
// - Recibir email (string, OPCIONAL)
// - Retornar un objeto con las 3 propiedades
// - Si email no se pasa, debe ser "no-email" en el objeto retornado
//
// Ejemplo:
//   createUser('Alice', 25, 'alice@mail.com')
//   → { name: 'Alice', age: 25, email: 'alice@mail.com' }
//
//   createUser('Bob', 30)
//   → { name: 'Bob', age: 30, email: 'no-email' }

export function createUser(
  name: string,
  age: number,
  email?: string
): { name: string; age: number; email: string } {
  // TU CÓDIGO AQUÍ
}


// TODO: Crear función que haga merge de dos configs
//
// DEBE:
// - Recibir config1 (objeto con url string, timeout opcional number)
// - Recibir config2 (mismo tipo)
// - Retornar un nuevo objeto que combine ambos
// - config2 tiene prioridad (sus valores sobreescriben los de config1)
//
// Ejemplo:
//   mergeConfig(
//     { url: 'http://old.com', timeout: 3000 },
//     { url: 'http://new.com' }
//   )
//   → { url: 'http://new.com', timeout: 3000 }
//
// PISTA: Pensá en el spread operator con objetos

export function mergeConfig(
  config1: { url: string; timeout?: number },
  config2: { url: string; timeout?: number }
): { url: string; timeout?: number } {
  // TU CÓDIGO AQUÍ
}


// TODO: Crear función que describa un producto
//
// DEBE:
// - Recibir un objeto producto con:
//   - name: string
//   - price: number
//   - inStock: boolean
// - Retornar un string descriptivo:
//   - Si está en stock: "ProductName - $XX.XX (Available)"
//   - Si NO está en stock: "ProductName - $XX.XX (Out of Stock)"
// - El precio debe tener 2 decimales
//
// Ejemplo:
//   describeProduct({ name: 'Laptop', price: 999.9, inStock: true })
//   → 'Laptop - $999.90 (Available)'
//
//   describeProduct({ name: 'Mouse', price: 25, inStock: false })
//   → 'Mouse - $25.00 (Out of Stock)'

export function describeProduct(product: {
  name: string;
  price: number;
  inStock: boolean;
}): string {
  // TU CÓDIGO AQUÍ
}
```

### Creá: `src/day-1/object-types.test.ts`

```typescript
import { calculateArea, createUser, mergeConfig, describeProduct } from './object-types';

describe('Ejercicio 3: Object Types', () => {

  // Tests para calculateArea
  describe('calculateArea', () => {
    test('should calculate area of rectangle', () => {
      expect(calculateArea({ width: 5, height: 3 })).toBe(15);
    });

    test('should handle square', () => {
      expect(calculateArea({ width: 10, height: 10 })).toBe(100);
    });

    test('should handle decimals', () => {
      expect(calculateArea({ width: 2.5, height: 4 })).toBe(10);
    });
  });

  // Tests para createUser
  describe('createUser', () => {
    test('should create user with email', () => {
      expect(createUser('Alice', 25, 'alice@mail.com')).toEqual({
        name: 'Alice',
        age: 25,
        email: 'alice@mail.com'
      });
    });

    test('should create user without email', () => {
      expect(createUser('Bob', 30)).toEqual({
        name: 'Bob',
        age: 30,
        email: 'no-email'
      });
    });
  });

  // Tests para mergeConfig
  describe('mergeConfig', () => {
    test('should merge configs with config2 priority', () => {
      const result = mergeConfig(
        { url: 'http://old.com', timeout: 3000 },
        { url: 'http://new.com' }
      );
      expect(result.url).toBe('http://new.com');
      expect(result.timeout).toBe(3000);
    });

    test('should override timeout from config2', () => {
      const result = mergeConfig(
        { url: 'http://api.com', timeout: 3000 },
        { url: 'http://api.com', timeout: 5000 }
      );
      expect(result.timeout).toBe(5000);
    });

    test('should work with minimal configs', () => {
      const result = mergeConfig(
        { url: 'http://a.com' },
        { url: 'http://b.com' }
      );
      expect(result.url).toBe('http://b.com');
    });
  });

  // Tests para describeProduct
  describe('describeProduct', () => {
    test('should describe in-stock product', () => {
      expect(describeProduct({ name: 'Laptop', price: 999.9, inStock: true }))
        .toBe('Laptop - $999.90 (Available)');
    });

    test('should describe out-of-stock product', () => {
      expect(describeProduct({ name: 'Mouse', price: 25, inStock: false }))
        .toBe('Mouse - $25.00 (Out of Stock)');
    });

    test('should handle zero price', () => {
      expect(describeProduct({ name: 'Free Item', price: 0, inStock: true }))
        .toBe('Free Item - $0.00 (Available)');
    });
  });
});
```

### 💡 HINTS (solo si te trabás más de 15 min):

**Hint 1 (calculateArea):** Es más simple de lo que pensás. ¿Cómo calculás el área de un rectángulo?

**Hint 2 (createUser):** Un parámetro opcional puede ser `undefined`. ¿Cómo retornás un valor por defecto si no te lo pasaron? Pensá en el operador `??` o en un ternario.

**Hint 3 (mergeConfig):** El spread operator con objetos combina propiedades. Si dos objetos tienen la misma propiedad, ¿cuál gana? El orden importa.

**Hint 4 (describeProduct):** Ya resolviste formateo de precio en el ejercicio 1. Reutilizá la misma lógica. Para el estado, un ternario resuelve.

---

## Una vez que termines los 3 ejercicios

Ejecutá todos los tests juntos:

```bash
npm test
```

Deberías ver algo así:

```
PASS  src/day-1/basics.test.ts
PASS  src/day-1/arrays-tuples.test.ts
PASS  src/day-1/object-types.test.ts

Test Suites: 3 passed, 3 total
Tests:       X passed, X total
```

Después hacé commit:

```bash
git add .
git commit -m "Day 1: Type annotations, arrays, tuples, object types - all tests passing"
git push
```

---

## ✅ CHECKLIST DÍA 1 COMPLETO

- [ ] Setup funcionando (build + tests)
- [ ] Ejercicio 1: Todas las funciones implementadas, tests en verde
- [ ] Ejercicio 2: Todas las funciones implementadas, tests en verde
- [ ] Ejercicio 3: Todas las funciones implementadas, tests en verde
- [ ] Todos los tests pasan con `npm test`
- [ ] Commit pusheado a GitHub
- [ ] Entendés tipos primitivos (string, number, boolean)
- [ ] Entendés parámetros opcionales (?)
- [ ] Entendés arrays tipados y tuples
- [ ] Entendés object types inline
- [ ] Entendés export/import entre archivos

---

**Siguiente:** Día 2 - Parte 1: Interfaces (cuando tengas todo en verde, avisame)
