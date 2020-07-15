import React, { useContext } from 'react';
import {
  Box,
  Typography,
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { AuthContext } from '../context/AuthContext';

import Review from './Review';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#ffffff',
    paddingTop: '3rem',
    height: 'auto',
    minHeight: '100vh',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  total: {
    color: theme.palette.primary.main,
  },
  heading: {
    fontSize: '1rem',
    fontWeight: 'bold',
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

  const { user, reviews } = useContext(AuthContext);

  // get the reviews needed
  const requestedReviews = reviews.filter(
    (review) => review.author === user._id
  );
  const receivedReviews = reviews.filter(
    (review) => review.author !== user._id
  );

  // total of each kind of reviews
  const requestedReviewNum = requestedReviews.length;
  const receivedReviewNum = receivedReviews.length;

  return (
    <Container className={classes.root}>
      <Typography align='center' className={classes.title}>
        {title}{' '}
        <Box component='span' className={classes.total}>
          ({reviews.length})
        </Box>
      </Typography>
      {/* Request */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography className={classes.heading}>
            Requested ({requestedReviewNum})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.list}>
            {requestedReviews.map((review) => (
              <Review review={review} key={review.id} />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
      {/* Receive */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography className={classes.heading}>
            Received ({receivedReviewNum})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.list}>
            {receivedReviews.map((review) => (
              <Review review={review} key={review.id} />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default ReviewList;
