import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';

import { theme } from './themes/theme';

import Profile from './pages/Profile';
import Reviews from './pages/Reviews';

import Upload from './pages/Upload';

import Login from './pages/Login';
import Signup from './pages/Signup';

import Dashboard from './pages/Dashboard';
import Balance from './pages/Balance';

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
          <Route path='/profile' exact component={Profile} />
          <Route path='/reviews' exact component={Reviews} />
          <Route path='/upload' exact component={Upload} />
        </BrowserRouter>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
