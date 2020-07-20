import axios from "axios";
import React from "react";
import { Typography, Paper, Button, Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

import LanguageSelector from "./LanguageSelector";
import LanguageRenderer from "./LanguageRenderer";


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
		color: theme.palette.primary.main,
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
	closeBtn: {
		border: "1px solid #43dd9a",
		borderRadius: "2rem",
	},
}));

const Onboarding = () => {
	const classes = useStyles();
	const history = useHistory();
	const [open, setOpen] = React.useState(true);
	const [userExp, setUserExp] = React.useState([]);

	const handleClose = () => {
		setOpen(false);
		history.push("/");
	};

	// Get experience object from LanguageSelector
	const getExp = (exp) => {
		setUserExp(userExp.concat(exp));
	};

	// Get the language to be removed from LanguageRenderer
	const removeLanguage = (language) => {
		let newUserExp = userExp.filter((el) => Object.keys(el)[0] !== language);
		setUserExp(newUserExp);
	};

	// API call to send userExp that is an array of objects
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(userExp);
		await axios.post("/api/users/experience", userExp);
		setOpen(false);
		history.push("/");
	};

	// A function for rendering selected languages
	const renderLanguages = (userExp) => {
		let value;
		const exps = userExp.map((el) => {
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
						<LanguageRenderer
							removeLanguage={removeLanguage}
							language={Object.keys(el)[0]}
							level={value}
						/>
					</div>
				);
			} else {
				return <div></div>;
			}
		});
		return <div>{exps}</div>;
	};

	return (
		<Dialog open={open} fullWidth maxWidth="md">
			<form>
				
				<Paper className={classes.registerContainer}>
					<Typography variant="h5" className={classes.title}>
						Add your experience
					</Typography>

					<LanguageSelector sendExp={getExp} />

					{renderLanguages(userExp)}

					<Button
						type="submit"
						variant="contained"
						color="primary"
						disableElevation
						onClick={handleSubmit}
						className={classes.registerBtn}>
						Submit
					</Button>
					<Button
						onClick={handleClose}
						color="primary"
						className={classes.closeBtn}>
						Close
					</Button>
				</Paper>
			</form>
		</Dialog>
	);
};

export default Onboarding;
