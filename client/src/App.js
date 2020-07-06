import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';

import { theme } from './themes/theme';
import LandingPage from './pages/Landing';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';

import Dashboard from './pages/Dashboard';
import Balance from './pages/BalancePage';

import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';

import './App.css';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path='/' component={LandingPage} />
        <PrivateRoute path='/balance' component={Balance} />

        <UnPrivateRoute path='/signup' component={Signup} />
        <UnPrivateRoute path='/login' component={Login} />
        <PrivateRoute path='/dashboard' component={Dashboard} />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
