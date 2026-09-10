import { AuthUser, LoginCredentials } from './types';

const AUTH_STORAGE_KEY = 'vectorail_auth_session';

// Demo credentials
const DEMO_USERS: Record<string, { password: string; user: AuthUser }> = {
  'dispatcher@vectorail.net': {
    password: 'Sector01Operations!',
    user: {
      id: 'user-001',
      email: 'dispatcher@vectorail.net',
      username: 'Vectorail Operator',
      role: 'DISPATCHER',
    },
  },
  'admin@vectorail.net': {
    password: 'AdminControl2026!',
    user: {
      id: 'user-000',
      email: 'admin@vectorail.net',
      username: 'System Administrator',
      role: 'ADMIN',
    },
  },
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 600));

    const demoAccount = DEMO_USERS[credentials.username];

    if (demoAccount && demoAccount.password === credentials.password) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(demoAccount.user));
      return demoAccount.user;
    }

    throw new Error('Invalid credentials');
  },

  logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  getCurrentUser(): AuthUser | null {
    const session = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!session) return null;

    try {
      return JSON.parse(session) as AuthUser;
    } catch {
      this.logout();
      return null;
    }
  },

  updateUser(updates: Partial<AuthUser>): AuthUser {
    const currentUser = this.getCurrentUser();
    if (!currentUser) throw new Error('No authenticated user found');

    const updatedUser = { ...currentUser, ...updates };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  },

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  },
};
