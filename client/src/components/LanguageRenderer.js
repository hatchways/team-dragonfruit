import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
	inputIcon: {
		color: "red",
	},
}));

let value;
const LanguageRenderer = (props) => {
	const classes = useStyles();

	const exps = props.experience.map((el) => {
		if (el !== {}) {
			if (Object.values(el)[0] === 1) {
				value = "Beginner";
			} else if (Object.values(el)[0] === 2) {
				value = "Intermediate";
			} else {
				value = "Advanced";
			}
			return (
				<div key={Object.keys(el)[0]}>
					<TextField
						disabled={true}
						variant="outlined"
						value={`${Object.keys(el)[0]}: ${value}`}
						onClick={(e) => props.remove(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start" className={classes.inputIcon}>
									<RemoveCircleOutlineIcon style={{ color: "red" }} /> Remove
								</InputAdornment>
							),
						}}
					/>
				</div>
			);
		} else {
			return <div></div>;
		}
	});
	return <div>{exps}</div>;
};

export default LanguageRenderer;
