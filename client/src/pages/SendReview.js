import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Navbar from './Navbar';
import ReviewList from '../components/ReviewList';
import ReviewDetails1 from '../components/ReviewDetails1';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const SendReview = () => {
  const classes = useStyles();

  return (
    <div>
      <Navbar />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <ReviewList title='Code to review' />
          </Grid>
          <Grid item xs={12} md={8}>
            <ReviewDetails1 />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SendReview;
