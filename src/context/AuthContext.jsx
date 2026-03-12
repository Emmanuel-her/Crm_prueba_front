import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const loginContext = (newToken, userData) => {
    setToken(newToken);
    if (userData) setUser(userData);
  };

  const logoutContext = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, login: loginContext, logout: logoutContext, loading }}>
        {children}
    </AuthContext.Provider>
  );
};
