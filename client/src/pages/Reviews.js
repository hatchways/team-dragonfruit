import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "./Navbar";
import ReviewList from "../components/ReviewList";
import ReviewDetails from "../components/ReviewDetails";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
}));

const Reviews = () => {
	const classes = useStyles();

	return (
		<div>
			<Navbar />
			<div className={classes.root}>
				<Grid container spacing={1}>
					<Grid item xs={12} md={4}>
						<ReviewList title="Reviews" />
					</Grid>
					<Grid item xs={12} md={8}>
						<ReviewDetails />
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default Reviews;
