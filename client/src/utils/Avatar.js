import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
}));

export default function ImageAvatar(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Avatar alt={props.alt} src={props.src} />
		</div>
	);
}
