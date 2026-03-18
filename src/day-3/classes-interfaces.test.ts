import {
  Shape,
  Rectangle,
  Circle,
  Triangle,
  getTotalArea,
  getLargestShape,
  Vehicle,
  Car,
  Motorcycle
} from './classes-interfaces';

describe('Ejercicio 3: Classes + Interfaces + Abstract', () => {

  // ── Shapes ──
  describe('Rectangle', () => {
    const rect = new Rectangle(4, 3);

    test('should calculate area', () => {
      expect(rect.getArea()).toBe(12);
    });

    test('should calculate perimeter', () => {
      expect(rect.getPerimeter()).toBe(14);
    });

    test('should describe', () => {
      expect(rect.describe()).toBe('Rectangle: 4x3');
    });
  });

  describe('Circle', () => {
    const circle = new Circle(5);

    test('should calculate area', () => {
      expect(circle.getArea()).toBeCloseTo(78.5398, 2);
    });

    test('should calculate perimeter', () => {
      expect(circle.getPerimeter()).toBeCloseTo(31.4159, 2);
    });

    test('should describe', () => {
      expect(circle.describe()).toBe('Circle: radius 5');
    });
  });

  describe('Triangle', () => {
    const tri = new Triangle(6, 4, 5, 6, 5);

    test('should calculate area', () => {
      expect(tri.getArea()).toBe(12);
    });

    test('should calculate perimeter', () => {
      expect(tri.getPerimeter()).toBe(16);
    });

    test('should describe', () => {
      expect(tri.describe()).toBe('Triangle: base 6, height 4');
    });
  });

  describe('getTotalArea', () => {
    test('should sum all areas', () => {
      const shapes: Shape[] = [
        new Rectangle(4, 3),   // 12
        new Rectangle(2, 5)    // 10
      ];
      expect(getTotalArea(shapes)).toBe(22);
    });

    test('should handle empty array', () => {
      expect(getTotalArea([])).toBe(0);
    });

    test('should work with mixed shapes', () => {
      const shapes: Shape[] = [
        new Rectangle(10, 10),  // 100
        new Circle(1)           // ~3.14
      ];
      expect(getTotalArea(shapes)).toBeCloseTo(103.1416, 2);
    });
  });

  describe('getLargestShape', () => {
    test('should find largest shape', () => {
      const small = new Rectangle(2, 2);   // 4
      const big = new Rectangle(10, 10);   // 100
      const medium = new Circle(3);        // ~28.27

      const largest = getLargestShape([small, big, medium]);
      expect(largest).toBe(big);
    });

    test('should return undefined for empty array', () => {
      expect(getLargestShape([])).toBeUndefined();
    });

    test('should handle single shape', () => {
      const only = new Circle(5);
      expect(getLargestShape([only])).toBe(only);
    });
  });

  // ── Vehicles ──
  describe('Car', () => {
    let car: Car;

    beforeEach(() => {
      car = new Car('Toyota', 2024, 4);
    });

    test('should start with 0 speed', () => {
      expect(car.speed).toBe(0);
    });

    test('should accelerate', () => {
      car.accelerate(50);
      expect(car.speed).toBe(50);
    });

    test('should brake', () => {
      car.accelerate(50);
      car.brake(20);
      expect(car.speed).toBe(30);
    });

    test('should not go below 0 speed', () => {
      car.accelerate(10);
      car.brake(50);
      expect(car.speed).toBe(0);
    });

    test('should honk', () => {
      expect(car.honk()).toBe('Beep beep!');
    });

    test('should get doors', () => {
      expect(car.getDoors()).toBe(4);
    });

    test('should get info', () => {
      car.accelerate(60);
      expect(car.getInfo()).toBe('Toyota (2024) - 60 km/h');
    });
  });

  describe('Motorcycle', () => {
    let moto: Motorcycle;

    beforeEach(() => {
      moto = new Motorcycle('Yamaha', 2023);
    });

    test('should honk', () => {
      expect(moto.honk()).toBe('Vroom!');
    });

    test('should do wheelie', () => {
      expect(moto.wheelie()).toBe('Yamaha does a wheelie!');
    });

    test('should get info', () => {
      moto.accelerate(100);
      expect(moto.getInfo()).toBe('Yamaha (2023) - 100 km/h');
    });
  });

  describe('Polimorfismo', () => {
    test('should treat all vehicles as Vehicle', () => {
      const vehicles: Vehicle[] = [
        new Car('Toyota', 2024, 4),
        new Motorcycle('Yamaha', 2023)
      ];

      // Todos pueden honk (cada uno a su manera)
      const honks = vehicles.map(v => v.honk());
      expect(honks).toEqual(['Beep beep!', 'Vroom!']);
    });
  });
});
