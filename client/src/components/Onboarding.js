import axios from "axios";
import React, { useState } from "react";
import { Typography, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { IconButton } from "@material-ui/core";

import LanguageSelector from "./LanguageSelector";

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
	iconBtn: {
		border: "1px solid grey",
		borderRadius: "5px",
		background: "turquoise",
		margin: "20px",
	},
}));

const userExp = [];
const Langs = [];
const Levels = [];

const Onboarding = () => {
	const classes = useStyles();
	const [selectLanguages, setSelectLanguages] = React.useState([]);

	const removeLanguage = () => {
		let selectedLangs = [...selectLanguages];
		selectedLangs.pop();
		setSelectLanguages(selectedLangs);
	};

	const addLanguage = () => {
		const id = Math.random();
		const selectedLangs = [...selectLanguages];
		selectedLangs.push({
			item: <LanguageSelector getLang={getLang} getLevel={getLevel} key={id} />,
		});
		setSelectLanguages(selectedLangs);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		Langs.forEach((lang, i) => {
			const newObj = { language: lang, level: Levels[i] };
			userExp.push(newObj);
		});
		console.log(userExp);
		await axios.post("/api/users/experience", { userExp });
	};

	const getLang = (lang) => {
		Langs.push(lang);
	};

	const getLevel = (level) => {
		Levels.push(level);
	};

	return (
		<form>
			<Paper className={classes.registerContainer}>
				<Typography variant="h3" className={classes.title}>
					Add your experience here:
				</Typography>

				{selectLanguages.map((language) => language.item)}

				<div style={{ display: "flex" }}>
					<IconButton
						className={classes.iconBtn}
						label="Add"
						onClick={addLanguage}>
						<AddCircleOutlineIcon color="primary" />
						<Typography color="primary">Add one language</Typography>
					</IconButton>
					<IconButton
						className={classes.iconBtn}
						label="Add"
						onClick={removeLanguage}>
						<RemoveCircleOutlineIcon color="primary" />
						<Typography color="primary">Remove one language</Typography>
					</IconButton>
				</div>

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
