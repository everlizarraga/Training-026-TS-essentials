# DÍA 4 - PARTE 1: Proyecto Integrador - Task Management System

---

## ¿Qué es esto?

Un proyecto que integra TODO lo que aprendiste en 3 días:

```
Día 1: Types básicos        → Tipar propiedades y funciones
Día 2: Interfaces + Types   → Definir contratos y unions
Día 2: Enums                → Estados del task
Día 3: Generics             → Repository genérico reutilizable
Día 3: Classes              → TaskManager con encapsulamiento
Día 3: Abstract/Implements  → Estructura profesional
```

Vas a construir un **sistema de gestión de tareas** (lógica pura + tests, sin UI).

---

## Arquitectura del Proyecto

```
TaskManager (clase principal)
    │
    │ usa internamente
    ▼
Repository<Task> (clase genérica del Día 3)
    │
    │ almacena
    ▼
Task (interface)
    │
    │ tiene
    ▼
TaskStatus (type union)
TaskStatistics (interface para estadísticas)
```

```
Flujo de datos:

  createTask('Título', 'Descripción')
       │
       ▼
  TaskManager genera id + timestamps
       │
       ▼
  Repository<Task>.add(task)
       │
       ▼
  Map<string, Task> (almacenamiento interno)

  getTasksByStatus('completed')
       │
       ▼
  Repository<Task>.filter(predicate)
       │
       ▼
  Task[] filtrado
```

---

## Archivos que vas a crear

```
src/day-4/
├── task-manager.ts          ← Types + Repository + TaskManager
└── task-manager.test.ts     ← Tests completos
```

Todo va en UN solo archivo (más los tests). Es un proyecto de integración, no de arquitectura multi-archivo.

---

## Las reglas

⏱️ **TIEMPO LÍMITE:** 2 horas máximo

```
1. Leé el archivo completo primero (entendé qué se pide)
2. Implementá en orden: types → Repository → TaskManager
3. Corré tests con npm run test:watch filtrado: p → task-manager
4. NO busques perfección, buscá que los tests pasen
5. Si te trabás más de 20 min en un método → mirá los hints
```

---

## Creá: `src/day-4/task-manager.ts`

```typescript
// ============================================
// PROYECTO INTEGRADOR: TASK MANAGEMENT SYSTEM
// ============================================
// Integra: Types, Interfaces, Enums, Generics, Classes
// ============================================


// ============================================
// TYPES E INTERFACES
// ============================================

// TODO: Definir type TaskStatus
// Valores posibles: 'pending', 'in-progress', 'completed'

export type TaskStatus = // TU CÓDIGO AQUÍ


// TODO: Definir interface Task
//
// Propiedades:
// - id: string (readonly)
// - title: string
// - description: string
// - status: TaskStatus
// - createdAt: Date (readonly)
// - updatedAt: Date

export interface Task {
  // TU CÓDIGO AQUÍ
}


// TODO: Definir interface TaskStatistics
//
// Propiedades:
// - total: number
// - pending: number
// - inProgress: number
// - completed: number
// - completionRate: number (porcentaje de 0 a 100)

export interface TaskStatistics {
  // TU CÓDIGO AQUÍ
}


// ============================================
// REPOSITORY GENÉRICO
// ============================================

// TODO: Implementar clase genérica Repository<T>
//
// Constraint: T debe tener { id: string }
// Almacenamiento: Map<string, T>
//
// Métodos:
// - add(item: T): void
// - getById(id: string): T | undefined
// - getAll(): T[]
// - update(id: string, updates: Partial<T>): T | null
// - delete(id: string): boolean
// - filter(predicate: (item: T) => boolean): T[]
// - count(): number
//
// NOTA: Ya hiciste esto en el Día 3.
// Podés reutilizar tu código o reescribirlo de memoria.
// Reescribirlo de memoria es mejor práctica (refuerza el aprendizaje).

export class Repository<T extends { id: string }> {
  // TU CÓDIGO AQUÍ
}


// ============================================
// TASK MANAGER
// ============================================

// TODO: Implementar clase TaskManager
//
// Propiedad privada: repository de tipo Repository<Task>
//
// Constructor: inicializa el repository vacío
//
// Métodos:
//
// ── CRUD ──
//
// createTask(title: string, description: string): Task
//   - Genera id único (podés usar Date.now().toString() o un contador)
//   - Status inicial: 'pending'
//   - createdAt y updatedAt: new Date()
//   - Agrega al repository
//   - Retorna el task creado
//
// updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null
//   - Busca el task en el repository
//   - Si no existe retorna null
//   - Si existe, actualiza con los updates + actualiza updatedAt a new Date()
//   - Retorna el task actualizado
//
//   ¿Qué es Partial<Omit<Task, 'id' | 'createdAt'>>?
//   - Omit<Task, 'id' | 'createdAt'> = Task sin id ni createdAt
//     (porque no querés que te cambien el id ni la fecha de creación)
//   - Partial<...> = todas las propiedades opcionales
//     (podés actualizar solo el title, o solo el status, o varios)
//
// deleteTask(id: string): boolean
//   - Elimina del repository
//   - Retorna true si existía, false si no
//
// getTaskById(id: string): Task | undefined
//   - Retorna el task o undefined
//
// getAllTasks(): Task[]
//   - Retorna todos los tasks
//
// ── FILTRADO Y BÚSQUEDA ──
//
// getTasksByStatus(status: TaskStatus): Task[]
//   - Filtra tasks por status
//
// searchTasks(query: string): Task[]
//   - Busca en title Y description (case-insensitive)
//   - Si el query aparece en title O en description, incluir el task
//
// ── ESTADÍSTICAS ──
//
// getStatistics(): TaskStatistics
//   - total: cantidad total de tasks
//   - pending: cantidad con status 'pending'
//   - inProgress: cantidad con status 'in-progress'
//   - completed: cantidad con status 'completed'
//   - completionRate: (completed / total) * 100
//     Si total es 0, completionRate es 0
//     Redondear a 2 decimales

export class TaskManager {
  // TU CÓDIGO AQUÍ
}
```

---

## Creá: `src/day-4/task-manager.test.ts`

```typescript
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
```

---

## 💡 HINTS (solo si te trabás más de 20 min)

**Hint 1 (Repository):** Es el mismo que hiciste en Día 3. Reescribilo de memoria, no copies. Si no te acordás de algún método, pensá en qué operación de Map necesitás.

**Hint 2 (createTask - id único):** Un contador privado que se incrementa en cada createTask es la forma más simple. Otra opción: `Date.now().toString()`, pero si creás dos tasks muy rápido podrían colisionar. El contador es más seguro.

**Hint 3 (updateTask - Omit + Partial):** No te preocupes por el tipo complejo del parámetro. TypeScript lo valida solo. Vos solo hacé el spread: `{ ...existingTask, ...updates, updatedAt: new Date() }`.

**Hint 4 (searchTasks):** Para case-insensitive, convertí tanto el query como el title/description a minúsculas con `.toLowerCase()` antes de comparar. Usá `.includes()` para verificar si contiene el texto.

**Hint 5 (getStatistics - completionRate):** Cuidado con la división por cero (cuando total es 0). Verificá primero. Para redondear a 2 decimales: `Math.round(valor * 100) / 100` o `parseFloat(valor.toFixed(2))`.

---

## Cuando termines

```bash
npm test
```

Todos los tests de day-1, day-2, day-3 Y day-4 deberían pasar.

```bash
git add .
git commit -m "Day 4 Part 1: Task Manager integrator project - all tests passing"
git push
```

---

## ✅ CHECKLIST PARTE 1

- [ ] Types e interfaces definidos correctamente
- [ ] Repository genérico funcional (reescrito de memoria)
- [ ] TaskManager: createTask genera tasks con id único y timestamps
- [ ] TaskManager: updateTask actualiza y cambia updatedAt
- [ ] TaskManager: deleteTask y getTaskById funcionan
- [ ] TaskManager: getTasksByStatus filtra correctamente
- [ ] TaskManager: searchTasks es case-insensitive y busca en title + description
- [ ] TaskManager: getStatistics calcula todos los valores correctamente
- [ ] Todos los tests pasan

---

**Siguiente:** Día 4 - Parte 2: Refactoring JS→TS (cuando tengas todo en verde, avisame)
