// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '@/utils/api';
import { User, AuthResponse } from '@/types/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.post<AuthResponse>('api/auth/login', {
        email,
        password
      });
      
      if (response.status === 1 && response.access_token) {
        setToken(response.access_token);
        localStorage.setItem('token', response.access_token);
        
        const userResponse = await apiClient.get<User>('api/auth/me', response.access_token);
        if (userResponse.data) {
          setUser(userResponse.data);
        }
        
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Login failed' };
    }
  };

  const logout = async () => {
    if (token) {
      await apiClient.post('api/auth/logout', {}, token);
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      apiClient.get<User>('api/auth/me', storedToken)
        .then(userResponse => {
          if (userResponse.data) {
            setUser(userResponse.data);
          }
        })
        .catch(() => logout());
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};