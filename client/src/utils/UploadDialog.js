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
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIRichTextEditor from "mui-rte";

import CodeEditor from "./CodeEditor";

// Styling the MuiRichTextEditor //
const defaultTheme = createMuiTheme();
Object.assign(defaultTheme, {
	overrides: {
		MUIRichTextEditor: {
			root: {
				marginTop: "-150px",
				marginBottom: "50px",
				width: "80%",
				paddingLeft: "50px",
			},
			editor: {
				border: "1px solid gray",
				margin: "20px",
				height: "100px",
			},
		},
	},
});

// Styling the Dialog From //
const useStyles = makeStyles((theme) => ({
	container: {
		margin: theme.spacing(3),
		minWidth: 120,
		display: "flex",
		justifyContent: "space-between",
		height: "200px",
	},
	uploadBtn: {
		color: theme.palette.turquoise.main,
		borderRadius: "20px",
		borderColor: theme.palette.turquoise.main,
		textTransform: "none",
		borderWidth: "2px",
		margin: theme.spacing(2),
		paddingRight: theme.spacing(3),
		paddingLeft: theme.spacing(3),
	},
	submitBtn: {
		margin: "0 auto",
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
	const classes = useStyles();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async () => {
		setOpen(false);
		const snippet = { language, title, code: "some sample code" };
		console.log(snippet);
		await axios.post("/api/users/upload", snippet);
	};

	const handleChangeLang = (event) => {
		setLanguage(event.target.value);
	};

	const handleChangeTitle = (event) => {
		setTitle(event.target.value);
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
						<InputLabel id="select-language" maxWidth="md" fullWidth>
							Language
						</InputLabel>
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

				{/* <div style={{ height: "200px"}}> */}
				{/**??Only inline styling works here! Why??**/}
				{/* <CodeEditor />
				</div> */}

				{/* I couldn't style it like the other components using classes object.*/}
				<MuiThemeProvider theme={defaultTheme}>
					<MUIRichTextEditor />
				</MuiThemeProvider>

				<DialogActions>
					<Button onClick={handleSubmit} className={classes.submitBtn}>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
