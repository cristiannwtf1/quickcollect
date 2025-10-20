// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user')) || null; }
    catch { return null; }
  });

  useEffect(() => {
    // aquí podrías refrescar token si hace falta
  }, []);

  const login = (token, userObj) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userObj));
    setUser(userObj);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, login, logout, isAuthenticated: !!user };
}
