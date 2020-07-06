import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';

import AuthService from '../../services/AuthService';

import validate from '../../utils/validateForm';

import {
  Typography,
  TextField,
  FormControl,
  Box,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Button,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

import Message from '../utils/Message';

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '500px',
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '3rem 0',
    alignItems: 'center',
  },
  title: {
    marginBottom: '3rem',
  },
  input: {
    width: '300px',
    marginBottom: '0.5rem',
  },
  loginBtn: {
    padding: '0.7rem 4rem',
    borderRadius: '2rem',
    background: 'turquoise',
    textTransform: 'capitalize',
    fontSize: '1rem',
    margin: '3rem 0',
    boxShadow: 'transparent',
    outline: 'transparent',
    border: 'transparent',
    '&:hover': {
      backgroundColor: '#43dd9a',
      color: '#6E3ADB',
    },
  },
  text: {
    fontWeight: 'bold',
  },
  link: {
    color: 'primary',
    fontWeight: 'bold',
    marginLeft: '0.7rem',
    textDecoration: 'none',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '0.5rem',
    marginTop: '0.5rem',
  },
}));

const Login = () => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  // console.log(authContext);

  const [userData, setUserData] = useState({
    name: 'default',
    email: '',
    password: '',
  });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle Errors
    setErrorData(validate(userData));
    setIsSubmitting(true);
  };

  useEffect(() => {
    // if localStorage stores user obj -> isAuth: true
    if (localStorage.getItem('user')) {
      authContext.setIsAuthenticated(true);
    }

    // no form
    if (Object.keys(errorData).length === 0 && isSubmitting) {
      AuthService.login(userData).then((data) => {
        if (data.errorMsg) {
          console.log(data.errorMsg);
          setLoginError(data.errorMsg.msg);
        } else {
          authContext.setUser(data);
          authContext.setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(data));
          console.log({ msg: 'Login OK' });
        }
      });
    }
    setIsSubmitting(false);
  }, [authContext, errorData, isSubmitting, userData]);

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <Paper className={classes.loginContainer}>
          <Typography variant='h3' className={classes.title}>
            Welcome back!
          </Typography>

          <TextField
            label='E-mail address'
            type='email'
            variant='outlined'
            className={classes.input}
            required
            inputProps={{
              min: 0,
              style: { textAlign: 'center', fontWeight: 'bold' },
            }}
            name='email'
            value={userData.email}
            onChange={handleChange}
          />
          {errorData.email && (
            <Typography variant='subtitle1' className={classes.error}>
              {errorData.email}
            </Typography>
          )}

          <FormControl variant='outlined' className={classes.input}>
            <InputLabel htmlFor='outlined-adornment-password'>
              Password
            </InputLabel>
            <OutlinedInput
              id='outlined-adornment-password'
              type='password'
              required
              name='password'
              inputProps={{
                min: 0,
                style: { textAlign: 'center', fontWeight: 'bold' },
              }}
              value={userData.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position='end'>Forget?</InputAdornment>
              }
              labelWidth={70}
            />
            {errorData.password && (
              <Typography variant='subtitle1' className={classes.error}>
                {errorData.password}
              </Typography>
            )}
          </FormControl>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            disableElevation
            className={classes.loginBtn}
          >
            Login
          </Button>

          <Box>
            <Typography variant='inherit' className={classes.text}>
              Don't have an account?
            </Typography>
            <Link to='/signup' className={classes.link}>
              Create
            </Link>
          </Box>
        </Paper>
        {loginError && (
          <Message open={true} type='error' message={loginError} />
        )}
      </form>
    </>
  );
};

export default Login;
