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
  const cumpleArroba: boolean = email.includes('@');
  const cumplePunto : boolean = email.includes('.');
  return cumpleArroba && cumplePunto;
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
  return `$${price.toFixed(2)}`;
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
  if(discount) return price * (100-discount)/100;
  return price;
}

