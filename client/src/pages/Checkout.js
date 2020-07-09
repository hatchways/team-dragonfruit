import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Navbar from './Navbar';

import StripeInput from '../components/StripeInput';

const useStyles = makeStyles((theme) => ({
  checkoutContainer: {
    display: 'flex',
    backgroundColor: '#dee2e6',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '95vh',
  },
}));

const Checkout = () => {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <div className={classes.checkoutContainer}>
        <StripeInput />
      </div>
    </>
  );
};

export default Checkout;
