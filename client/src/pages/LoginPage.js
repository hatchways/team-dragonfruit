import React from 'react';
import WithBackground from '../hocs/withBackground';

import Login from '../components/auth/Login';

const LoginPage = () => {
  return (
    <WithBackground>
      <Login />
    </WithBackground>
  );
};

export default LoginPage;
