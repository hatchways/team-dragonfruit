import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		width: "20rem",
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

export default function Notifications() {
	const classes = useStyles();

	return (
		<div className={classes.container}>
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
		</div>
	);
}
