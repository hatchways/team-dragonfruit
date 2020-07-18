import React, { createContext, useState, useEffect } from "react";

import Loading from "../components/Loading";

import UserService from "../services/UserService";

export const AuthContext = createContext();

const reviewData = [
  {
    id: 1,
    title: "Animation",
    type: "request",
    author: "5f033469193d9013749866a2",
    code: "abcd code",
    review: "review",
    reviewer: "5f0dc24b5f95d207fc196b79",
    date: "Jun 20, 2020",
  },
  {
    id: 2,
    title: "Stuck with component",
    type: "receive",
    author: "5f0dc24b5f95d207fc196b79",
    code: "abcd code",
    review: "review",
    reviewer: "5f033469193d9013749866a2",
    date: "Jun 15, 2020",
  },
  {
    id: 3,
    title: "Latest Request",
    type: "request",
    author: "5f033469193d9013749866a2",
    code: "abcd code",
    review: "review",
    reviewer: "5f0dc24b5f95d207fc196b79",
    date: "Jun 20, 2020",
  },
  {
    id: 4,
    title: "Latest Request 4",
    type: "request",
    author: "5f033469193d9013749866a2",
    code: "abcd code",
    review: "review",
    reviewer: "5f0dc24b5f95d207fc196b79",
    date: "Jun 20, 2020",
  },
];

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [topupAmount, setTopupAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [reviews, setReviews] = useState(reviewData);
  const [selectedReview, setSelectedReview] = useState(null);
  const [requestedReviews, setRequestedReviews] = useState(null);
  const [receivedReviews, setReceivedReviews] = useState(null);

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
        selectedReview,
        setSelectedReview,
        requestedReviews,
        setRequestedReviews,
        receivedReviews,
        setReceivedReviews,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
