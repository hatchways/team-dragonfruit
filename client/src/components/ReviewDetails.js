import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {
	Paper,
	Container,
	Box,
	Divider,
	Typography,
	Avatar,
	Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import img1 from "../images/avatar1.png";
import img2 from "../images/avatar2.png";
import DocumentGIF from "../images/getDocuments.gif";

import { AuthContext } from "../context/AuthContext";

import CodeReader from "../utils/CodeReader";
import UserService from "../services/UserService";

import PrismDraft from "../utils/PrismDraft";
import Message from "./Message";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "90%",
		maxWidth: "95%",
		margin: "2rem auto",
		paddingBottom: "1rem",
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
	codeContainer: {
		margin: "1.5rem auto",
	},
	title: {
		color: theme.palette.primary.main,
		textTransform: "uppercase",
	},
	commentComplete: {
		margin: "1.5rem auto",
		color: theme.palette.primary.main,
		textAlign: "center",
	},
	link: {
		textDecoration: "none",
		color: "turquoise",
		fontSize: "12px",
	},
	rightContainer: {
		width: "90%",
		height: "80vh",
		paddingTop: "10rem",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		margin: "2rem 2rem",
	},
}));

const ReviewDetails = () => {
	const classes = useStyles();

	const { selectedReview, user } = useContext(AuthContext);

	const history = useHistory();

	const [rating, setRating] = useState(0);
	const [code, setCode] = useState("");
	const [message, setMessage] = useState("");

	// handle rating
	const handleRating = (e) => {
		e.preventDefault();
		UserService.rating(selectedReview._id, rating);
		setRating(rating);
		setMessage(`You gave ${rating} star rating for this review. Thank you`);
		setTimeout(() => {
			setMessage("");
		}, 6000);
	};

	// Send Comments
	const handleCode = (comments) => {
		setCode(comments);
	};
	const handleSendCode = () => {
		UserService.sendComments(selectedReview._id, code);
		setMessage(`You submitted your review`);
		history.go();
		setTimeout(() => {
			setMessage("");
		}, 6000);
	};

	if (!selectedReview)
		return (
			<Paper className={classes.rightContainer}>
				<Typography variant="h4" color="primary" align="center">
					Please select an item to view the details
				</Typography>

				<img src={DocumentGIF} alt="Document GIF" />

				<a
					className={classes.link}
					href="https://stories.freepik.com/business?utm_source=Stories&utm_medium=referral&utm_campaign=web-attribution&utm_term=copy%20and%20attribute&utm_content=donwload-pop-up"
					target="blank">
					Illustration by Stories by Freepik
				</a>
			</Paper>
		);

	// for requested
	if (selectedReview.author._id === user._id) {
		return (
			<Paper className={classes.root}>
				<Container className={classes.header}>
					<Box>
						<Typography variant="h6" className={classes.title}>
							{selectedReview.title}
						</Typography>
						<Typography className={classes.date}>
							{`${moment(selectedReview.date_requested).format("MMM Do YYYY")}`}
						</Typography>
					</Box>
					{selectedReview.comments && (
						<Box>
							<form className={classes.ratingForm} onSubmit={handleRating}>
								<Box className={classes.ratingTitle}>
									Tap a star to rate review
								</Box>
								<Rating
									name="rating"
									value={rating || selectedReview.rating}
									onChange={(event, newValue) => {
										setRating(newValue);
									}}
								/>
								<Button
									type="submit"
									variant="contained"
									disableElevation
									color="primary"
									className={classes.ratingBtn}>
									Submit
								</Button>
							</form>
						</Box>
					)}
				</Container>
				<Divider />

				<Container className={classes.codeContainer}>
					{/* <CodeReader code={selectedReview.code} className={classes.code} /> */}
				</Container>

				<Container>
					{selectedReview.reviewer && (
						<Box className={classes.avatarHeader}>
							{/* Avatar */}
							<Avatar src={img1} className={classes.avatarImg} />
							<Box>
								<Typography className={classes.authorName}>
									{selectedReview.reviewer.name}
								</Typography>
								<Typography className={classes.position}>
									review your request
								</Typography>
							</Box>
						</Box>
					)}
					{selectedReview.comments && (
						<Container className={classes.codeContainer}>
							{/* <CodeReader
								code={selectedReview.comments}
								className={classes.code}
							/> */}
						</Container>
					)}
				</Container>
				{message && <Message open={true} type="success" message={message} />}
			</Paper>
		);
	}
	// for received
	else if (selectedReview.reviewer._id === user._id) {
		return (
			<Paper className={classes.root}>
				<Container className={classes.header}>
					<Box>
						<Typography variant="h6" className={classes.title}>
							{selectedReview.title}
						</Typography>
						<Typography className={classes.date}>
							{`${moment(selectedReview.date_requested).format("MMM Do YYYY")}`}
						</Typography>
					</Box>
					<Box className={classes.avatarHeader}>
						{/* Avatar */}
						<Avatar src={img2} className={classes.avatarImg} />
						<Box>
							<Typography className={classes.posted}>Posted by</Typography>
							<Typography className={classes.authorName}>
								{selectedReview.author.name}
							</Typography>
						</Box>
					</Box>
				</Container>

				<Divider />

				<Container className={classes.codeContainer}>
					<CodeReader code={selectedReview.code} className={classes.code} />
				</Container>

				<Divider />
				{selectedReview.comments ? (
					<Box component="div">
						<Typography variant="h4" className={classes.commentComplete}>
							Your review is sent
						</Typography>
						<Container className={classes.codeContainer}>
							<CodeReader
								code={selectedReview.comments}
								className={classes.code}
							/>
						</Container>
					</Box>
				) : selectedReview.status === "in-review" ? (
					<Box component="div">
						<Container className={classes.codeContainer}>
							<PrismDraft sendCode={handleCode} />
						</Container>

						<Container className={classes.reviewFooter}>
							<Box className={classes.avatarHeader}>
								{/* Avatar */}
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
								type="button"
								variant="contained"
								disableElevation
								color="primary"
								className={classes.sendBtn}
								onClick={handleSendCode}>
								Submit review
							</Button>
						</Container>
					</Box>
				) : null}
				{message && <Message open={true} type="success" message={message} />}
			</Paper>
		);
	}
};

export default ReviewDetails;
