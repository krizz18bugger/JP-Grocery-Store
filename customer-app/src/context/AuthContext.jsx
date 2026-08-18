import { createContext, useContext, useState } from 'react';
import { loginUser, registerUser } from '../api/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('jp_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const [token, setToken] = useState(() => localStorage.getItem('jp_token') || null);

  const persist = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem('jp_user', JSON.stringify(userData));
    localStorage.setItem('jp_token', jwt);
  };

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    persist(data, data.token);
    return data;
  };

  const register = async (name, email, password, phone, role) => {
    const data = await registerUser({ name, email, password, phone, role });
    persist(data, data.token);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('jp_user');
    localStorage.removeItem('jp_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
