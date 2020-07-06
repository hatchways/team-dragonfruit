import React from 'react';
import WithBackground from '../hocs/withBackground';

import Signup from '../components/Signup';

const SignupPage = () => {
  return (
    <WithBackground>
      <Signup />
    </WithBackground>
  );
};

export default SignupPage;
