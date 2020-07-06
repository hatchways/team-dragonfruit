import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';

import { theme } from './themes/theme';

import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';

import Dashboard from './pages/Dashboard';
import Balance from './pages/BalancePage';

import PrivateRoute from './hocs/PrivateRoute';
import PublicRoute from './hocs/PublicRoute';

import AuthProvider from './context/AuthContext';

import './App.css';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <PublicRoute path='/signup' component={Signup} />
          <PublicRoute path='/login' component={Login} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/balance' component={Balance} />
        </BrowserRouter>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
