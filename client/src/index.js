import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import AuthProvider from './context/AuthContext';
import UserProvider from './context/UserContext';

ReactDOM.render(
  <AuthProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </AuthProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
