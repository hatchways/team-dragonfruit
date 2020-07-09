const validate = (userData) => {
  const { email, password } = userData;

  let errors = {};
  // email not null and is a valid email
  if (!email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Email address is invalid';
  }
  // password not null and at least 7 characters
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 7) {
    errors.password = 'Password need to be more than 7 characters';
  }

  return errors;
};

export default validate;
