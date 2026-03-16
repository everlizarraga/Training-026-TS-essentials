// ============================================
// EJERCICIO 1: Interfaces
// ============================================

// TODO: Definir interface Product
//
// Propiedades:
// - id: string (readonly)
// - name: string
// - price: number
// - category: string

export interface Product {
  // TU CÓDIGO AQUÍ
  readonly id: string;
  name: string;
  price: number;
  category: string;
}


// TODO: Definir interface CartItem que EXTIENDE Product
//
// Propiedades adicionales:
// - quantity: number

export interface CartItem extends Product {
  // TU CÓDIGO AQUÍ
  quantity: number;
}


// TODO: Función que calcula el total del carrito
//
// DEBE:
// - Recibir un array de CartItem
// - Retornar la suma de (price * quantity) de cada item
//
// Ejemplo:
//   calculateCartTotal([
//     { id: '1', name: 'Laptop', price: 1000, category: 'tech', quantity: 1 },
//     { id: '2', name: 'Mouse', price: 25, category: 'tech', quantity: 2 }
//   ]) → 1050

export function calculateCartTotal(items: CartItem[]): number {
  // TU CÓDIGO AQUÍ
  return items.reduce((acum, item) => acum + item.price*item.quantity, 0);
}


// TODO: Definir interface para función de descuento
//
// La función recibe un price (number) y retorna un number

export interface DiscountFunction {
  // TU CÓDIGO AQUÍ
  (price: number): number;
}


// TODO: Función que aplica descuento a un producto
//
// DEBE:
// - Recibir un Product
// - Recibir una DiscountFunction
// - Retornar un NUEVO Product (no modificar el original)
//   con el precio modificado por la función de descuento
//
// Ejemplo:
//   const halfOff: DiscountFunction = (price) => price * 0.5;
//   applyDiscountToProduct(
//     { id: '1', name: 'Laptop', price: 1000, category: 'tech' },
//     halfOff
//   ) → { id: '1', name: 'Laptop', price: 500, category: 'tech' }

export function applyDiscountToProduct(
  product: Product,
  discountFn: DiscountFunction
): Product {
  // TU CÓDIGO AQUÍ
  return {
    ...product,
    price: discountFn(product.price)
  };
}


// TODO: Función que filtra productos por rango de precio
//
// DEBE:
// - Recibir un array de Product
// - Recibir min (number)
// - Recibir max (number)
// - Retornar solo los productos cuyo precio esté entre min y max (inclusivo)
//
// Ejemplo:
//   filterByPriceRange(products, 10, 100)
//   → solo productos con precio >= 10 Y <= 100

export function filterByPriceRange(
  products: Product[],
  min: number,
  max: number
): Product[] {
  // TU CÓDIGO AQUÍ
  return products.filter(p => p.price >= min && p.price <= max);
}
