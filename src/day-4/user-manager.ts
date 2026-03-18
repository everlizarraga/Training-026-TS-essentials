// ============================================
// REFACTORING: user-manager.js → user-manager.ts
// ============================================
//
// INSTRUCCIONES:
// 1. Definí los types/interfaces necesarios
// 2. Tipá la clase completa (propiedades, parámetros, retornos)
// 3. Mejorá lo que puedas aprovechando TypeScript
//
// COSAS QUE DEBÉS DEFINIR:
// - Type para UserRole (¿qué roles existen?)
// - Interface para User (¿qué propiedades tiene?)
// - Interface para UserStats (¿qué retorna getUserStats?)
// - Tipos en TODOS los métodos (parámetros + retorno)
//
// MIRÁ EL CÓDIGO JS ORIGINAL Y LOS TESTS PARA DEDUCIR:
// - Qué tipo es cada propiedad
// - Qué roles son válidos
// - Qué retorna cada método
// - Qué parámetros son opcionales
//
// MEJORAS QUE PODÉS HACER (opcionales pero recomendadas):
// - readonly en propiedades que no deberían cambiar (id, createdAt)
// - Usar Partial<> para updates
// - Proteger propiedades internas con private
// - Impedir que updates cambien id o createdAt


// TODO: Definir types e interfaces
// (deducilos del código JS y de los tests)
export type UserRole = 'admin'|'user'|'guest';

export interface User {
  readonly id: number;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  readonly createdAt: Date;
}

export interface StatsUser {
  total: number;
  active: number;
  inactive: number;
  byRole: Partial<Record<UserRole, number>>;
}

// TODO: Convertir la clase a TypeScript
// (tipá todo: propiedades, constructor, métodos, parámetros, retornos)
export class UserManager {
  private users: User[];
  private nextId: number;

  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  createUser(name: string, email: string, role?: UserRole): User {
    const user = {
      id: this.nextId++,
      name,
      email,
      role: role || 'user',
      active: true,
      createdAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  getUserById(id: number): User|undefined {
    return this.users.find(u => u.id === id);
  }

  updateUser(id: number, updates: Partial<Omit<User, 'id'|'createdAt'>>): User|null {
    const user = this.getUserById(id);
    if (!user) return null;
    Object.assign(user, updates);
    return user;
  }

  deleteUser(id: number): boolean {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }

  getUsersByRole(role: UserRole): User[] {
    return this.users.filter(u => u.role === role);
  }

  getActiveUsers(): User[] {
    return this.users.filter(u => u.active);
  }

  deactivateUser(id: number): User|null {
    const user = this.getUserById(id);
    if (!user) return null;
    user.active = false;
    return user;
  }

  searchUsers(query: string): User[] {
    const lower = query.toLowerCase();
    return this.users.filter(u =>
      u.name.toLowerCase().includes(lower) ||
      u.email.toLowerCase().includes(lower)
    );
  }

  getUserStats():StatsUser {
    const total = this.users.length;
    const active = this.users.filter(u => u.active).length;
    const byRole: Partial<Record<UserRole, number>> = {};
    this.users.forEach(u => {
      byRole[u.role] = (byRole[u.role] || 0) + 1;
    });

    return {
      total,
      active,
      inactive: total - active,
      byRole
    };
  }
}

// TODO: Exportar todo lo necesario
// (la clase, los types, las interfaces)
