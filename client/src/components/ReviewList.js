import React, { useContext } from 'react';
import { Box, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AuthContext } from '../context/AuthContext';

import Review from './Review';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#ffffff',
    paddingTop: '3rem',
    height: '100vh',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  total: {
    color: theme.palette.primary.main,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

const ReviewList = ({ title }) => {
  const classes = useStyles();

  const { reviews } = useContext(AuthContext);

  return (
    <Container className={classes.root}>
      <Typography align='center' className={classes.title}>
        {title}
        <Box component='span' className={classes.total}>
          ({reviews.length})
        </Box>
      </Typography>
      <div className={classes.list}>
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </Container>
  );
};

export default ReviewList;
