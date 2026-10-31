import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('skillswap_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If no user is logged in, default to Aarav Sharma so the user immediately sees a rich dashboard
    if (!user) {
      quickSwitchUser('aarav@skillswap.edu');
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await api.login(email, password);
      localStorage.setItem('skillswap_token', data.token);
      localStorage.setItem('skillswap_user', JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const data = await api.register(formData);
      localStorage.setItem('skillswap_token', data.token);
      localStorage.setItem('skillswap_user', JSON.stringify(data.user));
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('skillswap_token');
    localStorage.removeItem('skillswap_user');
    setUser(null);
  };

  const reloadUser = async () => {
    if (!user?.user_id) return;
    try {
      const fresh = await api.getProfile(user.user_id);
      setUser(prev => {
        const updated = { ...prev, ...fresh };
        localStorage.setItem('skillswap_user', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error('Failed to reload user:', err);
    }
  };

  const quickSwitchUser = async (email) => {
    try {
      await login(email, 'password123');
    } catch (err) {
      console.warn('Quick switch fallback:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, reloadUser, quickSwitchUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
