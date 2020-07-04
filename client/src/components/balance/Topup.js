import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Button } from '@material-ui/core';

import { Remove, Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: '1.5rem',
    fontWeight: '600',
    letterSpacing: '1px',
  },
  topupContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1.5rem',
    padding: '0.7rem 0.3rem',
    border: '1px solid #dee2e6',
    borderRadius: '20px',
  },
  iconBtn: {
    padding: '0px',
    margin: '0px',
    width: 'auto',
  },
  icon: {
    padding: '0.3rem',
    background: '#dee2e6',
    borderRadius: '5px',
    margin: '0 1rem',
    '&:hover': {
      background: '#6E3ADB',
      color: '#fff',
    },
  },
  checkoutBtn: {
    padding: '0.7rem 4rem',
    borderRadius: '2rem',
    background: 'turquoise',
    textTransform: 'capitalize',
    fontSize: '1rem',
    margin: '3rem 0',
    '&:hover': {
      backgroundColor: '#43dd9a',
      color: '#6E3ADB',
    },
  },
}));

const Topup = () => {
  const classes = useStyles();

  const [topupCredit, setTopupCredit] = useState(1);

  const increase = (topupCredit) => {
    setTopupCredit(topupCredit + 1);
  };
  const decrease = (topupCredit) => {
    if (topupCredit >= 2) {
      setTopupCredit(topupCredit - 1);
    }
  };

  return (
    <div>
      <Typography variant='h5' className={classes.title} align='center'>
        Top Up:
      </Typography>
      <Container className={classes.topupContainer}>
        <Button
          disableElevation
          disableRipple
          className={classes.iconBtn}
          onClick={() => decrease(topupCredit)}
        >
          <Remove className={classes.icon} />
        </Button>
        <Typography variant='h5' align='center'>
          {topupCredit}
        </Typography>
        <Button
          disableElevation
          disableRipple
          className={classes.iconBtn}
          onClick={() => increase(topupCredit)}
        >
          <Add className={classes.icon} />
        </Button>
      </Container>

      <Button
        type='submit'
        variant='contained'
        color='primary'
        disableElevation
        className={classes.checkoutBtn}
      >
        Checkout
      </Button>
    </div>
  );
};

export default Topup;
