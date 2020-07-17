import React, { useContext } from "react";
import { Box, Typography, Popover } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { AuthContext } from "../context/AuthContext";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "1.3rem 1rem",
    width: "13rem",
    border: `2px solid #d3d3d3`,
    margin: "0.5rem auto",
    borderRadius: "0.7rem",
    position: "relative",
    cursor: "pointer",

    "&:hover": {
      border: `2px solid ${theme.palette.turquoise.main}`,
    },
  },

  date: {
    color: "#bababa",
    fontSize: "0.8rem",
    fontWeight: "500",
  },
  more: {
    position: "absolute",
    top: "7%",
    right: "7%",
    color: "#bababa",
    cursor: "pointer",
  },
  status: {
    padding: "0.3rem 0.5rem",
    color: theme.palette.turquoise.main,
  },
}));

const Review = ({ review }) => {
  const classes = useStyles();

  const { setSelectedReview } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleSelected = () => {
    setSelectedReview(review);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box className={classes.card} onClick={handleSelected}>
      <Typography variant='h6' className={classes.title}>
        {review.title}
      </Typography>
      <Typography className={classes.date}>{`${moment(
        review.date_requested
      ).format("MMM Do YYYY")}`}</Typography>
      <Box className={classes.more} onClick={handleClick} aria-describedby={id}>
        <MoreHorizIcon />
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography variant='subtitle1' className={classes.status}>
          {review.status}
        </Typography>
      </Popover>
    </Box>
  );
};

export default Review;
