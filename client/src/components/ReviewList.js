import React, { useEffect, useState } from "react";
import {
	Typography,
	Container,
	Accordion,
	AccordionDetails,
	AccordionSummary,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import UserService from "../services/UserService";

import Review from "./Review";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "24rem",
		background: "#ffffff",
		paddingTop: "3rem",
		height: "auto",
		minHeight: "100vh",
		margin: "0 1rem",
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
	requested: {
		maxHeight: "40vh",
		overflowY: "scroll",

		"&::-webkit-scrollbar": {
			width: "7px",
		},
		"&::-webkit-scrollbar-thumb": {
			borderRadius: "6px",
			border: "3px solid #43DDC1",
		},
	},
	received: {
		maxHeight: "40vh",
		overflowY: "scroll",
		"&::-webkit-scrollbar": {
			width: "7px",
		},
		"&::-webkit-scrollbar-thumb": {
			borderRadius: "6px",
			border: "3px solid #43DDC1",
		},
	},
}));

const ReviewList = ({ title }) => {
	const classes = useStyles();

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
			<Typography align="center" className={classes.title}>
				{title}
			</Typography>
			{/* Request */}

			<Accordion className={classes.requested}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header">
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
			<Accordion className={classes.received}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header">
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
