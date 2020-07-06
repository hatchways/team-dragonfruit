import React from 'react';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <Link to='balance'>Balance</Link>
    </>
  );
};

export default Dashboard;
