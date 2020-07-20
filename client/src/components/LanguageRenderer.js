import React from "react";
import { TextField, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

const useStyles = makeStyles((theme) => ({
	container: {
		margin: "1rem auto",
	},
	iconBtn: {
		color: "red",
		marginRight: ".5rem",
		borderRadius: "2rem",
	},
}));

const LanguageRenderer = (props) => {
	const classes = useStyles();

	return (
		<div key={props.language} className={classes.container}>
			<IconButton
				onClick={(e) => props.removeLanguage(props.language)}
				className={classes.iconBtn}>
				<RemoveCircleOutlineIcon />
				<Typography variant="subtitle2">Remove</Typography>
			</IconButton>
			<TextField
				readOnly={true}
				variant="outlined"
				style={{ width: "30vw" }}
				value={`${props.language}:  ${props.level}`}
			/>
		</div>
	);
};

export default LanguageRenderer;
