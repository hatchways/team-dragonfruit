import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Paper, Divider } from '@material-ui/core';

import Credit from './Credit';
import Topup from './Topup';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '600px',
    maxWidth: '700px',
    margin: '2rem auto',
    padding: '3rem 0',
    alignItems: 'center',
    background: 'secondary',
    borderRadius: '0.6rem',
  },
}));

const Balance = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper elevation={0} className={classes.container}>
        <Credit />
        <Divider variant='middle' />
        <Topup />
      </Paper>
    </div>
  );
};

export default Balance;
