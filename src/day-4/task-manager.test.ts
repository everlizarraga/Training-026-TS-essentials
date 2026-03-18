import { TaskManager, TaskStatus, Task } from './task-manager';

describe('Task Manager - Proyecto Integrador', () => {
  let manager: TaskManager;

  beforeEach(() => {
    manager = new TaskManager();
  });

  // ── CRUD ──
  describe('createTask', () => {
    test('should create task with correct properties', () => {
      const task = manager.createTask('Test task', 'Test description');

      expect(task.id).toBeDefined();
      expect(task.title).toBe('Test task');
      expect(task.description).toBe('Test description');
      expect(task.status).toBe('pending');
      expect(task.createdAt).toBeInstanceOf(Date);
      expect(task.updatedAt).toBeInstanceOf(Date);
    });

    test('should create tasks with unique ids', () => {
      const task1 = manager.createTask('Task 1', 'Desc 1');
      const task2 = manager.createTask('Task 2', 'Desc 2');

      expect(task1.id).not.toBe(task2.id);
    });

    test('should add task to manager', () => {
      manager.createTask('Task 1', 'Desc 1');
      expect(manager.getAllTasks().length).toBe(1);
    });
  });

  describe('updateTask', () => {
    test('should update task title', () => {
      const task = manager.createTask('Original', 'Desc');
      const updated = manager.updateTask(task.id, { title: 'Updated' });

      expect(updated).not.toBeNull();
      expect(updated?.title).toBe('Updated');
      expect(updated?.description).toBe('Desc'); // No cambió
    });

    test('should update task status', () => {
      const task = manager.createTask('Task', 'Desc');
      const updated = manager.updateTask(task.id, { status: 'in-progress' });

      expect(updated?.status).toBe('in-progress');
    });

    test('should update updatedAt timestamp', () => {
      const task = manager.createTask('Task', 'Desc');
      const originalUpdatedAt = task.updatedAt;

      // Pequeña pausa para que el timestamp sea diferente
      const updated = manager.updateTask(task.id, { title: 'New' });

      expect(updated?.updatedAt).toBeInstanceOf(Date);
    });

    test('should return null for non-existing task', () => {
      expect(manager.updateTask('fake-id', { title: 'Nope' })).toBeNull();
    });

    test('should persist update', () => {
      const task = manager.createTask('Task', 'Desc');
      manager.updateTask(task.id, { title: 'Updated' });

      const retrieved = manager.getTaskById(task.id);
      expect(retrieved?.title).toBe('Updated');
    });
  });

  describe('deleteTask', () => {
    test('should delete existing task', () => {
      const task = manager.createTask('Task', 'Desc');
      expect(manager.deleteTask(task.id)).toBe(true);
      expect(manager.getTaskById(task.id)).toBeUndefined();
    });

    test('should return false for non-existing task', () => {
      expect(manager.deleteTask('fake-id')).toBe(false);
    });

    test('should decrease task count', () => {
      const task = manager.createTask('Task', 'Desc');
      manager.createTask('Task 2', 'Desc 2');
      manager.deleteTask(task.id);

      expect(manager.getAllTasks().length).toBe(1);
    });
  });

  describe('getTaskById', () => {
    test('should return task by id', () => {
      const task = manager.createTask('Task', 'Desc');
      const found = manager.getTaskById(task.id);

      expect(found).toBeDefined();
      expect(found?.title).toBe('Task');
    });

    test('should return undefined for non-existing id', () => {
      expect(manager.getTaskById('fake')).toBeUndefined();
    });
  });

  describe('getAllTasks', () => {
    test('should return empty array initially', () => {
      expect(manager.getAllTasks()).toEqual([]);
    });

    test('should return all tasks', () => {
      manager.createTask('Task 1', 'Desc');
      manager.createTask('Task 2', 'Desc');
      manager.createTask('Task 3', 'Desc');

      expect(manager.getAllTasks().length).toBe(3);
    });
  });

  // ── FILTRADO Y BÚSQUEDA ──
  describe('getTasksByStatus', () => {
    beforeEach(() => {
      const task1 = manager.createTask('Task 1', 'Desc');
      const task2 = manager.createTask('Task 2', 'Desc');
      const task3 = manager.createTask('Task 3', 'Desc');
      manager.updateTask(task2.id, { status: 'in-progress' });
      manager.updateTask(task3.id, { status: 'completed' });
    });

    test('should filter pending tasks', () => {
      const pending = manager.getTasksByStatus('pending');
      expect(pending.length).toBe(1);
      expect(pending[0].title).toBe('Task 1');
    });

    test('should filter in-progress tasks', () => {
      const inProgress = manager.getTasksByStatus('in-progress');
      expect(inProgress.length).toBe(1);
      expect(inProgress[0].title).toBe('Task 2');
    });

    test('should filter completed tasks', () => {
      const completed = manager.getTasksByStatus('completed');
      expect(completed.length).toBe(1);
      expect(completed[0].title).toBe('Task 3');
    });

    test('should return empty array if none match', () => {
      const freshManager = new TaskManager();
      expect(freshManager.getTasksByStatus('completed')).toEqual([]);
    });
  });

  describe('searchTasks', () => {
    beforeEach(() => {
      manager.createTask('Buy groceries', 'Need milk and eggs');
      manager.createTask('Study TypeScript', 'Complete day 4 exercises');
      manager.createTask('Fix bug', 'The login page has an error');
    });

    test('should search by title', () => {
      const results = manager.searchTasks('Buy');
      expect(results.length).toBe(1);
      expect(results[0].title).toBe('Buy groceries');
    });

    test('should search by description', () => {
      const results = manager.searchTasks('milk');
      expect(results.length).toBe(1);
    });

    test('should be case-insensitive', () => {
      const results = manager.searchTasks('typescript');
      expect(results.length).toBe(1);
      expect(results[0].title).toBe('Study TypeScript');
    });

    test('should return multiple matches', () => {
      const results = manager.searchTasks('e');
      // 'Buy groceries' (groceries tiene e)
      // 'Study TypeScript' (TypeScript tiene e)  
      // 'Fix bug' (the, page, error tienen e)
      expect(results.length).toBe(3);
    });

    test('should return empty for no matches', () => {
      const results = manager.searchTasks('xyz123');
      expect(results).toEqual([]);
    });
  });

  // ── ESTADÍSTICAS ──
  describe('getStatistics', () => {
    test('should return zeros for empty manager', () => {
      const stats = manager.getStatistics();

      expect(stats.total).toBe(0);
      expect(stats.pending).toBe(0);
      expect(stats.inProgress).toBe(0);
      expect(stats.completed).toBe(0);
      expect(stats.completionRate).toBe(0);
    });

    test('should count tasks by status', () => {
      const task1 = manager.createTask('Task 1', 'Desc');
      const task2 = manager.createTask('Task 2', 'Desc');
      const task3 = manager.createTask('Task 3', 'Desc');
      manager.updateTask(task2.id, { status: 'in-progress' });
      manager.updateTask(task3.id, { status: 'completed' });

      const stats = manager.getStatistics();

      expect(stats.total).toBe(3);
      expect(stats.pending).toBe(1);
      expect(stats.inProgress).toBe(1);
      expect(stats.completed).toBe(1);
    });

    test('should calculate completion rate', () => {
      const task1 = manager.createTask('Task 1', 'Desc');
      const task2 = manager.createTask('Task 2', 'Desc');
      const task3 = manager.createTask('Task 3', 'Desc');
      manager.updateTask(task3.id, { status: 'completed' });

      const stats = manager.getStatistics();

      // 1 completed out of 3 = 33.33%
      expect(stats.completionRate).toBeCloseTo(33.33, 2);
    });

    test('should handle all completed', () => {
      const task1 = manager.createTask('Task 1', 'Desc');
      const task2 = manager.createTask('Task 2', 'Desc');
      manager.updateTask(task1.id, { status: 'completed' });
      manager.updateTask(task2.id, { status: 'completed' });

      const stats = manager.getStatistics();

      expect(stats.completionRate).toBe(100);
    });
  });
});

