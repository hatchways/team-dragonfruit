import axios from "axios";
import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import {
	Button,
	TextField,
	Dialog,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from "@material-ui/core";

import Editor from "./Editor";

// Styling the Dialog From //
const useStyles = makeStyles((theme) => ({
	container: {
		margin: theme.spacing(2),
		minWidth: 120,
		display: "flex",
		justifyContent: "space-between",
		height: "700px",
	},
	uploadBtn: {
		color: theme.palette.turquoise.main,
		borderRadius: "20px",
		borderColor: theme.palette.turquoise.main,
		textTransform: "none",
		borderWidth: "2px",
		margin: theme.spacing(2),
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
	},
	submitBtn: {
		margin: "20px auto",
		padding: "0.7rem 4rem",
		borderRadius: "2rem",
		background: "turquoise",
		fontSize: "1rem",
		textTransform: "none",
		boxShadow: "transparent",
		outline: "transparent",
		color: "white",
		border: "transparent",
		"&:hover": {
			backgroundColor: "#43dd9a",
			color: "#6E3ADB",
		},
	},
}));

export default function UploadDialog() {
	const [open, setOpen] = React.useState(false);
	const [language, setLanguage] = React.useState("");
	const [title, setTitle] = React.useState("");
	const [code, setCode] = React.useState("");
	const classes = useStyles();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async () => {
		setOpen(false);
		const snippet = { language, title, code };
		console.log(snippet);
		await axios.post("/api/users/upload", snippet);
	};

	const handleChangeLang = (event) => {
		setLanguage(event.target.value);
	};

	const handleChangeTitle = (event) => {
		setTitle(event.target.value);
	};

	const handleChangeCode = (text) => {
		setCode(text);
	};

	return (
		<div>
			<Button
				variant="outlined"
				className={classes.uploadBtn}
				onClick={handleClickOpen}>
				Upload code
			</Button>

			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
				<DialogTitle id="form-dialog-title" align="center">
					Request a code review
				</DialogTitle>

				<DialogContent className={classes.container}>
					<TextField
						id="code-title"
						label="Title"
						type="text"
						variant="outlined"
						onChange={handleChangeTitle}
						style={{ width: "500px" }}
					/>

					<FormControl variant="outlined">
						<InputLabel id="select-language">Language</InputLabel>
						<Select
							id="select-language"
							value={language}
							onChange={handleChangeLang}
							label="Language"
							style={{ width: "350px" }}>
							<MenuItem value={"javascript"}>JavaScript</MenuItem>
							<MenuItem value={"java"}>Java</MenuItem>
							<MenuItem value={"c++"}>C++</MenuItem>
							<MenuItem value={"python"}>Python</MenuItem>
						</Select>
					</FormControl>
				</DialogContent>

				<Editor sendCode={handleChangeCode} />

				<DialogActions>
					<Button onClick={handleSubmit} className={classes.submitBtn}>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
