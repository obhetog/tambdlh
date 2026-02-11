import React, { createContext, useContext, useState, useCallback } from 'react';

export type UserRole = 'admin' | 'user' | 'verifikator';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demo
const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin Sistem', email: 'admin@perizinan.go.id', role: 'admin' },
  { id: '2', name: 'PT Tambang Sejahtera', email: 'user@tambang.co.id', role: 'user' },
  { id: '3', name: 'Verifikator Dinas LH', email: 'verifikator@dlh.go.id', role: 'verifikator' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, _password: string) => {
    const found = MOCK_USERS.find(u => u.email === email);
    if (found) {
      setUser(found);
      return true;
    }
    // For demo, accept any email with a role guess
    const role: UserRole = email.includes('admin') ? 'admin' : email.includes('verif') ? 'verifikator' : 'user';
    setUser({ id: Date.now().toString(), name: email.split('@')[0], email, role });
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string, role: UserRole) => {
    setUser({ id: Date.now().toString(), name, email, role });
    return true;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
