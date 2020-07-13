import React, { useState } from 'react';
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

// import img1 from '../images/avatar1.png';
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
    fontSize: '0.8rem',
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
  reviewContent: {
    margin: '1rem 0 1rem 3.5rem',
  },
}));

const ReviewDetails = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(2);

  console.log(value);

  return (
    <Paper className={classes.root}>
      <Container className={classes.header}>
        <Box>
          <Typography variant='h6'>Animation</Typography>
          <Typography className={classes.date}>20 Jun 2020</Typography>
        </Box>
        <Box>
          <form className={classes.ratingForm}>
            <Box className={classes.ratingTitle}>Tap a star to rate review</Box>
            <Rating
              name='rating'
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <Button
              type='button'
              variant='contained'
              disableElevation
              color='primary'
              className={classes.ratingBtn}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Container>
      <Divider />

      <Container>
        <TextareaAutosize
          rowsMax={10}
          rowsMin={6}
          placeholder='Your review'
          className={classes.code}
        />
      </Container>
      <Container>
        <Box className={classes.avatarHeader}>
          <Avatar src={img2} className={classes.avatarImg} />
          <Box>
            <Typography className={classes.authorName}>Robert Clark</Typography>
            <Typography className={classes.position}>
              Senior Developer
            </Typography>
          </Box>
        </Box>
        <Box className={classes.reviewContent}>
          <Typography>
            It would be great if you add the component like:
          </Typography>
          <TextareaAutosize
            rowsMax={10}
            rowsMin={6}
            placeholder='Your review'
            className={classes.code}
          />
        </Box>
      </Container>
    </Paper>
  );
};

export default ReviewDetails;
