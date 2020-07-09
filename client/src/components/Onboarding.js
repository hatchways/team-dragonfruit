import axios from "axios";
import React, { useState } from "react";
import { Typography, Box, Paper, Button, Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";

// import LanguageSelector from "./LanguageSelector";

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
		fontSize: "16px",
		margin: "10px",
		marginLeft: "35px",
		padding: "0",
	},
	form: {
		margin: theme.spacing(1),
		minWidth: 120,
		display: "flex",
		justifyContent: "space-between",
	},
}));

const userExp = [];

const Onboarding = () => {
	const classes = useStyles();

	const [language, setLanguage] = React.useState("");
	const [level, setLevel] = React.useState("");

	const handleChangeLang = (e) => {
		setLanguage(e.target.value);
	};

	const handleChangeLevel = (e) => {
		setLevel(e.target.value);
	};

	const handleAdd = (e) => {
		const result = { language, level };
		userExp.push(result);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(userExp);
		await axios.post("/api/users/experience", { userExp });
	};

	return (
		<form>
			<Paper className={classes.registerContainer}>
				<Typography variant="h3" className={classes.title}>
					Add your experience here:
				</Typography>

				<Box className={classes.form}>
					<Typography className={classes.text}>Language:</Typography>
					<Select
						variant="outlined"
						value={language}
						onChange={handleChangeLang}
						style={{ width: "200px" }}>
						<MenuItem value="JavaScript">JavaScript</MenuItem>
						<MenuItem value="Java">Java</MenuItem>
						<MenuItem value="Python">Python</MenuItem>
						<MenuItem value="C++">C++</MenuItem>
						<MenuItem value="Ruby">Ruby</MenuItem>
					</Select>
					<Typography className={classes.text}>Level:</Typography>
					<Select
						variant="outlined"
						value={level}
						onChange={handleChangeLevel}
						style={{ width: "200px" }}>
						<MenuItem value={1}>Beginner</MenuItem>
						<MenuItem value={2}>Intermediate</MenuItem>
						<MenuItem value={3}>Advanced</MenuItem>
					</Select>
					<IconButton label="Add" onClick={handleAdd}>
						<AddIcon color="primary" />
						<Typography color="primary">Add</Typography>
					</IconButton>
				</Box>

				{/* <Button
					variant="outlined"
					color="primary"
					disableElevation
					onClick={handleAdd}
					className={classes.registerBtn}>
					Add another language
				</Button> */}

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
