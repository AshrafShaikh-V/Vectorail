import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, AuthState } from './types';
import { authService } from './authService';

interface AuthContextType extends AuthState {
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const initAuth = () => {
      const user = authService.getCurrentUser();
      setState({
        user,
        isAuthenticated: !!user,
        isLoading: false,
      });
    };

    initAuth();
  }, []);

  const login = async (credentials: any) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const user = await authService.login(credentials);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    try {
      const updatedUser = authService.updateUser(updates);
      setState((prev) => ({
        ...prev,
        user: updatedUser,
      }));
    } catch (error) {
      console.error('Failed to update user profile', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
