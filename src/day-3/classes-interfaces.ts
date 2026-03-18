// ============================================
// EJERCICIO 3: Classes + Interfaces + Abstract
// ============================================

// TODO: Definir interface Shape
//
// Métodos:
// - getArea(): number
// - getPerimeter(): number
// - describe(): string

export interface Shape {
  // TU CÓDIGO AQUÍ
  getArea(): number;
  getPerimeter(): number;
  describe(): string;
}


// TODO: Implementar clase Rectangle que implemente Shape
//
// Constructor: (width: number, height: number)
// - getArea()      → width * height
// - getPerimeter() → 2 * (width + height)
// - describe()     → "Rectangle: [width]x[height]"
//
// Ejemplo:
//   new Rectangle(4, 3).getArea() → 12
//   new Rectangle(4, 3).describe() → "Rectangle: 4x3"

export class Rectangle implements Shape {
  // TU CÓDIGO AQUÍ
  // Usá shorthand en constructor
  constructor(
    public width: number,
    public height: number
  ){};

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
  
  describe(): string {
    return `Rectangle: ${this.width}x${this.height}`;
  }
}


// TODO: Implementar clase Circle que implemente Shape
//
// Constructor: (radius: number)
// - getArea()      → Math.PI * radius * radius
// - getPerimeter() → 2 * Math.PI * radius
// - describe()     → "Circle: radius [radius]"
//
// Ejemplo:
//   new Circle(5).describe() → "Circle: radius 5"

export class Circle implements Shape {
  // TU CÓDIGO AQUÍ
  // Usá shorthand en constructor
  constructor(
    public radius: number
  ) {};

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }

  describe(): string {
    return `Circle: radius ${this.radius}`;
  }
}


// TODO: Implementar clase Triangle que implemente Shape
//
// Constructor: (base: number, height: number, sideA: number, sideB: number, sideC: number)
// - base y height son para calcular el área
// - sideA, sideB, sideC son los 3 lados para el perímetro
// - getArea()      → (base * height) / 2
// - getPerimeter() → sideA + sideB + sideC
// - describe()     → "Triangle: base [base], height [height]"
//
// Ejemplo:
//   new Triangle(6, 4, 5, 6, 5).getArea() → 12

export class Triangle implements Shape {
  // TU CÓDIGO AQUÍ
  constructor(
    public base: number,
    public height: number,
    public sideA: number,
    public sideB: number,
    public sideC: number
  ) {};

  getArea(): number {
    return (this.base * this.height) / 2;
  }

  getPerimeter(): number {
    return this.sideA + this.sideB + this.sideC;
  }

  describe(): string {
    return `Triangle: base ${this.base}, height ${this.height}`;
  }
}


// TODO: Función que calcula el área total de un array de Shapes
//
// DEBE:
// - Recibir un array de Shape
// - Retornar la suma de todas las áreas
//
// Ejemplo:
//   getTotalArea([new Rectangle(4, 3), new Circle(5)]) → 12 + 78.54 = 90.54

export function getTotalArea(shapes: Shape[]): number {
  // TU CÓDIGO AQUÍ
  return shapes.reduce((acum, e) => acum + e.getArea(), 0);
}


// TODO: Función que encuentra la shape con mayor área
//
// DEBE:
// - Recibir un array de Shape
// - Retornar la Shape con el área más grande
// - Si el array está vacío, retornar undefined
//
// Ejemplo:
//   getLargestShape([new Rectangle(4, 3), new Circle(5)])
//   → el Circle (78.54 > 12)

export function getLargestShape(shapes: Shape[]): Shape | undefined {
  // TU CÓDIGO AQUÍ
  if(shapes.length === 0) return undefined;
  return shapes.reduce((acc, e) => {
    if(e.getArea() > acc.getArea()) return e;
    else return acc;
  }, shapes[0]);
}


// ============================================
// ABSTRACT CLASS + HERENCIA
// ============================================

// TODO: Implementar abstract class Vehicle
//
// Constructor: (brand: string, year: number)   ← usar shorthand
// Propiedad privada: _speed: number = 0
//
// Getter: speed → retorna _speed
//
// Métodos concretos:
// - accelerate(amount: number): void → Suma amount a _speed (no menor a 0)
// - brake(amount: number): void      → Resta amount de _speed (no menor a 0)
// - getInfo(): string                → "[brand] ([year]) - [_speed] km/h"
//
// Método abstracto:
// - honk(): string → Cada vehículo tiene su propio sonido

export abstract class Vehicle {
  // TU CÓDIGO AQUÍ
  constructor(
    public brand: string,
    public year: number,
    private _speed: number = 0
  ) {};

  
  get speed() : number {
    return this._speed;
  }

  set speed(value: number) {
    this._speed = value;
  }

  accelerate(amount: number): void {
    if( amount >= 0) this._speed += amount;
  }

  brake(amount: number): void {
    if(amount >= 0) this._speed = Math.max(this._speed - amount, 0);
  }
  
  getInfo(): string {
    return `${this.brand} (${this.year}) - ${this._speed} km/h`;
  }

  abstract honk(): string;
}


// TODO: Implementar clase Car que extiende Vehicle
//
// Constructor: (brand: string, year: number, doors: number)
// - honk() → "Beep beep!"
// - Método propio: getDoors() → retorna doors

export class Car extends Vehicle {
  // TU CÓDIGO AQUÍ
  constructor(
    brand:string,
    year: number,
    private doors: number
  ) {
    super(brand, year);
  };

  honk(): string {
    return 'Beep beep!';
  }

  getDoors(): number {
    return this.doors;
  }
}


// TODO: Implementar clase Motorcycle que extiende Vehicle
//
// Constructor: (brand: string, year: number)
// - honk() → "Vroom!"
// - Método propio: wheelie() → "[brand] does a wheelie!"

export class Motorcycle extends Vehicle {
  // TU CÓDIGO AQUÍ
  constructor(
    brand: string,
    year: number
  ) {
    super(brand, year);
  };

  honk(): string {
    return 'Vroom!';
  }

  wheelie(): string {
    return `${this.brand} does a wheelie!`;
  }
}

