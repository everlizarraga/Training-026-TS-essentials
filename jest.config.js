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
