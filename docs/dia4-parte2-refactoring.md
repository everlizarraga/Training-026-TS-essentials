# DÍA 4 - PARTE 2: Refactoring JS→TS + Best Practices

---

## ¿Qué es refactoring JS→TS?

En la vida real, muchos proyectos empezaron en JavaScript y se migran a TypeScript. Saber convertir código JS a TS es una habilidad muy demandada. El proceso es:

```
1. Tomar código JavaScript sin tipos
2. Identificar qué tipos tiene cada cosa
3. Crear interfaces/types para las estructuras
4. Agregar anotaciones de tipo a todo
5. Arreglar los errores que TypeScript descubre
6. Mejorar el código aprovechando los tipos
```

---

## El Ejercicio

Vas a tomar una clase `UserManager` escrita en JavaScript puro (sin tipos) y convertirla a TypeScript completo con tipos estrictos.

⏱️ **TIEMPO LÍMITE:** 1 hora

---

## Archivos que vas a crear

```
src/day-4/
├── task-manager.ts              ← (ya hecho)
├── task-manager.test.ts         ← (ya hecho)
├── user-manager.ts              ← Refactoring JS→TS
└── user-manager.test.ts         ← Tests
```

---

## El código JavaScript original (SIN tipos)

Leé este código primero. Es lo que tendrías que migrar en un proyecto real:

```javascript
// ============================================
// user-manager.js (JavaScript puro - SIN tipos)
// ============================================

class UserManager {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  createUser(name, email, role) {
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

  getUserById(id) {
    return this.users.find(u => u.id === id);
  }

  updateUser(id, updates) {
    const user = this.getUserById(id);
    if (!user) return null;
    Object.assign(user, updates);
    return user;
  }

  deleteUser(id) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }

  getUsersByRole(role) {
    return this.users.filter(u => u.role === role);
  }

  getActiveUsers() {
    return this.users.filter(u => u.active);
  }

  deactivateUser(id) {
    const user = this.getUserById(id);
    if (!user) return null;
    user.active = false;
    return user;
  }

  searchUsers(query) {
    const lower = query.toLowerCase();
    return this.users.filter(u =>
      u.name.toLowerCase().includes(lower) ||
      u.email.toLowerCase().includes(lower)
    );
  }

  getUserStats() {
    const total = this.users.length;
    const active = this.users.filter(u => u.active).length;
    const byRole = {};
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
```

---

## Tu tarea: Convertirlo a TypeScript

### Creá: `src/day-4/user-manager.ts`

```typescript
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


// TODO: Convertir la clase a TypeScript
// (tipá todo: propiedades, constructor, métodos, parámetros, retornos)


// TODO: Exportar todo lo necesario
// (la clase, los types, las interfaces)
```

---

### Creá: `src/day-4/user-manager.test.ts`

```typescript
import { UserManager, User, UserRole } from './user-manager';

describe('UserManager - Refactoring JS→TS', () => {
  let manager: UserManager;

  beforeEach(() => {
    manager = new UserManager();
  });

  // ── Creación ──
  describe('createUser', () => {
    test('should create user with all properties', () => {
      const user = manager.createUser('Alice', 'alice@mail.com', 'admin');

      expect(user.id).toBeDefined();
      expect(user.name).toBe('Alice');
      expect(user.email).toBe('alice@mail.com');
      expect(user.role).toBe('admin');
      expect(user.active).toBe(true);
      expect(user.createdAt).toBeInstanceOf(Date);
    });

    test('should default role to user', () => {
      const user = manager.createUser('Bob', 'bob@mail.com');
      expect(user.role).toBe('user');
    });

    test('should assign unique ids', () => {
      const user1 = manager.createUser('Alice', 'alice@mail.com');
      const user2 = manager.createUser('Bob', 'bob@mail.com');
      expect(user1.id).not.toBe(user2.id);
    });

    test('should increment ids', () => {
      const user1 = manager.createUser('Alice', 'alice@mail.com');
      const user2 = manager.createUser('Bob', 'bob@mail.com');
      expect(user2.id).toBe(user1.id + 1);
    });
  });

  // ── Lectura ──
  describe('getUserById', () => {
    test('should find existing user', () => {
      const user = manager.createUser('Alice', 'alice@mail.com');
      const found = manager.getUserById(user.id);
      expect(found?.name).toBe('Alice');
    });

    test('should return undefined for non-existing', () => {
      expect(manager.getUserById(999)).toBeUndefined();
    });
  });

  // ── Actualización ──
  describe('updateUser', () => {
    test('should update user properties', () => {
      const user = manager.createUser('Alice', 'alice@mail.com');
      const updated = manager.updateUser(user.id, { name: 'Alicia' });
      expect(updated?.name).toBe('Alicia');
      expect(updated?.email).toBe('alice@mail.com'); // No cambió
    });

    test('should return null for non-existing', () => {
      expect(manager.updateUser(999, { name: 'Ghost' })).toBeNull();
    });
  });

  // ── Eliminación ──
  describe('deleteUser', () => {
    test('should delete existing user', () => {
      const user = manager.createUser('Alice', 'alice@mail.com');
      expect(manager.deleteUser(user.id)).toBe(true);
      expect(manager.getUserById(user.id)).toBeUndefined();
    });

    test('should return false for non-existing', () => {
      expect(manager.deleteUser(999)).toBe(false);
    });
  });

  // ── Filtrado ──
  describe('getUsersByRole', () => {
    beforeEach(() => {
      manager.createUser('Alice', 'alice@mail.com', 'admin');
      manager.createUser('Bob', 'bob@mail.com', 'user');
      manager.createUser('Charlie', 'charlie@mail.com', 'user');
      manager.createUser('Diana', 'diana@mail.com', 'guest');
    });

    test('should filter by admin role', () => {
      const admins = manager.getUsersByRole('admin');
      expect(admins.length).toBe(1);
      expect(admins[0].name).toBe('Alice');
    });

    test('should filter by user role', () => {
      const users = manager.getUsersByRole('user');
      expect(users.length).toBe(2);
    });

    test('should filter by guest role', () => {
      const guests = manager.getUsersByRole('guest');
      expect(guests.length).toBe(1);
    });
  });

  // ── Activación ──
  describe('active/deactivate', () => {
    test('should get only active users', () => {
      const user1 = manager.createUser('Alice', 'alice@mail.com');
      manager.createUser('Bob', 'bob@mail.com');
      manager.deactivateUser(user1.id);

      const active = manager.getActiveUsers();
      expect(active.length).toBe(1);
      expect(active[0].name).toBe('Bob');
    });

    test('should deactivate user', () => {
      const user = manager.createUser('Alice', 'alice@mail.com');
      const deactivated = manager.deactivateUser(user.id);
      expect(deactivated?.active).toBe(false);
    });

    test('should return null when deactivating non-existing', () => {
      expect(manager.deactivateUser(999)).toBeNull();
    });
  });

  // ── Búsqueda ──
  describe('searchUsers', () => {
    beforeEach(() => {
      manager.createUser('Alice Johnson', 'alice@mail.com');
      manager.createUser('Bob Smith', 'bob@company.org');
      manager.createUser('Charlie Brown', 'charlie@mail.com');
    });

    test('should search by name', () => {
      const results = manager.searchUsers('alice');
      expect(results.length).toBe(1);
      expect(results[0].name).toBe('Alice Johnson');
    });

    test('should search by email', () => {
      const results = manager.searchUsers('company');
      expect(results.length).toBe(1);
      expect(results[0].name).toBe('Bob Smith');
    });

    test('should be case-insensitive', () => {
      const results = manager.searchUsers('CHARLIE');
      expect(results.length).toBe(1);
    });

    test('should find multiple matches', () => {
      const results = manager.searchUsers('mail.com');
      expect(results.length).toBe(2);
    });
  });

  // ── Estadísticas ──
  describe('getUserStats', () => {
    test('should return zeros for empty manager', () => {
      const stats = manager.getUserStats();
      expect(stats.total).toBe(0);
      expect(stats.active).toBe(0);
      expect(stats.inactive).toBe(0);
      expect(stats.byRole).toEqual({});
    });

    test('should count correctly', () => {
      const user1 = manager.createUser('Alice', 'alice@mail.com', 'admin');
      manager.createUser('Bob', 'bob@mail.com', 'user');
      manager.createUser('Charlie', 'charlie@mail.com', 'user');
      manager.deactivateUser(user1.id);

      const stats = manager.getUserStats();

      expect(stats.total).toBe(3);
      expect(stats.active).toBe(2);
      expect(stats.inactive).toBe(1);
      expect(stats.byRole).toEqual({ admin: 1, user: 2 });
    });
  });
});
```

---

## 💡 HINTS

**Hint 1 (Types):** Mirá los tests para deducir los tipos. `user.id` se compara con números y se incrementa → es `number`. `user.role` puede ser 'admin', 'user', 'guest' → es un union de string literals.

**Hint 2 (createUser - role opcional):** En el JS original usa `role || 'user'`. En TypeScript, hacé el parámetro opcional con valor por defecto: `role: UserRole = 'user'`.

**Hint 3 (updateUser):** El JS original usa `Object.assign(user, updates)` que muta el objeto original. Está bien para este caso porque queremos actualizar el user en el array. Usá `Partial<>` para tipar los updates.

**Hint 4 (getUserStats - byRole):** `byRole` es un objeto con keys dinámicas. Pensá en `Record<string, number>` o en un index signature.

**Hint 5 (Mejoras sobre el JS original):** El código JS original tiene `this.users` y `this.nextId` públicos. En TypeScript podés hacerlos `private`. También `id` y `createdAt` deberían ser `readonly` en la interface User.

---

## Best Practices (lectura rápida)

Mientras esperás que los tests corran o después de terminar, repasá estas buenas prácticas:

### 1. Siempre strict mode

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true  // No negociable
  }
}
```

### 2. Evitar `any`

```typescript
// ❌ MAL
function process(data: any) {
  return data.value;
}

// ✅ BIEN: Tipá correctamente
interface DataWithValue {
  value: string;
}

function process(data: DataWithValue) {
  return data.value;
}

// ✅ Si realmente no sabés el tipo: unknown + verificación
function process(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as DataWithValue).value;
  }
}
```

### 3. Preferir interfaces para objetos, types para uniones

```typescript
// ✅ Interface para objetos
interface User {
  id: string;
  name: string;
}

// ✅ Type para uniones
type Status = 'active' | 'inactive';
type ID = string | number;
```

### 4. Usar readonly cuando corresponda

```typescript
interface User {
  readonly id: number;        // Nunca cambia
  readonly createdAt: Date;   // Nunca cambia
  name: string;               // Puede cambiar
  email: string;              // Puede cambiar
}
```

### 5. Usar Partial para updates

```typescript
// ❌ MAL: Parámetro acepta cualquier objeto
function updateUser(id: number, updates: any) { }

// ✅ BIEN: Solo acepta propiedades válidas de User
function updateUser(id: number, updates: Partial<User>) { }
```

### 6. Usar Omit para proteger campos

```typescript
// ✅ No permitir cambiar id ni createdAt
function updateUser(
  id: number,
  updates: Partial<Omit<User, 'id' | 'createdAt'>>
) { }
```

### 7. Type guards para narrowing seguro

```typescript
// ✅ Type guard reutilizable
function isString(value: unknown): value is string {
  return typeof value === 'string';
}
```

### 8. Usar el tipo más específico posible

```typescript
// ❌ Genérico
function setStatus(status: string) { }
setStatus('whatever'); // Acepta cualquier string

// ✅ Específico
type Status = 'active' | 'inactive' | 'banned';
function setStatus(status: Status) { }
setStatus('whatever'); // ❌ Error en compile-time
```

---

## Cuando termines

```bash
npm test
```

Deberías ver TODOS los tests pasando (day-1 al day-4).

```bash
git add .
git commit -m "Day 4 complete: Task Manager + UserManager refactoring JS to TS - all tests passing"
git push
```

---

## ✅ CHECKLIST DÍA 4 COMPLETO

- [ ] Proyecto integrador (Task Manager) completo y tests en verde
- [ ] Refactoring JS→TS (UserManager) completo y tests en verde
- [ ] Definiste types/interfaces correctos deducidos del código
- [ ] Usaste modificadores de acceso (private)
- [ ] Usaste readonly donde corresponde
- [ ] Todos los tests pasan con `npm test`
- [ ] Commit final pusheado a GitHub

---

## ✅ CHECKLIST FINAL DEL ENTRENAMIENTO

### Setup:
- [ ] Node.js + NPM configurado
- [ ] TypeScript + Jest funcionando
- [ ] Scripts NPM corriendo (build, test, test:watch)
- [ ] tsconfig.json con strict mode
- [ ] Repo en GitHub con todo el código

### Conceptos dominados:
- [ ] Types primitivos (string, number, boolean)
- [ ] Arrays tipados y tuples
- [ ] Object types inline
- [ ] Interfaces (básicas, herencia, para funciones)
- [ ] Type aliases
- [ ] Union types y discriminated unions
- [ ] Intersection types
- [ ] Enums (string y numéricos)
- [ ] Generics (funciones, interfaces, clases)
- [ ] Constraints (extends, keyof)
- [ ] Utility types (Partial, Pick, Omit, Readonly, Record)
- [ ] Classes con modificadores (public, private, protected, readonly)
- [ ] Abstract classes
- [ ] Implements (clases que cumplen interfaces)
- [ ] Type guards (typeof, in, custom con "is")
- [ ] Narrowing

### Práctica:
- [ ] Todos los ejercicios completados (Día 1-3)
- [ ] Proyecto integrador completo (Task Manager)
- [ ] Refactoring JS→TS completado (UserManager)
- [ ] Todos los tests pasando

### Listo para:
- [ ] ✅ Patrones de Diseño con TypeScript
- [ ] ✅ Testing avanzado
- [ ] ✅ Proyectos profesionales

---

**FIN DEL ENTRENAMIENTO DE TYPESCRIPT ESSENTIALS**

Cuando termines, avisame para el cierre y feedback final.
