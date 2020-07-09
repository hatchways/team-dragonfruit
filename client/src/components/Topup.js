import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container, Button } from '@material-ui/core';

import { Remove, Add } from '@material-ui/icons';

// import UserService from '../services/UserService';
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: '1.5rem',
    fontWeight: '600',
    letterSpacing: '1px',
  },
  topupContainer: {
    display: 'flex',
    width: '200px',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1.5rem',
    padding: '0.7rem 0.3rem',
    border: '1px solid #dee2e6',
    borderRadius: '20px',
  },
  icon: {
    padding: '0.4rem',
    background: '#dee2e6',
    borderRadius: '7px',
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
    margin: '2rem 0',
    '&:hover': {
      backgroundColor: '#43dd9a',
      color: '#6E3ADB',
    },
  },
}));

const Topup = () => {
  const classes = useStyles();

  const { setTopupAmount } = useContext(AuthContext);
  const history = useHistory();

  const [topupCredit, setTopupCredit] = useState(1);

  const increase = (topupCredit) => {
    setTopupCredit(topupCredit + 1);
  };
  const decrease = (topupCredit) => {
    if (topupCredit >= 2) {
      setTopupCredit(topupCredit - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTopupAmount(topupCredit);
    setTopupCredit(1);
    history.push('/checkout');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Typography variant='h5' className={classes.title} align='center'>
          Top Up:
        </Typography>
        <Container className={classes.topupContainer}>
          <Remove
            className={classes.icon}
            onClick={() => decrease(topupCredit)}
          />
          <Typography variant='h5' align='center'>
            {topupCredit}
          </Typography>
          <Add className={classes.icon} onClick={() => increase(topupCredit)} />
        </Container>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          disableElevation
          className={classes.checkoutBtn}
        >
          Checkout - ${topupCredit * 3}
        </Button>
      </div>
    </form>
  );
};

export default Topup;
