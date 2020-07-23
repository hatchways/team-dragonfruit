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
		width: "20rem",
	},
	paper: {
		margin: theme.spacing(1),
		maxHeight: "40vh",
		width: "20rem",
		overflow: "scroll",

		"&::-webkit-scrollbar": {
			width: "5px",
		},
		"&::-webkit-scrollbar-thumb": {
			borderRadius: "6px",
			border: "2px solid #43DDC1",
		},
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
		marginLeft: "-1px",
	},
}));

const test = {
	new: [
		{ event: "Some New Notification", status: "new" },
		{ event: "Some New Notification", status: "new" },
		{ event: "Some New Notification", status: "new" },
		{ event: "Some New Notification", status: "new" },
	],
	seen: [
		{ event: "Some Seen Notification", status: "seen" },
		{ event: "Some Seen Notification", status: "seen" },
		{ event: "Some Seen Notification", status: "seen" },
		{ event: "Some Seen Notification", status: "seen" },
		{ event: "Some Seen Notification", status: "seen" },
	],
};

export default function BadgeOverlap() {
	const classes = useStyles();
	const [checked, setChecked] = React.useState(false);
	const [invisible, setInvisible] = React.useState(true);
	const [notifications, setNotifications] = React.useState(test);

	useEffect(() => {
		// async function getNotifications() {
		// 	const response = await axios.get("/api/users/notifications");
		// 	setNotifications(response.data);
		// 	if (notifications.new.length !== 0) {
		// 		setInvisible(false);
		// 	}
		// }

		// getNotifications();
		if (notifications.new.length !== 0) {
			setInvisible(false);
		}
	}, []);

	const handleChange = () => {
		setChecked((prev) => !prev);
		setInvisible(true);

		notifications.new.forEach(async (notif) => {
			await axios.post(`/api/users/notifications/${notif._id}`, {
				status: "seen",
			});
		});
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
