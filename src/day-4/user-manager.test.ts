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
