import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {
	Box,
	Typography,
	RadioGroup,
	FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "../context/AuthContext";
import UserService from "../services/UserService";
import moment from "moment";
import StyledRadio from "../utils/StyledRadio";

const useStyles = makeStyles((theme) => ({
	card: {
		padding: "1.3rem 1rem",
		width: "15rem",
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
		textTransform: "capitalize",
	},
	selectContainer: {
		margin: "0",
		fontSize: "0.5rem",
	},
}));

const Review = ({ review }) => {
	const classes = useStyles();

	const { setSelectedReview, user } = useContext(AuthContext);

	const [anchorEl, setAnchorEl] = React.useState(null);

	const history = useHistory();

	// handle Radio Button
	const handleChange = (event) => {
		const { value } = event.target;
		if (value === "accept") {
			UserService.acceptReview(review._id);
			history.go();
		} else if (value === "decline") {
			UserService.declineReview(review._id);
			history.go();
		}
	};


	const handleSelected = () => {
		setSelectedReview(review);
	};

	// handle Dialog
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
			<Typography variant="h6" className={classes.title}>
				{review.title}
			</Typography>
			<Typography className={classes.date}>{`${moment(
				review.date_requested,
			).format("MMM Do YYYY")}`}</Typography>
			<Box className={classes.more} onClick={handleClick} aria-describedby={id}>
				{review.author._id === user._id ? (
					<Typography variant="subtitle1" className={classes.status}>
						{review.status}
					</Typography>
				) : review.comments ? (
					<Typography className={classes.status}>Done</Typography>
				) : (
					<form>
						<RadioGroup
							name="pick"
							onChange={handleChange}
							className={classes.selectContainer}>
							<FormControlLabel
								checked={review.status === "in-review"}
								value="accept"
								control={<StyledRadio />}
								label="Accept"
								className={classes.selectItem}
							/>
							<FormControlLabel
								value="decline"
								control={<StyledRadio />}
								label="Decline"
								className={classes.selectItem}
							/>
						</RadioGroup>
					</form>
				)}
			</Box>
		</Box>
	);
};

export default Review;
