/**
 * 🔐 VETRIC - Context de Autenticação
 * Gerencia estado global do usuário autenticado
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { getApiBaseUrl } from '../config/runtime';

// Tipos
export type UserRole = 'ADMIN' | 'CLIENTE';

export interface User {
  id: string;
  email: string;
  nome: string;
  role: UserRole;
  ativo: boolean;
  ultimo_acesso?: string;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface AuthContextData {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCliente: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  sindico?: User | null; // Alias para compatibilidade
}

// Context
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem('@vetric:token');
    const storedUser = localStorage.getItem('@vetric:user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      
      // Configurar axios com token
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }

    setIsLoading(false);
  }, []);

  // Login
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post(`${getApiBaseUrl()}/api/auth/login`, credentials);

      if (response.data.success) {
        const { token: newToken, usuario } = response.data;

        setToken(newToken);
        setUser(usuario);

        // Salvar no localStorage
        localStorage.setItem('@vetric:token', newToken);
        localStorage.setItem('@vetric:user', JSON.stringify(usuario));

        // Configurar axios com token
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      } else {
        throw new Error(response.data.message || 'Erro ao fazer login');
      }
    } catch (error: any) {
      console.error('Erro no login:', error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Erro ao fazer login. Verifique suas credenciais.'
      );
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);

    // Remover do localStorage
    localStorage.removeItem('@vetric:token');
    localStorage.removeItem('@vetric:user');

    // Remover token do axios
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN',
        isCliente: user?.role === 'CLIENTE',
        isLoading,
        login,
        logout,
        sindico: user, // Alias para compatibilidade
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}
