import axios from "axios";
import React, { useState } from "react";
import { Typography, Paper, Button, Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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

let userExp = [];
let Langs = [];
let Levels = [];

const Onboarding = () => {
	const classes = useStyles();
	const history = useHistory();

	const [open, setOpen] = React.useState(true);
	const [selectLanguages, setSelectLanguages] = React.useState([]);
	const [exp, setExp] = React.useState({});

	const handleClose = () => {
		setOpen(false);
		history.push("/");
	};

	const removeLanguage = (name) => {
		let selectedLangs = [...selectLanguages];
		console.log(selectLanguages);
		console.log(selectedLangs);
		console.log(name);
		Langs = Langs.filter((lang) => lang !== name);
		console.log("Langs: ", Langs);
	};

	const getState = (lang, lev) => {
		setExp({ language: lang, level: lev });
		console.log(exp);
		userExp.push(exp);
	};

	const addLanguage = () => {
		const id = Math.random();
		const selectedLangs = [...selectLanguages];
		selectedLangs.push({
			item: (
				<LanguageSelector
					getLang={getLang}
					getLevel={getLevel}
					key={id}
					remove={removeLanguage}
					sendState={getState}
				/>
			),
		});
		setSelectLanguages(selectedLangs);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Langs.forEach((lang, i) => {
		// 	const newObj = { language: lang, level: Levels[i] };
		// 	userExp.push(newObj);
		// });
		console.log(userExp);
		await axios.post("/api/users/experience", { userExp });
		history.push("/");
	};

	const getLang = (lang) => {
		// Langs.push(lang);
		setExp({ language: lang });
	};

	const getLevel = (level) => {
		Levels.push(level);
	};

	return (
		<Dialog open={open} fullWidth maxWidth="md">
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
					<Button onClick={handleClose} color="primary">
						Close
					</Button>
				</Paper>
			</form>
		</Dialog>
	);
};

export default Onboarding;
