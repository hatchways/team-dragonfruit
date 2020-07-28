import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import StripeInput from "../components/StripeInput";
import Notification from "../utils/Notification";

const useStyles = makeStyles((theme) => ({
	checkoutContainer: {
		display: "flex",
		backgroundColor: "#dee2e6",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "95vh",
	},
}));

const Checkout = () => {
	const classes = useStyles();
	return (
		<div className={classes.checkoutContainer}>
			<Navbar />
				<StripeInput />
				<Notification/>
			</div>

	);
};

export default Checkout;
