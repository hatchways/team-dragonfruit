import React, { useState } from "react";

import {
	Typography,
	TextField,
	Box,
	Paper,
	Button,
	Select,
} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
	registerContainer: {
		display: "flex",
		flexDirection: "column",
		width: "800px",
		maxWidth: "1000px",
		margin: "2rem auto",
		padding: "3rem 0",
		alignItems: "center",
		background: "secondary",
	},
	title: {
		marginBottom: "3rem",
	},
	input: {
		width: "300px",
		marginBottom: "1rem",
	},
	registerBtn: {
		padding: "0.7rem 4rem",
		borderRadius: "2rem",
		background: "turquoise",
		textTransform: "capitalize",
		fontSize: "1rem",
		margin: "3rem 0",
		"&:hover": {
			backgroundColor: "#43dd9a",
			color: "#6E3ADB",
		},
	},
	text: {
		fontWeight: "bold",
	},

	formControl: {
		margin: theme.spacing(4),
		minWidth: 120,
		display: "flex",
		justifyContent: "space-between",
	},
	selectEmpty: {
		marginTop: theme.spacing(4),
	},
	selectField: {
		width: "200px",
		margin: "30px",
	},
}));

const Onboarding = () => {
	const classes = useStyles();

	const [userExp, setUserExp] = useState({});

	const handleChange = (e) => {
		const result = { ...userExp, [e.target.name]: e.target.value };
		setUserExp(userExp.push(result));
		console.log(result);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	// const [language, setLanguage] = React.useState("");
	// const [level, setLevel] = React.useState("");

	return (
		<form>
			<Paper className={classes.registerContainer}>
				<Typography variant="h3" className={classes.title}>
					Add your experience here:
				</Typography>

				<Box className={classes.formControl}>
					<Typography>Language:</Typography>

					<Select
						variant="outlined"
						name="language"
						onChange={handleChange}
						label="Language"
						style={{ width: "200px" }}>
						<MenuItem value={userExp.javascript} name="javascript">
							JavaScript
						</MenuItem>
						<MenuItem value={userExp.java} name="java">
							Java
						</MenuItem>
						<MenuItem value={userExp.python} name="python">
							Python
						</MenuItem>
					</Select>

					<Typography>Level:</Typography>
					<Select
						variant="outlined"
						onChange={handleChange}
						label="Level"
						style={{ width: "200px" }}>
						<MenuItem value={1}>Beginner</MenuItem>
						<MenuItem value={2}>Intermediate</MenuItem>
						<MenuItem value={3}>Advanced</MenuItem>
					</Select>
				</Box>

				<Box className={classes.formControl}>
					<Typography>Language:</Typography>

					<Select
						variant="outlined"
						name="language"
						onChange={handleChange}
						label="Language"
						style={{ width: "200px" }}>
						<MenuItem value={userExp.javascript} name="javascript">
							JavaScript
						</MenuItem>
						<MenuItem value={userExp.java} name="java">
							Java
						</MenuItem>
						<MenuItem value={userExp.python} name="python">
							Python
						</MenuItem>
					</Select>

					<Typography>Level:</Typography>
					<Select
						variant="outlined"
						onChange={handleChange}
						label="Level"
						style={{ width: "200px" }}>
						<MenuItem value={1}>Beginner</MenuItem>
						<MenuItem value={2}>Intermediate</MenuItem>
						<MenuItem value={3}>Advanced</MenuItem>
					</Select>
				</Box>

				<Box className={classes.formControl}>
					<Typography>Language:</Typography>

					<Select
						variant="outlined"
						name="language"
						onChange={handleChange}
						label="Language"
						style={{ width: "200px" }}>
						<MenuItem value={userExp.javascript} name="javascript">
							JavaScript
						</MenuItem>
						<MenuItem value={userExp.java} name="java">
							Java
						</MenuItem>
						<MenuItem value={userExp.python} name="python">
							Python
						</MenuItem>
					</Select>

					<Typography>Level:</Typography>
					<Select
						id="demo-simple-select-outlined"
						onChange={handleChange}
						label="Level"
						style={{ width: "200px" }}>
						<MenuItem value={1}>Beginner</MenuItem>
						<MenuItem value={2}>Intermediate</MenuItem>
						<MenuItem value={3}>Advanced</MenuItem>
					</Select>
				</Box>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					disableElevation
					onClick={handleSubmit}
					className={classes.registerBtn}>
					Submit
				</Button>
			</Paper>
		</form>
	);
};

export default Onboarding;
