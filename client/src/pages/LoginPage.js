import React from 'react';
import WithBackground from '../hocs/withBackground';

import Login from '../components/Login';

const LoginPage = () => {
  return (
    <WithBackground>
      <Login />
    </WithBackground>
  );
};

export default LoginPage;
