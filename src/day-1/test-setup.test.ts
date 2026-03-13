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
