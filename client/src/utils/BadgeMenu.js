import axios from "axios";
import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import List from "@material-ui/core/List";

import Notification from "./Notification";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "30px",
		width: "40px !important",
	},
	container: {
		display: "flex",
		marginLeft: "-80px",
	},
	paper: {
		margin: theme.spacing(1),
	},
	shape: {
		backgroundColor: theme.palette.secondary.main,
		width: 40,
		height: 40,
		textAlign: "center",
	},
	shapeCircle: {
		borderRadius: "50%",
	},
	icon: {
		color: "white",
		fontSize: "large",
		marginLeft: "-2px",
	},
	listItem: {
		width: "18rem",
		borderBottom: "1px solid #eee",
	},
	btn: {
		textTransform: "none",
		color: theme.palette.primary.main,
		fontSize: "12px",
		border: "1px solid #43DDc1",
	},
}));

const test = {
	new: [
		{ event: "Some New Notification", status: "new" },
		{ event: "Some New Notification", status: "new" },
	],
	seen: [
		{ event: "Some Seen Notification", status: "seen" },
		{ event: "Some Seen Notification", status: "seen" },
	],
};

export default function BadgeOverlap() {
	const classes = useStyles();
	const [checked, setChecked] = React.useState(false);
	const [invisible, setInvisible] = React.useState(false);
	const [notifications, setNotifications] = React.useState(test);

	// useEffect(() => {
	// async function getNotifications() {
	// 	const response = await axios.get("/api/users/notifications");
	// 	setNotifications(response.data);
	// 	if (notifications.new.length !== 0) {
	// 		setInvisible(!invisible);
	// 	}
	// }

	// getNotifications();

	// }, []);

	const handleChange = () => {
		setChecked((prev) => !prev);
	};

	return (
		<div className={classes.root}>
			<Badge
				color="secondary"
				overlap="circle"
				badgeContent=""
				variant="dot"
				invisible={invisible}>
				<div className={clsx(classes.shape, classes.shapeCircle)}>
					<IconButton onClick={handleChange}>
						<NotificationsNoneIcon className={classes.icon} />
					</IconButton>
				</div>
			</Badge>

			<div className={classes.container}>
				<Fade in={checked}>
					<Paper elevation={4} className={classes.paper}>
						<List component="nav">
							{notifications.new.map((notif) => {
								return <Notification notification={notif} key={notif.id} />;
							})}

							{notifications.seen.map((notif) => {
								return <Notification notification={notif} key={notif.id} />;
							})}
						</List>
					</Paper>
				</Fade>
			</div>
		</div>
	);
}
