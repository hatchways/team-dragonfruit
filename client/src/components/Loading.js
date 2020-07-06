import React from 'react';

import { makeStyles } from '@material-ui/styles';

import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh',
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.loadingContainer}>
      <CircularProgress size={80} />
    </div>
  );
};

export default Loading;
