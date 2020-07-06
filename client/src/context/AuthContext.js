import React, { createContext, useState, useEffect } from 'react';

import Loading from '../components/Loading';

import UserService from '../services/UserService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    UserService.getUser().then((data) => setUser(data));
  }, []);

  // Show Processing Icon if !user
  if (!user) return <Loading />;

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
