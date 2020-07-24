import axios from "axios";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";

import ListItemText from "@material-ui/core/ListItemText";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
	},
	listItem: {
		width: "18rem",
		borderBottom: "1px solid #ccc",
		color: "black",
		"&:hover": {
			color: theme.palette.primary.main,
			background: "#efefef",
		},
	},
	btn: {
		textTransform: "none",
		color: theme.palette.secondary.main,
		fontSize: "12px",
		border: "1px solid #43DDC1",
		borderRadius: "20px",
	},
	link: {
		textDecoration: "none",
		width: "100%",
		margin: "0 1rem",
		"&:visited": {
			color: theme.palette.primary.main,
		},
	},
}));

const BadgeNotif = (props) => {
	const [status, setStatus] = React.useState(props.notification.status);
	const classes = useStyles();

	const handleDismiss = async () => {
		setStatus("dismissed");
		await axios.post(`/api/users/notifications/${props.notification._id}`, {
			status: "dismissed",
		});
	};

	return (
		<ListItem className={classes.listItem} key={props.notification._id}>
			{/* <Link
				to={{
					pathname: "/reviewes",
					state: props.snippet,
				}}
				className={classes.link}> */}
			<Link to="/reviews" className={classes.link}>
				<ListItemText primary={`${props.notification.event}`} />
			</Link>
			{status === "new" || status === "seen" ? (
				<Button
					variant="outlined"
					className={classes.btn}
					onClick={(e) => handleDismiss()}>
					Dismiss
				</Button>
			) : null}
		</ListItem>
	);
};

export default BadgeNotif;
