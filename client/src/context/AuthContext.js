import React, { createContext, useState, useEffect } from "react";

import Loading from "../components/Loading";

import UserService from "../services/UserService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [topupAmount, setTopupAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    UserService.getUser().then((data) => setUser(data));
  }, []);

  // Show Processing Icon if !user
  if (!user) return <Loading />;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        topupAmount,
        setTopupAmount,
        amount,
        setAmount,
        selectedReview,
        setSelectedReview,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
