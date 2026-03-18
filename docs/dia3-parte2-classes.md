# DÍA 3 - PARTE 2: Classes Avanzadas

---

## Classes en TypeScript vs JavaScript

Ya conocés clases de JavaScript. TypeScript agrega tres cosas clave:

```
JavaScript Classes:              TypeScript Classes:
─────────────────               ──────────────────
✅ constructor                   ✅ constructor
✅ métodos                       ✅ métodos
✅ herencia (extends)            ✅ herencia (extends)
❌ tipos en propiedades          ✅ tipos en propiedades
❌ modificadores de acceso       ✅ public / private / protected
❌ abstract classes              ✅ abstract classes
❌ implements interface          ✅ implements interface
❌ shorthand en constructor      ✅ shorthand en constructor
```

---

## 1. Propiedades Tipadas y Modificadores de Acceso

```typescript
// ============================================
// MODIFICADORES DE ACCESO
// ============================================

class User {
  // public: accesible desde cualquier lugar (default)
  public name: string;

  // private: SOLO accesible dentro de esta clase
  private password: string;

  // protected: accesible en esta clase Y en subclases (hijos)
  protected role: string;

  // readonly: no se puede reasignar después del constructor
  readonly id: string;

  constructor(id: string, name: string, password: string, role: string) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.role = role;
  }

  // Método público (accesible desde afuera)
  public getDisplayName(): string {
    return `${this.name} (${this.role})`;
  }

  // Método privado (solo dentro de la clase)
  private hashPassword(): string {
    return `hashed_${this.password}`;
  }

  // Método público que usa el privado internamente
  public validatePassword(input: string): boolean {
    return this.password === input;
  }
}

const user = new User('1', 'Alice', 'secret123', 'admin');

user.name;              // ✅ public → accesible
user.getDisplayName();  // ✅ public → accesible
// user.password;       // ❌ private → Error
// user.hashPassword(); // ❌ private → Error
// user.role;           // ❌ protected → Error
// user.id = '2';       // ❌ readonly → Error
```

Resumen visual:

```
                    Dentro de    Subclases    Fuera de
                    la clase     (hijos)      la clase
                    ─────────    ─────────    ────────
public              ✅           ✅           ✅
protected           ✅           ✅           ❌
private             ✅           ❌           ❌
readonly            ✅ (solo     ✅ (solo     ✅ (solo
                     constructor) leer)       leer)
```

---

## 2. Shorthand en Constructor

TypeScript tiene un atajo para no repetir declaración + asignación:

```typescript
// ============================================
// SIN SHORTHAND (verbose)
// ============================================

class ProductLargo {
  public id: string;
  public name: string;
  private price: number;

  constructor(id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}


// ============================================
// CON SHORTHAND (compacto) - Mismo resultado
// ============================================

class Product {
  // Al poner el modificador (public/private/protected/readonly)
  // DIRECTAMENTE en el parámetro del constructor,
  // TypeScript declara la propiedad Y la asigna automáticamente

  constructor(
    public id: string,
    public name: string,
    private price: number
  ) {}
  // El cuerpo del constructor puede quedar vacío
  // TypeScript hace el this.id = id, this.name = name, etc. solo

  getPrice(): number {
    return this.price;
  }
}

const product = new Product('1', 'Laptop', 999);
product.id;         // ✅ '1'
product.name;       // ✅ 'Laptop'
// product.price;   // ❌ private
product.getPrice(); // ✅ 999

// Ambas versiones generan EXACTAMENTE el mismo código
// El shorthand es solo azúcar sintáctica de TypeScript
```

---

## 3. Getters y Setters

```typescript
// ============================================
// GETTERS Y SETTERS
// ============================================

class Temperature {
  // Almacenamos internamente en Celsius
  private _celsius: number;

  constructor(celsius: number) {
    this._celsius = celsius;
  }

  // GETTER: se accede como propiedad, no como método
  get celsius(): number {
    return this._celsius;
  }

  // SETTER: se asigna como propiedad, no como método
  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error('Temperature below absolute zero');
    }
    this._celsius = value;
  }

  // Getter calculado: Fahrenheit desde Celsius
  get fahrenheit(): number {
    return this._celsius * 9 / 5 + 32;
  }

  set fahrenheit(value: number) {
    this._celsius = (value - 32) * 5 / 9;
  }
}

const temp = new Temperature(100);

// Se USAN como propiedades (sin paréntesis):
console.log(temp.celsius);     // 100 (llama al getter)
console.log(temp.fahrenheit);  // 212 (llama al getter)

temp.celsius = 0;              // Llama al setter
console.log(temp.fahrenheit);  // 32

temp.fahrenheit = 212;         // Llama al setter de fahrenheit
console.log(temp.celsius);     // 100

// La convención es usar _ para la propiedad privada:
// private _celsius  ← el dato real
// get celsius       ← acceso controlado
// set celsius       ← asignación con validación
```

---

## 4. Herencia (extends)

```typescript
// ============================================
// HERENCIA - extends
// ============================================

// Clase padre
class Animal {
  constructor(
    public name: string,
    protected sound: string
  ) {}

  makeSound(): string {
    return `${this.name} says ${this.sound}`;
  }

  move(): string {
    return `${this.name} is moving`;
  }
}

// Clase hija - hereda TODO de Animal
class Dog extends Animal {
  constructor(name: string) {
    // super() llama al constructor del padre
    // Es OBLIGATORIO llamarlo antes de usar "this"
    super(name, 'Woof');
  }

  // Método propio (solo de Dog)
  fetch(item: string): string {
    return `${this.name} fetches the ${item}`;
  }

  // OVERRIDE: reemplazar un método del padre
  move(): string {
    return `${this.name} runs on 4 legs`;
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name, 'Meow');
  }

  // Método propio de Cat
  purr(): string {
    return `${this.name} purrs...`;
  }

  move(): string {
    return `${this.name} moves silently`;
  }
}

const dog = new Dog('Rex');
dog.makeSound();  // "Rex says Woof" (heredado de Animal)
dog.move();       // "Rex runs on 4 legs" (override)
dog.fetch('ball'); // "Rex fetches the ball" (propio)

const cat = new Cat('Whiskers');
cat.makeSound();  // "Whiskers says Meow"
cat.move();       // "Whiskers moves silently"
cat.purr();       // "Whiskers purrs..."

// Polimorfismo: tratar hijos como tipo del padre
const animals: Animal[] = [dog, cat];
animals.forEach(a => console.log(a.move()));
// "Rex runs on 4 legs"
// "Whiskers moves silently"
// Cada uno ejecuta SU versión de move()
```

```
       Animal
      (name, sound)
      makeSound()
      move()
       /       \
      /         \
   Dog          Cat
  fetch()      purr()
  move()↑      move()↑
  (override)   (override)
```

---

## 5. Abstract Classes

Una clase abstracta **no se puede instanciar directamente**. Sirve como "plantilla" que otros deben completar.

```typescript
// ============================================
// ABSTRACT CLASSES
// ============================================

abstract class Shape {
  // Propiedad normal
  constructor(public color: string) {}

  // Método ABSTRACTO: NO tiene implementación
  // Las subclases DEBEN implementarlo
  abstract getArea(): number;
  abstract getPerimeter(): number;

  // Método CONCRETO: tiene implementación
  // Las subclases lo heredan tal cual (o pueden hacer override)
  describe(): string {
    return `${this.color} shape with area ${this.getArea().toFixed(2)}`;
  }
}

// ❌ No podés crear una instancia directamente:
// const shape = new Shape('red');
// Error: Cannot create an instance of an abstract class

// ✅ Debés crear subclases que implementen los métodos abstractos:

class Circle extends Shape {
  constructor(
    color: string,
    public radius: number
  ) {
    super(color);
  }

  // OBLIGATORIO implementar los abstractos:
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(
    color: string,
    public width: number,
    public height: number
  ) {
    super(color);
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// Uso:
const circle = new Circle('red', 5);
circle.getArea();      // 78.54
circle.getPerimeter(); // 31.42
circle.describe();     // "red shape with area 78.54" (heredado)

const rect = new Rectangle('blue', 4, 3);
rect.getArea();        // 12
rect.getPerimeter();   // 14
rect.describe();       // "blue shape with area 12.00"

// Polimorfismo con abstract class:
const shapes: Shape[] = [circle, rect];
shapes.forEach(s => console.log(s.describe()));
// Cada shape ejecuta SU getArea() dentro de describe()
```

**¿Cuándo usar abstract class?**

```
INTERFACE:
- Solo define la FIRMA (qué métodos/propiedades debe tener)
- No tiene implementación de nada
- Una clase puede implementar MUCHAS interfaces

ABSTRACT CLASS:
- Define la firma de algunos métodos (abstract)
- PUEDE tener implementación de otros métodos (concretos)
- Una clase solo puede heredar de UNA abstract class

Regla:
- ¿Solo necesitás definir un contrato? → interface
- ¿Querés compartir código entre subclases? → abstract class
```

---

## 6. Implements (Classes que cumplen Interfaces)

```typescript
// ============================================
// IMPLEMENTS - Clase que cumple un contrato
// ============================================

// La interface define QUÉ debe tener
interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

interface Printable {
  print(): void;
}

// La clase implementa el contrato
// Una clase puede implementar MÚLTIPLES interfaces
class Document implements Serializable, Printable {
  constructor(
    public title: string,
    public content: string
  ) {}

  // OBLIGATORIO: todos los métodos de Serializable
  serialize(): string {
    return JSON.stringify({ title: this.title, content: this.content });
  }

  deserialize(data: string): void {
    const parsed = JSON.parse(data);
    this.title = parsed.title;
    this.content = parsed.content;
  }

  // OBLIGATORIO: todos los métodos de Printable
  print(): void {
    console.log(`=== ${this.title} ===\n${this.content}`);
  }
}

// Verificación en compile-time:
// Si te falta implementar algún método → ❌ Error inmediato

// Podés usar la interface como tipo:
function saveToFile(item: Serializable): void {
  const data = item.serialize();
  // Guardar data...
}

saveToFile(new Document('Test', 'Content')); // ✅ Document es Serializable
```

### Diferencia entre extends e implements

```typescript
// ============================================
// extends vs implements
// ============================================

// extends = HERENCIA (heredás código del padre)
class Animal {
  move(): string { return 'moving'; }
}

class Dog extends Animal {
  // Dog YA TIENE move() heredado, no necesita implementarlo
  bark(): string { return 'woof'; }
}


// implements = CONTRATO (prometés cumplir la interface)
interface Movable {
  move(): string;
}

class Car implements Movable {
  // Car DEBE implementar move() desde cero
  // No hereda nada, solo promete tener el método
  move(): string { return 'driving'; }
}


// Se pueden combinar:
interface HasSound {
  makeSound(): string;
}

class Cat extends Animal implements HasSound {
  // Hereda move() de Animal (extends)
  // DEBE implementar makeSound() de HasSound (implements)
  makeSound(): string { return 'meow'; }
}
```

```
EXTENDS (herencia):
  Padre ──código──→ Hijo
  "Te doy mi código, usalo"

IMPLEMENTS (contrato):
  Interface ──contrato──→ Clase
  "Prometé que vas a tener estos métodos"

COMBINADOS:
  Padre ──código──→ Hijo ←──contrato── Interface
  "Heredás código del padre Y cumplís el contrato de la interface"
```

---

## 7. Static Members

Propiedades y métodos que pertenecen a la **clase misma**, no a las instancias:

```typescript
// ============================================
// STATIC - Pertenece a la clase, no a la instancia
// ============================================

class MathUtils {
  // Propiedad estática
  static PI: number = 3.14159;

  // Métodos estáticos
  static square(x: number): number {
    return x * x;
  }

  static cube(x: number): number {
    return x * x * x;
  }

  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
}

// Se usan SIN crear instancia (directamente con la clase):
MathUtils.PI;            // 3.14159
MathUtils.square(5);     // 25
MathUtils.cube(3);       // 27
MathUtils.clamp(15, 0, 10); // 10

// NO necesitás hacer "new MathUtils()"
// Los métodos estáticos son como funciones agrupadas bajo un nombre


// ============================================
// STATIC + INSTANCIA (combinados)
// ============================================

class User {
  // Contador estático compartido entre TODAS las instancias
  private static nextId: number = 1;

  public id: number;

  constructor(public name: string) {
    // Cada instancia obtiene el siguiente ID y lo incrementa
    this.id = User.nextId++;
  }

  // Método estático: accede a datos de la clase
  static getNextId(): number {
    return User.nextId;
  }
}

const alice = new User('Alice');  // id = 1
const bob = new User('Bob');      // id = 2
const charlie = new User('Charlie'); // id = 3

User.getNextId(); // 4 (el próximo que se asignaría)

// alice.id, bob.id, charlie.id → de la INSTANCIA (cada uno tiene el suyo)
// User.nextId → de la CLASE (compartido, uno solo)
```

```
INSTANCIA (new User()):
  Cada objeto tiene su propia copia
  alice.name = 'Alice'
  bob.name = 'Bob'
  
STATIC (User.nextId):
  Un solo valor compartido por todos
  User.nextId = 4
  
  alice ─┐
  bob   ─┼── comparten User.nextId
  charlie┘
```

---

## 8. Ejemplo Real: Todo junto

```typescript
// ============================================
// EJEMPLO: Sistema de Logger
// Combina abstract, implements, static, generics
// ============================================

// Interface para el contrato del logger
interface Logger {
  log(message: string): void;
  error(message: string): void;
  warn(message: string): void;
}

// Enum para niveles
enum LogLevel {
  Debug = 0,
  Info = 1,
  Warning = 2,
  Error = 3
}

// Abstract class con lógica compartida
abstract class BaseLogger implements Logger {
  constructor(protected level: LogLevel = LogLevel.Debug) {}

  // Template method: define el esqueleto
  log(message: string): void {
    if (this.level <= LogLevel.Info) {
      this.writeLog('INFO', message);
    }
  }

  error(message: string): void {
    this.writeLog('ERROR', message);
  }

  warn(message: string): void {
    if (this.level <= LogLevel.Warning) {
      this.writeLog('WARN', message);
    }
  }

  // Abstracto: cada subclase decide CÓMO escribir el log
  protected abstract writeLog(level: string, message: string): void;
}

// Implementación: Console Logger
class ConsoleLogger extends BaseLogger {
  protected writeLog(level: string, message: string): void {
    console.log(`[${level}] ${new Date().toISOString()} - ${message}`);
  }
}

// Implementación: Array Logger (guarda en memoria)
class ArrayLogger extends BaseLogger {
  private logs: string[] = [];

  protected writeLog(level: string, message: string): void {
    this.logs.push(`[${level}] ${message}`);
  }

  getLogs(): string[] {
    return [...this.logs]; // Copia para no exponer el array interno
  }

  clear(): void {
    this.logs = [];
  }
}

// Uso:
const consoleLogger = new ConsoleLogger(LogLevel.Info);
consoleLogger.log('Server started');   // Se muestra (Info >= Info)
consoleLogger.error('Disk full');      // Se muestra (Error siempre se muestra)

const arrayLogger = new ArrayLogger(LogLevel.Warning);
arrayLogger.log('Debug info');         // NO se guarda (Info < Warning)
arrayLogger.warn('Low memory');        // Se guarda
arrayLogger.error('Crash');            // Se guarda
arrayLogger.getLogs();
// ['[WARN] Low memory', '[ERROR] Crash']

// Polimorfismo: cualquier Logger funciona
function startApp(logger: Logger): void {
  logger.log('App starting...');
  logger.warn('Using default config');
  logger.log('App ready');
}

startApp(consoleLogger);  // Escribe en consola
startApp(arrayLogger);    // Guarda en array
// Misma función, distinto comportamiento
```

---

## Resumen Visual

```
MODIFICADORES DE ACCESO:
  public     → Accesible desde todos lados
  private    → Solo dentro de la clase
  protected  → Clase + subclases
  readonly   → No reasignable después del constructor

SHORTHAND:
  constructor(public name: string, private age: number) {}
  // Declara + asigna automáticamente

HERENCIA:
  class Hijo extends Padre { }
  // Hereda código, puede hacer override

ABSTRACT:
  abstract class Base {
    abstract metodo(): tipo;     // Subclase DEBE implementar
    metodoConcreto(): tipo { }   // Subclase hereda
  }

IMPLEMENTS:
  class MiClase implements Interface1, Interface2 { }
  // DEBE implementar todo lo de las interfaces

STATIC:
  class MiClase {
    static propiedad = valor;    // De la CLASE
    static metodo() { }          // Sin instanciar
  }

GETTERS/SETTERS:
  get propiedad(): tipo { return this._valor; }
  set propiedad(value: tipo) { this._valor = value; }
```

---

## ✅ CHECKLIST PARTE 2

Antes de avanzar, verificá que entendés:

- [ ] Modificadores de acceso: public, private, protected, readonly
- [ ] Shorthand en constructor (declarar + asignar en parámetros)
- [ ] Getters y setters (acceso controlado a propiedades)
- [ ] Herencia con extends y super()
- [ ] Override de métodos del padre
- [ ] Abstract classes (métodos abstractos vs concretos)
- [ ] Implements (cumplir contrato de interfaces)
- [ ] Diferencia entre extends e implements
- [ ] Static members (propiedades y métodos de la clase)
- [ ] Polimorfismo (tratar hijos como tipo del padre)

---

**Siguiente:** Día 3 - Parte 3: Ejercicios (cuando estés listo, avisame)
