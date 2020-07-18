import React, { useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Popover,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { AuthContext } from "../context/AuthContext";
import UserService from "../services/UserService";

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
    right: "12%",
    color: "#bababa",
    cursor: "pointer",
  },
  status: {
    padding: "0.1rem 0.3rem",
    color: theme.palette.turquoise.main,
  },
  // Styled Radio
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: theme.palette.turquoise.main,
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: theme.palette.turquoise.main,
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },

  selectContainer: {
    padding: "0.1rem",
    margin: "0",
    fontSize: "0.5rem",
  },

  // selectItem: {
  //   margin: "0.1rem",
  // },
}));

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color='default'
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

const Review = ({ review }) => {
  const classes = useStyles();

  const { setSelectedReview, user } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [pick, setPick] = React.useState(null);

  const handleChange = (event) => {
    setPick(event.target.value);
  };

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

  // console.log("Pick ", pick, review._id);

  useEffect(() => {
    if (pick === "accept") {
      UserService.acceptReview(review._id);
      window.location.reload();
    } else if (pick === "decline") {
      UserService.declineReview(review._id);
      window.location.reload();
    }
  }, [pick, review._id]);

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
        {review.author._id === user._id ? (
          <Typography variant='subtitle1' className={classes.status}>
            {review.status}
          </Typography>
        ) : (
          <form>
            <RadioGroup
              name='pick'
              value={pick}
              onChange={handleChange}
              className={classes.selectContainer}
            >
              <FormControlLabel
                checked={review.status === "in-review"}
                value='accept'
                control={<StyledRadio />}
                label='Accept'
                className={classes.selectItem}
              />
              <FormControlLabel
                value='decline'
                control={<StyledRadio />}
                label='Decline'
                className={classes.selectItem}
              />
            </RadioGroup>
          </form>
        )}
      </Popover>
    </Box>
  );
};

export default Review;
