import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import AuthService from "../services/AuthService";

import Message from "./Message";

import { Typography, TextField, Box, Paper, Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

import validate from "../utils/validateForm";

const useStyles = makeStyles((theme) => ({
  registerContainer: {
    display: "flex",
    flexDirection: "column",
    width: "500px",
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "3rem 0",
    alignItems: "center",
    background: "secondary",
  },
  title: {
    marginBottom: "3rem",
  },
  input: {
    width: "300px",
    marginBottom: "1rem",
  },
  registerBtn: {
    padding: "0.7rem 4rem",
    borderRadius: "2rem",
    background: "turquoise",
    textTransform: "capitalize",
    fontSize: "1rem",
    margin: "3rem 0",
    "&:hover": {
      backgroundColor: "#43dd9a",
      color: "#6E3ADB",
    },
  },
  text: {
    fontWeight: "bold",
  },
  link: {
    color: "primary",
    fontWeight: "bold",
    marginLeft: "0.7rem",
    textDecoration: "none",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "0.5rem",
  },
}));

const Signup = () => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);

  const [userData, setUserData] = useState({
    name: "default",
    email: "",
    password: "",
  });

  const [errorData, setErrorData] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupError, setSignupError] = useState(null);

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
    if (localStorage.getItem("user")) {
      authContext.setIsAuthenticated(true);
    }

    if (Object.keys(errorData).length === 0 && isSubmitting) {
      AuthService.signup(userData).then((data) => {
        if (data.errorMsg) {
          setSignupError(data.errorMsg.msg);
        } else {
          authContext.setUser(data);
          authContext.setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(data));
          console.log({ msg: "Register OK" });
        }
      });
    }
    setIsSubmitting(false);
  }, [authContext, errorData, isSubmitting, userData]);

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <Paper className={classes.registerContainer}>
          <Typography variant='h3' className={classes.title}>
            Create an account
          </Typography>

          <TextField
            label='E-mail address'
            type='email'
            variant='outlined'
            className={classes.input}
            inputProps={{
              min: 0,
              style: { textAlign: "center", fontWeight: "bold" },
            }}
            required
            name='email'
            value={userData.email}
            onChange={handleChange}
          />
          {errorData.email && (
            <Typography variant='subtitle1' className={classes.error}>
              {errorData.email}
            </Typography>
          )}

          <TextField
            label='Password'
            type='password'
            variant='outlined'
            className={classes.input}
            inputProps={{
              min: 6,
              style: { textAlign: "center", fontWeight: "bold" },
            }}
            required
            name='password'
            value={userData.password}
            onChange={handleChange}
          />
          {errorData.password && (
            <Typography variant='subtitle1' className={classes.error}>
              {errorData.password}
            </Typography>
          )}

          <Button
            type='submit'
            variant='contained'
            color='primary'
            disableElevation
            className={classes.registerBtn}
          >
            Sign Up
          </Button>

          <Box>
            <Typography variant='inherit' className={classes.text}>
              Already have an account?
            </Typography>
            <Link to='/login' className={classes.link}>
              Login
            </Link>
          </Box>
        </Paper>
        {signupError && (
          <Message open={true} type='error' message={signupError} />
        )}
      </form>
    </>
  );
};

export default Signup;
