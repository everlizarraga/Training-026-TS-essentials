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
  return rectangle.width * rectangle.height;
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
  return {
    name,
    age,
    email: email?? 'no-email'
  };
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
  return {...config1, ...config2};
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
  const hayStock: string = product.inStock ? '(Available)' : '(Out of Stock)';
  const precioFomrateado = `$${product.price.toFixed(2)}`;
  return `${product.name} - ${precioFomrateado} ${hayStock}`;
}
