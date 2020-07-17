import React from "react";
import {
	Typography,
	Box,
	Select,
	TextField,
	Button,
	Input,
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/styles";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";

import { IconButton } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
	input: {
		color: "red",
		"&:hover": {
			cursor: "pointer !important",
		},
	},
}));

let value;
const LanguageRenderer = (props) => {
	const classes = useStyles();

	const exps = props.experience.map((el) => {
		if (el !== {}) {
			if (Object.values(el)[0] == 1) {
				value = "Beginner";
			} else if (Object.values(el)[0] == 2) {
				value = "Intermediate";
			} else {
				value = "Advanced";
			}
			return (
				<div key={Object.keys(el)[0]}>
					<TextField
						disabled={true}
						className={classes.input}
						variant="outlined"
						value={`${Object.keys(el)[0]}: ${value}`}
						onClick={(e) => props.remove(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start" className={classes.input}>
									<RemoveCircleOutlineIcon style={{ color: "red" }} /> Remove
								</InputAdornment>
							),
						}}
					/>

					{/* <TextField
						disabled={true}
						value={Object.values(el)[0]}
						variant="outlined"
					/> */}
				</div>
			);
		} else {
			return <div></div>;
		}
	});
	return <div>{exps}</div>;
};

export default LanguageRenderer;
