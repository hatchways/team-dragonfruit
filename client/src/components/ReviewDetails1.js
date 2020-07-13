import React from 'react';
import {
  Paper,
  Container,
  Box,
  Divider,
  Typography,
  Avatar,
  TextareaAutosize,
  Button,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

import img1 from '../images/avatar1.png';
import img2 from '../images/avatar2.png';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    maxWidth: '95%',
    margin: '2rem auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '1.5rem auto',
    paddingTop: '1.5rem',
  },
  date: {
    color: '#bababa',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  avatarHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  avatarImg: {
    margin: '0.5rem',
  },
  position: {
    color: '#bababa',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  posted: {
    color: '#bababa',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  authorName: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    marginTop: '0',
  },
  ratingBtn: {
    padding: '0.3rem 0.8rem',
    borderRadius: '2rem',
    background: 'turquoise',
    textTransform: 'capitalize',
    fontSize: '0.9rem',
    boxShadow: 'transparent',
    outline: 'transparent',
    border: 'transparent',

    '&:hover': {
      backgroundColor: '#43dd9a',
      color: '#6E3ADB',
    },
  },
  ratingForm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '23rem',
  },
  ratingTitle: {
    fontWeight: 'bold',
    fontSize: '0.8rem',
  },
  code: {
    margin: '1.5rem auto',
    width: '95%',
    padding: '1rem',
    border: 'none',
    outline: 'none',
    background: '#dee2e6',
  },
  review: {
    margin: '0 auto',
    width: '95%',
    padding: '1rem',
    outline: 'none',
    border: '1px solid #dee2e6',
  },

  reviewContent: {
    margin: '1rem 0 1rem 3.5rem',
  },
  reviewFooter: {
    margin: '1rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '1.5rem',
  },
  sendBtn: {
    padding: '0.3rem 0.8rem',
    borderRadius: '2rem',
    background: 'turquoise',
    textTransform: 'capitalize',
    fontSize: '0.8rem',
    boxShadow: 'transparent',
    outline: 'transparent',
    border: 'transparent',

    '&:hover': {
      backgroundColor: '#43dd9a',
      color: '#6E3ADB',
    },
  },
}));

const ReviewDetails1 = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Container className={classes.header}>
        <Box>
          <Typography variant='h6'>Animation</Typography>
          <Typography className={classes.date}>20 Jun 2020</Typography>
        </Box>
        <Box className={classes.avatarHeader}>
          <Avatar src={img1} className={classes.avatarImg} />
          <Box>
            <Typography className={classes.posted}>Posted by</Typography>
            <Typography className={classes.authorName}>Robert Clark</Typography>
          </Box>
        </Box>
      </Container>
      <Divider />

      <Container>
        <TextareaAutosize
          rowsMax={10}
          rowsMin={6}
          placeholder='Code To Review'
          className={classes.code}
        />
      </Container>

      <Container>
        <TextareaAutosize
          rowsMax={10}
          rowsMin={6}
          placeholder='Your Review'
          className={classes.review}
        />
      </Container>
      <Container className={classes.reviewFooter}>
        <Box className={classes.avatarHeader}>
          <Avatar src={img2} className={classes.avatarImg} />
          <Box>
            <Typography className={classes.authorName}>John Doe</Typography>
            <Typography className={classes.position}>
              Senior Developer
            </Typography>
          </Box>
        </Box>
        <Button
          type='button'
          variant='contained'
          disableElevation
          color='primary'
          className={classes.sendBtn}
        >
          Submit review
        </Button>
      </Container>
    </Paper>
  );
};

export default ReviewDetails1;
