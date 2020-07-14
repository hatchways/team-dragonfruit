import React, { createContext, useState, useEffect } from 'react';

import Loading from '../components/Loading';

import UserService from '../services/UserService';

export const AuthContext = createContext();

const reviewData = [
  {
    id: 1,
    title: 'Animation',
    type: 'request',
    author: 'Robert',
    code: 'abcd code',
    review: 'review',
    reviewer: 'John',
    date: 'Jun 20, 2020',
  },
  {
    id: 2,
    title: 'Stuck with component',
    type: 'receive',
    author: 'Robert 12',
    code: 'abcd code',
    review: 'review',
    reviewer: 'John 12',
    date: 'Jun 15, 2020',
  },
];

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [topupAmount, setTopupAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [reviews, setReviews] = useState(reviewData);

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
        reviews,
        setReviews,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
