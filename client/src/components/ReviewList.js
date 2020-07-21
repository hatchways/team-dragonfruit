import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { AuthContext } from "../context/AuthContext";
import UserService from "../services/UserService";

import Review from "./Review";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#ffffff",
    paddingTop: "3rem",
    height: "auto",
    minHeight: "85vh",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  total: {
    color: theme.palette.primary.main,
  },
  heading: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const ReviewList = ({ title }) => {
  const classes = useStyles();

  // const {
  //   requestedReviews,
  //   setRequestedReviews,
  //   receivedReviews,
  //   setReceivedReviews,
  // } = useContext(AuthContext);

  const [requestedReviews, setRequestedReviews] = useState([]);
  const [receivedReviews, setReceivedReviews] = useState([]);

  // total of each kind of reviews
  const requestedReviewNum =
    requestedReviews !== null ? requestedReviews.length : 0;
  const receivedReviewNum =
    receivedReviews !== null ? receivedReviews.length : 0;

  useEffect(() => {
    UserService.requestedReviews().then((data) => setRequestedReviews(data));
    UserService.receivedReviews().then((data) => setReceivedReviews(data));
  }, []);

  if (!requestedReviews || !receivedReviews) return <Loading />;

  return (
    <Container className={classes.root}>
      <Typography align='center' className={classes.title}>
        {title}
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
              <Review review={review} key={review._id} />
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
              <Review review={review} key={review._id} />
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default ReviewList;
