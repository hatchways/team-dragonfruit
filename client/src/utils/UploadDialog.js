import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

import {
	Typography,
	Button,
	TextField,
	Dialog,
	Input,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from "@material-ui/core";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIRichTextEditor from "mui-rte";

import CodeEditor from "./CodeEditor";

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
			container: {},
		},
	},
});

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
		editor: {
			border: "1px solid grey",
		},
	},
}));

export default function UploadDialog() {
	const [open, setOpen] = React.useState(false);
	const [language, setLanguage] = React.useState("");
	const classes = useStyles();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event) => {
		setLanguage(event.target.value);
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
						style={{ width: "500px" }}
					/>

					<FormControl variant="outlined">
						<InputLabel id="select-language" maxWidth="md" fullWidth>
							Language
						</InputLabel>
						<Select
							id="select-language"
							value={language}
							onChange={handleChange}
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
				{/* <MUIRichTextEditor
					inlineToolbar={true}
					label="Enter your text..."
					className={classes.editor}
				/> */}
				<MuiThemeProvider theme={defaultTheme}>
					<MUIRichTextEditor />
				</MuiThemeProvider>
				<DialogActions>
					<Button onClick={handleClose} className={classes.submitBtn}>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
