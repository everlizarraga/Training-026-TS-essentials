import { Queue, Repository } from './generic-classes';

describe('Ejercicio 2: Clases Genéricas', () => {

  // ── Queue ──
  describe('Queue', () => {
    let queue: Queue<number>;

    beforeEach(() => {
      queue = new Queue<number>();
    });

    test('should start empty', () => {
      expect(queue.isEmpty()).toBe(true);
      expect(queue.size()).toBe(0);
    });

    test('should enqueue items', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      expect(queue.size()).toBe(2);
      expect(queue.isEmpty()).toBe(false);
    });

    test('should dequeue in FIFO order', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      expect(queue.dequeue()).toBe(1);
      expect(queue.dequeue()).toBe(2);
      expect(queue.dequeue()).toBe(3);
    });

    test('should return undefined when dequeue empty', () => {
      expect(queue.dequeue()).toBeUndefined();
    });

    test('should peek without removing', () => {
      queue.enqueue(10);
      queue.enqueue(20);
      expect(queue.peek()).toBe(10);
      expect(queue.size()).toBe(2); // No se removió
    });

    test('should return undefined when peek empty', () => {
      expect(queue.peek()).toBeUndefined();
    });

    test('should return array copy with toArray', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);
      const arr = queue.toArray();
      expect(arr).toEqual([1, 2, 3]);

      // Modificar la copia no afecta la queue
      arr.push(99);
      expect(queue.size()).toBe(3);
    });

    test('should work with strings', () => {
      const strQueue = new Queue<string>();
      strQueue.enqueue('hello');
      strQueue.enqueue('world');
      expect(strQueue.dequeue()).toBe('hello');
      expect(strQueue.dequeue()).toBe('world');
    });
  });

  // ── Repository ──
  describe('Repository', () => {
    interface TestUser {
      id: string;
      name: string;
      age: number;
    }

    let repo: Repository<TestUser>;

    beforeEach(() => {
      repo = new Repository<TestUser>();
    });

    test('should start empty', () => {
      expect(repo.count()).toBe(0);
      expect(repo.getAll()).toEqual([]);
    });

    test('should add and retrieve items', () => {
      repo.add({ id: '1', name: 'Alice', age: 25 });
      expect(repo.getById('1')).toEqual({ id: '1', name: 'Alice', age: 25 });
    });

    test('should return undefined for non-existing id', () => {
      expect(repo.getById('99')).toBeUndefined();
    });

    test('should get all items', () => {
      repo.add({ id: '1', name: 'Alice', age: 25 });
      repo.add({ id: '2', name: 'Bob', age: 30 });
      expect(repo.getAll().length).toBe(2);
    });

    test('should update existing item', () => {
      repo.add({ id: '1', name: 'Alice', age: 25 });
      const updated = repo.update('1', { name: 'Alicia' });
      expect(updated).not.toBeNull();
      expect(updated?.name).toBe('Alicia');
      expect(updated?.age).toBe(25); // No cambió
    });

    test('should return null when updating non-existing', () => {
      expect(repo.update('99', { name: 'Ghost' })).toBeNull();
    });

    test('should remove existing item', () => {
      repo.add({ id: '1', name: 'Alice', age: 25 });
      expect(repo.remove('1')).toBe(true);
      expect(repo.getById('1')).toBeUndefined();
      expect(repo.count()).toBe(0);
    });

    test('should return false when removing non-existing', () => {
      expect(repo.remove('99')).toBe(false);
    });

    test('should filter items', () => {
      repo.add({ id: '1', name: 'Alice', age: 25 });
      repo.add({ id: '2', name: 'Bob', age: 30 });
      repo.add({ id: '3', name: 'Charlie', age: 35 });

      const over28 = repo.filter(u => u.age > 28);
      expect(over28.length).toBe(2);
    });

    test('should check if item exists', () => {
      repo.add({ id: '1', name: 'Alice', age: 25 });
      expect(repo.exists('1')).toBe(true);
      expect(repo.exists('99')).toBe(false);
    });

    test('should persist update in storage', () => {
      repo.add({ id: '1', name: 'Alice', age: 25 });
      repo.update('1', { age: 26 });
      // Verificar que getById retorna el dato actualizado
      expect(repo.getById('1')?.age).toBe(26);
    });
  });
});
