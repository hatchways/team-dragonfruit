import React, { useContext } from "react";
import {
  Paper,
  Container,
  Box,
  Divider,
  Typography,
  Avatar,
  TextareaAutosize,
  Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import img1 from "../images/avatar1.png";
import img2 from "../images/avatar2.png";

import { AuthContext } from "../context/AuthContext";

import CodeReader from "../utils/CodeReader";
import UserService from "../services/UserService";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    maxWidth: "95%",
    margin: "2rem auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "1.5rem auto",
    paddingTop: "1.5rem",
  },
  date: {
    color: "#bababa",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  avatarHeader: {
    display: "flex",
    alignItems: "center",
  },
  avatarImg: {
    margin: "0.5rem",
  },
  position: {
    color: "#bababa",
    fontSize: "0.8rem",
    fontWeight: "500",
  },
  authorName: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    marginTop: "0",
  },
  ratingBtn: {
    padding: "0.3rem 0.8rem",
    borderRadius: "2rem",
    background: "turquoise",
    textTransform: "capitalize",
    fontSize: "0.8rem",
    boxShadow: "transparent",
    outline: "transparent",
    border: "transparent",

    "&:hover": {
      backgroundColor: "#43dd9a",
      color: "#6E3ADB",
    },
  },
  ratingForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "23rem",
  },
  ratingTitle: {
    fontWeight: "bold",
    fontSize: "0.8rem",
  },
  code: {
    margin: "1.5rem auto",
    width: "95%",
    padding: "1rem",
    border: "none",
    outline: "none",
    background: "#dee2e6",
  },
  reviewContent: {
    margin: "1rem 0 1rem 3.5rem",
  },
  review: {
    margin: "0 auto",
    width: "95%",
    padding: "1rem",
    outline: "none",
    border: "1px solid #dee2e6",
  },
  reviewFooter: {
    margin: "1rem 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "1.5rem",
  },
  sendBtn: {
    padding: "0.3rem 0.8rem",
    borderRadius: "2rem",
    background: "turquoise",
    textTransform: "capitalize",
    fontSize: "0.8rem",
    boxShadow: "transparent",
    outline: "transparent",
    border: "transparent",

    "&:hover": {
      backgroundColor: "#43dd9a",
      color: "#6E3ADB",
    },
  },
  posted: {
    color: "#bababa",
    fontSize: "0.8rem",
    fontWeight: "500",
  },
}));

const ReviewDetails = () => {
  const classes = useStyles();

  const [rating, setRating] = React.useState(0);

  const { selectedReview, user, setUser } = useContext(AuthContext);

  const handleRating = (e) => {
    e.preventDefault();
    // console.log(selectedReview._id);
    // console.log(typeof rating);
    UserService.rating(selectedReview._id, rating);
    setRating(0);
  };

  if (!selectedReview)
    return (
      <Typography
        variant='h2'
        color='primary'
        align='center'
        style={{ marginTop: "2rem" }}
      >
        Please select your review
      </Typography>
    );

  console.log(selectedReview);

  // for requested
  if (selectedReview.author._id === user._id) {
    return (
      <Paper className={classes.root}>
        <Container className={classes.header}>
          <Box>
            <Typography variant='h6'>{selectedReview.title}</Typography>
            <Typography className={classes.date}>
              {`${moment(selectedReview.date_requested).format("MMM Do YYYY")}`}
            </Typography>
          </Box>
          <Box>
            <form className={classes.ratingForm} onSubmit={handleRating}>
              <Box className={classes.ratingTitle}>
                Tap a star to rate review
              </Box>
              <Rating
                name='rating'
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
              <Button
                type='submit'
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
          <CodeReader code={selectedReview.code} className={classes.code} />
        </Container>

        {selectedReview.comments && (
          <Container>
            <Box className={classes.avatarHeader}>
              <Avatar src={img2} className={classes.avatarImg} />
              <Box>
                <Typography className={classes.authorName}>
                  {selectedReview.reviewer.name}
                </Typography>
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
        )}
      </Paper>
    );
  }
  // for received
  else if (selectedReview.reviewer._id === user._id) {
    return (
      <Paper className={classes.root}>
        <Container className={classes.header}>
          <Box>
            <Typography variant='h6'>{selectedReview.title}</Typography>
            <Typography className={classes.date}>
              {`${moment(selectedReview.date_requested).format("MMM Do YYYY")}`}
            </Typography>
          </Box>
          <Box className={classes.avatarHeader}>
            <Avatar src={img1} className={classes.avatarImg} />
            <Box>
              <Typography className={classes.posted}>Posted by</Typography>
              <Typography className={classes.authorName}>
                {selectedReview.author.name}
              </Typography>
            </Box>
          </Box>
        </Container>
        <Divider />

        <Container>
          <CodeReader code={selectedReview.code} className={classes.code} />
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
              <Typography className={classes.authorName}>
                {selectedReview.reviewer.name}
              </Typography>
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
  }
};

export default ReviewDetails;
