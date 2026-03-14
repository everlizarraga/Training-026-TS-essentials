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
  return numbers.filter(n => n%2 === 0);
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
  const max: number = Math.max(...numbers);
  const min: number = Math.min(...numbers);
  return [min, max];
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
  return `${person[0]} (${person[1]})`;
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
  return numbers.reduce((acum, n) => acum + n, 0);
}
