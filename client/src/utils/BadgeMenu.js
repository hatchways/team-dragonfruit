import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "30px",
		width: "40px !important",
	},
	container: {
		display: "flex",
		marginLeft: "-60px",
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

function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

export default function BadgeOverlap() {
	const classes = useStyles();
	const [checked, setChecked] = React.useState(false);
	const [invisible, setInvisible] = React.useState(false);

	const handleBadgeVisibility = () => {
		// if there is no new notifications set invisible to be true
		setInvisible(!invisible);
	};

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
						<List component="nav" aria-label="secondary mailbox folders">
							<ListItem button className={classes.listItem}>
								<ListItemText primary="You have a new request" />
								<Button variant="outlined" className={classes.btn}>
									Dismiss
								</Button>
							</ListItem>
							<ListItemLink href="/" className={classes.listItem}>
								<ListItemText primary="Your code is reviewed" />
								<Button variant="outlined" className={classes.btn}>
									Dismiss
								</Button>
							</ListItemLink>
						</List>
					</Paper>
				</Fade>
			</div>
		</div>
	);
}
