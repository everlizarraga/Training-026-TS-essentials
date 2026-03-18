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

export type TaskStatus = 'pending'|'in-progress'|'completed'; // TU CÓDIGO AQUÍ


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
  readonly id: string;
  title: string;
  description: string;
  status: TaskStatus;
  readonly createdAt: Date;
  updatedAt: Date;
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
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  completionRate: number;
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
    const itemUpdate = Object.assign({}, target, updates);
    this.add(itemUpdate);
    return itemUpdate;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }

  filter(predicate: (item: T) => boolean): T[] {
    return this.getAll().filter(predicate);
  }

  count(): number {
    return this.items.size;
  }
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
  private repository: Repository<Task>;
  private newxtId: number = 1;

  constructor() {
    this.repository = new Repository();

  }

  // ============================================
  // CRUD
  // ============================================
  createTask(title: string, description: string): Task {
    const newTask: Task = {
      id: `${this.newxtId}`,
      title: title,
      description: description,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.newxtId += 1;
    this.repository.add(newTask);
    return newTask;
  }

  updateTask(id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null {
    const target = this.repository.getById(id);
    if(!target) return null;
    const taskUpdate = Object.assign({}, target, updates);
    taskUpdate.updatedAt = new Date();
    this.repository.add(taskUpdate);
    return taskUpdate;
  }

  deleteTask(id: string): boolean {
    return this.repository.delete(id);
  }

  getTaskById(id: string): Task | undefined {
    return this.repository.getById(id);
  }

  getAllTasks(): Task[] {
    return this.repository.getAll();
  }

  // ============================================
  // FILTRADO Y BÚSQUEDA
  // ============================================
  getTasksByStatus(status: TaskStatus): Task[] {
    return this.repository.getAll().filter(t => t.status === status);
  }

  searchTasks(query: string): Task[] {
    return this.repository.getAll().filter(t => {
      const title = t.title.toLowerCase();
      const description = t.description.toLowerCase();
      return title.includes(query.toLowerCase()) ||
        description.includes(query.toLowerCase())
    });
  }

  // ============================================
  // ESTADÍSTICAS
  // ============================================
  getStatistics(): TaskStatistics {
    const total: number = this.repository.count();
    const completed: number = this.getTasksByStatus('completed').length;
    return {
      total,
      pending: this.getTasksByStatus('pending').length,
      inProgress: this.getTasksByStatus('in-progress').length,
      completed,
      completionRate: completed === 0? 0 : Number(((completed / total) * 100).toFixed(2))
    }
  }
}
