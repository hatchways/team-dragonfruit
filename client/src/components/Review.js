import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '1.3rem 1rem',
    width: '13rem',
    border: `2px solid #d3d3d3`,
    margin: '0.5rem auto',
    borderRadius: '0.7rem',
    position: 'relative',
    cursor: 'pointer',

    '&:hover': {
      border: `2px solid ${theme.palette.turquoise.main}`,
    },
  },

  date: {
    color: '#bababa',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  more: {
    position: 'absolute',
    top: '7%',
    right: '7%',
    color: '#bababa',
    cursor: 'pointer',
  },
}));

const Review = ({ review }) => {
  const classes = useStyles();

  return (
    <Box className={classes.card}>
      <Typography variant='h6' className={classes.title}>
        {review.title}
      </Typography>
      <Typography className={classes.date}>{review.date}</Typography>
      <Box className={classes.more}>
        <MoreHorizIcon />
      </Box>
    </Box>
  );
};

export default Review;
