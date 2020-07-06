import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: '1.5rem',
    fontWeight: '500',
    letterSpacing: '1px',
  },
  credit: {
    paddingBottom: '1.5rem',
    fontWeight: 'bold',
    borderBottom: '1px solid #dee2e6',
    letterSpacing: '1px',
  },
}));

const Credit = ({ user }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant='h3' className={classes.title}>
        Your balance:
      </Typography>
      <Typography
        variant='h4'
        className={classes.credit}
        align='center'
        color='primary'
      >
        {user.balance} {user.balance === 1 ? ' credit' : ' credits'}
      </Typography>
    </div>
  );
};

export default Credit;
