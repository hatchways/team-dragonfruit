import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        // Check if not authenticated, redirect to LOGIN
        if (!isAuthenticated)
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
