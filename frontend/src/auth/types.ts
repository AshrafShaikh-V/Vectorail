export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: 'ADMIN' | 'DISPATCHER' | 'VIEWER';
  avatar?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
