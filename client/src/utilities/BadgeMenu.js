import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
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
		//??** How can I center the bell icon properly??**//
	},
}));

export default function BadgeOverlap() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Badge color="secondary" overlap="circle" badgeContent="" variant="dot">
				<div className={clsx(classes.shape, classes.shapeCircle)}>
					<IconButton>
						<NotificationsNoneIcon className={classes.icon} />
					</IconButton>
				</div>
			</Badge>
		</div>
	);
}
