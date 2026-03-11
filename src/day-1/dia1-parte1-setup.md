# DÍA 1 - PARTE 1: Setup del Repo + NPM desde Cero

---

## ¿Qué es NPM y por qué lo usamos?

Pensá en NPM como una **tienda de herramientas para programadores**. En vez de construir todo desde cero, instalás herramientas que otros ya crearon (TypeScript, Jest, ESLint, etc.) y NPM las administra por vos.

```
Sin NPM:
- Descargás archivos manualmente de internet
- Los ponés en carpetas random
- Actualizás a mano
- Cada dev del equipo tiene versiones distintas
- Caos total

Con NPM:
- Un comando instala todo
- package.json = lista de herramientas del proyecto
- Todos los devs tienen las mismas versiones
- Un "npm install" y listo
```

NPM viene incluido con Node.js. Si tenés Node instalado, ya tenés NPM.

---

## PASO 1: Verificar que tenés Node y NPM

Abrí tu terminal y ejecutá:

```bash
# Ver versión de Node (necesitás 18+ idealmente)
node --version

# Ver versión de NPM
npm --version
```

Si te tira versiones, estás bien. Si no, necesitás instalar Node.js desde nodejs.org.

---

## PASO 2: Crear el proyecto

```bash
# Crear carpeta del proyecto
mkdir typescript-essentials

# Entrar a la carpeta
cd typescript-essentials
```

---

## PASO 3: Inicializar NPM

```bash
npm init -y
```

**¿Qué hace esto?** Crea el archivo `package.json`. Este archivo es el **DNI de tu proyecto**. Contiene:
- Nombre del proyecto
- Versión
- Scripts (comandos que podés ejecutar)
- Dependencias (herramientas instaladas)

El flag `-y` significa "yes to all" (acepta valores por defecto para no preguntarte uno por uno).

Después de ejecutar este comando, abrí `package.json` y vas a ver algo así:

```json
{
  "name": "typescript-essentials",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Por ahora está vacío de dependencias. Eso cambia en el siguiente paso.

---

## PASO 4: Instalar dependencias

Acá viene lo importante. Cada herramienta que instalamos tiene un propósito específico.

### Instalación 1: TypeScript

```bash
npm install --save-dev typescript @types/node
```

Desglose:
- `npm install` → comando para instalar paquetes
- `--save-dev` → "guardá esto como dependencia de DESARROLLO" (solo para programar, no va a producción)
- `typescript` → el compilador de TypeScript (convierte .ts → .js)
- `@types/node` → tipos de TypeScript para Node.js (para que TS entienda cosas como `console.log`, `process`, etc.)

**¿Qué es `--save-dev` vs sin flag?**

```
--save-dev  → Herramientas para DESARROLLAR (testing, linting, compilador)
             Solo vos las necesitás mientras programás
             Van en "devDependencies" en package.json

sin flag    → Dependencias de PRODUCCIÓN (express, react, etc.)
             Las necesita tu app para FUNCIONAR
             Van en "dependencies" en package.json

En este proyecto TODO es --save-dev porque es un proyecto de aprendizaje,
no una app que va a producción.
```

### Instalación 2: Testing (Jest)

```bash
npm install --save-dev jest ts-jest @types/jest
```

- `jest` → framework de testing (el que ejecuta tus tests)
- `ts-jest` → plugin para que Jest entienda TypeScript directamente
- `@types/jest` → tipos de TS para Jest (para que TS entienda `describe`, `test`, `expect`, etc.)

### Instalación 3: Ejecución directa (opcional pero útil)

```bash
npm install --save-dev ts-node
```

- `ts-node` → ejecuta archivos .ts directamente sin compilar primero (útil para probar cosas rápido)

---

### ¿Qué pasó después de instalar?

Dos cosas nuevas aparecieron:

1. **Carpeta `node_modules/`** → Acá viven TODAS las herramientas instaladas. No la tocás nunca, no la subís a GitHub. NPM la maneja.

2. **Archivo `package-lock.json`** → "Foto exacta" de las versiones instaladas. Garantiza que todos los devs tengan las mismas versiones exactas. No lo editás manualmente.

Ahora si abrís `package.json`, vas a ver las dependencias listadas:

```json
{
  "devDependencies": {
    "@types/jest": "^29.x.x",
    "@types/node": "^20.x.x",
    "jest": "^29.x.x",
    "ts-jest": "^29.x.x",
    "ts-node": "^10.x.x",
    "typescript": "^5.x.x"
  }
}
```

Los números son las versiones. El `^` significa "aceptar actualizaciones menores automáticas".

---

## PASO 5: Configurar TypeScript

```bash
npx tsc --init
```

**¿Qué es `npx`?** Ejecuta un comando de un paquete instalado localmente. `tsc` es el compilador de TypeScript. `--init` crea el archivo de configuración `tsconfig.json`.

Esto genera un `tsconfig.json` con MUCHAS opciones comentadas. Vamos a reemplazar TODO el contenido con esto (borrá todo lo que hay y pegá esto):

```json
{
  "compilerOptions": {
    // ============================================
    // BÁSICO: Qué versión de JS genera
    // ============================================
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],

    // ============================================
    // STRICT MODE: Verificaciones estrictas
    // ESTO ES LO MÁS IMPORTANTE DE TypeScript
    // ============================================
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,

    // ============================================
    // MÓDULOS: Cómo resuelve imports
    // ============================================
    "moduleResolution": "node",
    "esModuleInterop": true,
    "resolveJsonModule": true,

    // ============================================
    // CARPETAS: Dónde lee y dónde escribe
    // ============================================
    "outDir": "./dist",
    "rootDir": "./src",

    // ============================================
    // EXTRAS
    // ============================================
    "sourceMap": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### ¿Qué hace cada sección?

- **target/module/lib:** Define qué versión de JavaScript genera el compilador. ES2020 es moderno y soportado por Node 14+.
- **strict mode:** LO MÁS IMPORTANTE. Activa verificaciones estrictas que atrapan errores en compile-time en vez de runtime.
- **moduleResolution:** Cómo TypeScript encuentra los archivos cuando hacés `import`.
- **outDir/rootDir:** Tu código TS va en `src/`, el JS compilado sale en `dist/`.

### Flujo de compilación:

```
Tu código                    TypeScript               JavaScript
src/day1/basics.ts    →    Compilador (tsc)    →    dist/day1/basics.js
                           Verifica tipos               Ejecutable por Node
                           Si hay error → NO compila
```

---

## PASO 6: Configurar Jest

Creá un archivo `jest.config.js` en la raíz del proyecto con este contenido:

```javascript
// ============================================
// CONFIGURACIÓN DE JEST
// Le dice a Jest cómo ejecutar tests en TypeScript
// ============================================

module.exports = {
  // Usar ts-jest para entender TypeScript
  preset: 'ts-jest',

  // Entorno de ejecución (Node, no browser)
  testEnvironment: 'node',

  // Dónde buscar tests (dentro de src/)
  roots: ['<rootDir>/src'],

  // Qué archivos son tests (cualquier .test.ts o .spec.ts)
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
};
```

---

## PASO 7: Configurar scripts de NPM

Los scripts son **atajos de comandos**. En vez de escribir comandos largos, definís nombres cortos.

Abrí `package.json` y reemplazá la sección `"scripts"` con esto:

```json
{
  "scripts": {
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch",
    "dev": "ts-node"
  }
}
```

### Qué hace cada uno:

```
npm run build      → Compila TODO el TS a JS (genera carpeta dist/)
npm test           → Ejecuta TODOS los tests una vez
npm run test:watch → Ejecuta tests y RE-EJECUTA cada vez que guardás un archivo
npm run dev        → Ejecuta un archivo .ts directamente (ej: npm run dev src/day1/basics.ts)
```

**Nota:** `npm test` es especial, no necesita `run`. Los demás sí: `npm run build`, `npm run dev`.

---

## PASO 8: Crear estructura de carpetas

```bash
# Crear carpetas para cada día
mkdir -p src/day1
mkdir -p src/day2
mkdir -p src/day3
mkdir -p src/day4
```

### Estructura resultante:

```
typescript-essentials/
├── src/
│   ├── day1/          ← Types básicos
│   ├── day2/          ← Interfaces, Types, Enums
│   ├── day3/          ← Generics, Classes
│   └── day4/          ← Proyecto integrador
├── dist/              ← (se genera al compilar, no la creás vos)
├── node_modules/      ← (generada por npm, no la tocás)
├── package.json       ← DNI del proyecto
├── package-lock.json  ← Versiones exactas
├── tsconfig.json      ← Config de TypeScript
└── jest.config.js     ← Config de Jest
```

---

## PASO 9: Inicializar Git + .gitignore

```bash
# Inicializar repositorio git
git init
```

Creá un archivo `.gitignore` en la raíz con este contenido:

```
# Dependencias (se regeneran con npm install)
node_modules/

# Código compilado (se regenera con npm run build)
dist/

# Archivos de sistema
.DS_Store
Thumbs.db
```

**¿Por qué ignoramos `node_modules` y `dist`?**
- `node_modules` puede pesar cientos de MB. Se regenera con `npm install`.
- `dist` es código generado. Se regenera con `npm run build`.
- Subir archivos regenerables a Git es redundante y pesado.

---

## PASO 10: Verificar que todo funciona

### Test 1: TypeScript compila

Creá `src/day1/test-setup.ts`:

```typescript
// ============================================
// TEST DE SETUP
// Si esto compila y ejecuta, el setup está OK
// ============================================

const mensaje: string = 'TypeScript funciona!';
const numero: number = 42;
const activo: boolean = true;

console.log(mensaje);
console.log(`Número: ${numero}, Activo: ${activo}`);
```

Compilá y ejecutá:

```bash
# Compilar (genera dist/day1/test-setup.js)
npm run build

# Ejecutar el JS generado
node dist/day1/test-setup.js

# Deberías ver:
# TypeScript funciona!
# Número: 42, Activo: true
```

### Test 2: Jest funciona

Creá `src/day1/test-setup.test.ts`:

```typescript
// ============================================
// TEST DE SETUP PARA JEST
// Si esto pasa, Jest + TypeScript están OK
// ============================================

describe('Setup verification', () => {
  test('TypeScript works with Jest', () => {
    const suma: number = 2 + 2;
    expect(suma).toBe(4);
  });

  test('String types work', () => {
    const nombre: string = 'TypeScript';
    expect(nombre.length).toBeGreaterThan(0);
  });
});
```

Ejecutá:

```bash
# Correr tests
npm test

# Deberías ver:
# PASS  src/day1/test-setup.test.ts
#   Setup verification
#     ✓ TypeScript works with Jest
#     ✓ String types work
```

---

## PASO 11: Primer commit

```bash
git add .
git commit -m "Initial setup: TypeScript + Jest + project structure"
```

Después creás el repo en GitHub y lo conectás:

```bash
git remote add origin https://github.com/TU-USUARIO/typescript-essentials.git
git branch -M main
git push -u origin main
```

---

## ✅ CHECKLIST PARTE 1

Antes de avanzar, verificá:

- [ ] `npm run build` compila sin errores
- [ ] `node dist/day1/test-setup.js` muestra output correcto
- [ ] `npm test` pasa los 2 tests
- [ ] Repo de GitHub creado y pusheado
- [ ] Entendés qué hace cada archivo (package.json, tsconfig.json, jest.config.js)
- [ ] Entendés la diferencia entre `--save-dev` y dependencias normales

---

**Siguiente:** Día 1 - Parte 2: Types Básicos (cuando tengas todo en verde, avisame)
