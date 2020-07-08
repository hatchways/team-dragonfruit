import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Paper, Box } from '@material-ui/core';

import Credit from './Credit';
import Topup from './Topup';

import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    maxWidth: '450px',
    margin: '1rem auto',
    padding: '1rem 0',
    alignItems: 'center',
    background: 'secondary',
    borderRadius: '0.6rem',
  },
  hr: {
    width: '100%',
    border: 'none',
    color: '#dee2e6',
    background: '#dee2e6',
    height: '1px',
  },
}));

const Balance = () => {
  const classes = useStyles();

  const { user } = useContext(AuthContext);

  return (
    <div>
      <Paper elevation={0} className={classes.container}>
        <Credit user={user} />
        <Box className={classes.hr} component='hr' />
        <Topup />
      </Paper>
    </div>
  );
};

export default Balance;
