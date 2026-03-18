// ============================================
// EJERCICIO 2: Clases Genéricas
// ============================================

// TODO: Implementar clase genérica Queue<T> (Cola)
//
// Una cola es FIFO: First In, First Out
// (como una fila de personas: el primero que llega es el primero que sale)
//
// Métodos:
// - enqueue(item: T): void         → Agrega al final
// - dequeue(): T | undefined       → Saca del frente (el primero)
// - peek(): T | undefined          → Ver el frente sin sacarlo
// - size(): number                 → Cantidad de elementos
// - isEmpty(): boolean             → ¿Está vacía?
// - toArray(): T[]                 → Retorna copia como array
//
// Ejemplo:
//   const q = new Queue<number>();
//   q.enqueue(1); q.enqueue(2); q.enqueue(3);
//   q.peek();    → 1 (el primero)
//   q.dequeue(); → 1 (lo saca)
//   q.peek();    → 2 (ahora es el primero)
//   q.size();    → 2

export class Queue<T> {
  // TU CÓDIGO AQUÍ
  private cola: T[] = [];

  enqueue(item: T): void {
    this.cola.push(item);
  }

  dequeue(): T | undefined {
    return this.cola.shift();
  }

  peek(): T | undefined {
    return this.cola[0];
  }

  size(): number {
    return this.cola.length;
  }

  isEmpty(): boolean {
    return this.cola.length === 0;
  }

  toArray(): T[] {
    return [...this.cola];
  }
}


// TODO: Implementar clase genérica Repository<T>
//
// Constraint: T debe tener { id: string }
// Usa Map<string, T> internamente para almacenar items
//
// Métodos:
// - add(item: T): void                              → Agrega item (usa item.id como key)
// - getById(id: string): T | undefined              → Buscar por id
// - getAll(): T[]                                    → Todos los items
// - update(id: string, updates: Partial<T>): T | null → Actualizar (merge updates, retorna actualizado o null si no existe)
// - remove(id: string): boolean                      → Eliminar (true si existía, false si no)
// - filter(predicate: (item: T) => boolean): T[]     → Filtrar
// - count(): number                                  → Cantidad de items
// - exists(id: string): boolean                      → ¿Existe el id?
//
// Ejemplo:
//   const repo = new Repository<{ id: string; name: string }>();
//   repo.add({ id: '1', name: 'Alice' });
//   repo.getById('1'); → { id: '1', name: 'Alice' }
//   repo.update('1', { name: 'Alicia' }); → { id: '1', name: 'Alicia' }
//   repo.remove('1'); → true

export class Repository<T extends { id: string }> {
  // TU CÓDIGO AQUÍ
  private items: Map<string, T> = new Map();

  add(item: T): void {
    this.items.set(item.id, item);
  }

  getById(id: string): T | undefined {
    return this.items.get(id);
  }

  getAll(): T[] {
    return [...this.items.values()];
  }

  update(id: string, updates: Partial<T>): T | null {
    const target = this.getById(id);
    if(!target) return null;
    const actualizado = Object.assign({}, target, updates);
    this.add(actualizado);
    return actualizado;
  }

  remove(id: string): boolean {
    return this.items.delete(id);
  }

  filter(predicate: (item: T) => boolean): T[] {
    return this.getAll().filter(e => predicate(e));
  }

  count(): number {
    return this.items.size;
  }

  exists(id: string): boolean {
    return this.items.has(id);
  }
}

