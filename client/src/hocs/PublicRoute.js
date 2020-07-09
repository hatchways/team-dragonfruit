import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        // Prevent login or signup again, redirect to Dashboard
        if (isAuthenticated)
          return (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          );

        return <Component {...props} />;
      }}
    />
  );
};

export default PublicRoute;
