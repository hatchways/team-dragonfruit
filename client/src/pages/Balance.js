import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Balance from '../components/Balance';

import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
  balanceContainer: {
    display: 'flex',
    backgroundColor: '#dee2e6',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '95vh',
  },
}));

const BalancePage = () => {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <div className={classes.balanceContainer}>
        <Balance />
      </div>
    </>
  );
};

export default BalancePage;
