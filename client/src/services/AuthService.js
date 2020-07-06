export default {
  // Login
  login: (user) => {
    return fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      if (res.status !== 200) {
        return { errorMsg: { msg: 'Invalid credential' } };
      } else {
        return res.json().then((data) => data);
      }
    });
  },
  // Signup
  signup: (user) => {
    return fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      if (res.status !== 201) {
        return { errorMsg: { msg: 'User is already taken' } };
      } else {
        return res.json().then((data) => data);
      }
    });
  },
  // Logout
  logout: () => {
    return fetch('/api/users/logout')
      .then((res) => res.json())
      .then((data) => data);
  },
  // Check Authenticated
  isAuthenticated: () => {
    return fetch('/user/authenticated').then((res) => {
      if (res.status !== 401) {
        return res.json().then((data) => data);
      } else {
        return { isAuthenticated: false, user: { username: '', role: '' } };
      }
    });
  },
};
