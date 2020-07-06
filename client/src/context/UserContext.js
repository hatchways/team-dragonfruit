import React, { createContext, useState, useEffect } from 'react';

import UserService from '../services/UserService';

import Loading from '../components/utils/Loading';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    UserService.getUser().then((data) => setUser(data));
  }, []);

  if (!user) return <Loading />;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
