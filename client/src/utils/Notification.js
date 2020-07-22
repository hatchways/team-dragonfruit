import axios from "axios";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Button, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
	},
	listItem: {
		width: "18rem",
		borderBottom: "1px solid #eee",
		color: "black",
	},
	btn: {
		textTransform: "none",
		color: theme.palette.primary.main,
		fontSize: "12px",
		border: "1px solid #43DDc1",
	},
}));

const Notification = (props) => {
	const [status, setStatus] = React.useState(props.notification.status);
	const classes = useStyles();

	const handleDismiss = async () => {
		setStatus("dismissed");
		await axios.post(
			`/api/users/notifications/${props.notification._id}`,
			"dismissed",
		);
	};

	return (
		<ListItem button className={classes.listItem} key={props.notification._id}>
			<ListItemText primary={`${props.notification.event}`} />
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

export default Notification;
