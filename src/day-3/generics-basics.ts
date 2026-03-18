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
  return [b, a];
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
  return arr.filter((e) => predicate(e));
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
  return arr.map(e => mapper(e));
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
  return items.find(e => e.id === id);
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
  return obj[key];
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
  return {...original, ...updates};
}
