import axios from "axios";
import React from "react";
import {
	Typography,
	Paper,
	Button,
	Dialog,
	TextField,
} from "@material-ui/core";
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

const NewOnboard = () => {
	const classes = useStyles();
	const history = useHistory();
	const [open, setOpen] = React.useState(true);
	const [userExp, setUserExp] = React.useState([]);

	const handleClose = () => {
		setOpen(false);
		history.push("/");
	};

	const getExp = (language, level) => {
		if (language !== "" && level !== "") {
			let newExp = { [language]: level };
			setUserExp(userExp.concat(newExp));
		}
	};

	const removeLanguage = (text) => {
		if (text) {
			let language = text.split(":")[0];
			console.log("language from onboarding: ", language);
			let newUserExp = userExp.filter((el) => Object.keys(el)[0] !== language);
			setUserExp(newUserExp);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(userExp);
		await axios.post("/api/users/experience", userExp);
		setOpen(false);
		history.push("/");
	};

	return (
		<Dialog open={open} fullWidth maxWidth="md">
			<form>
				<Paper className={classes.registerContainer}>
					<Typography variant="h5" className={classes.title}>
						Add your experience
					</Typography>

					<LanguageSelector sendExp={getExp} />

					<LanguageRenderer experience={userExp} remove={removeLanguage} />

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

export default NewOnboard;
