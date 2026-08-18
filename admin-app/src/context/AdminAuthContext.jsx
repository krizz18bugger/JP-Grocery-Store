import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AdminAuthContext = createContext(null);

const BASE_URL = 'http://localhost:5000/api';

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = localStorage.getItem('jp_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const [adminToken, setAdminToken] = useState(
    () => localStorage.getItem('jp_admin_token') || null
  );

  const persist = (user, token) => {
    setAdminUser(user);
    setAdminToken(token);
    localStorage.setItem('jp_admin_user', JSON.stringify(user));
    localStorage.setItem('jp_admin_token', token);
  };

  const login = async (email, password) => {
    const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });

    if (res.data.role !== 'admin') {
      throw new Error('Access denied. Admin accounts only.');
    }

    persist(res.data, res.data.token);
    return res.data;
  };

  const logout = () => {
    setAdminUser(null);
    setAdminToken(null);
    localStorage.removeItem('jp_admin_user');
    localStorage.removeItem('jp_admin_token');
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, adminToken, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside <AdminAuthProvider>');
  return ctx;
};
