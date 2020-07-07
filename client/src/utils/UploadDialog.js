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
	Grid,
} from "@material-ui/core";

import CodeEditor from "./CodeEditor";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(2),
		minWidth: 120,
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
		title: {
			height: "50px",
			marginBottom: "100px",
		},
		editor: {
			height: "250px",
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

			<Dialog open={open} onClose={handleClose}>
				{/* <Grid container justify="center"> */}
				<DialogTitle
					id="form-dialog-title"
					className={classes.title}
					align="center">
					Request a code review
				</DialogTitle>

				<DialogContent>
					<FormControl
						variant="outlined"
						className={classes.formControl}
						fullWidth>
						<Grid container direction="row">
							<Grid item>
								<TextField
									id="code-title"
									label="Title"
									type="text"
									variant="outlined"
								/>
							</Grid>
							<Grid item>
								<InputLabel id="select-language">Language</InputLabel>
								<Select
									id="select-language"
									value={language}
									onChange={handleChange}
									label="Language">
									<MenuItem value={"javascript"}>JavaScript</MenuItem>
									<MenuItem value={"java"}>Java</MenuItem>
									<MenuItem value={"c++"}>C++</MenuItem>
									<MenuItem value={"python"}>Python</MenuItem>
								</Select>
							</Grid>
						</Grid>
					</FormControl>
					<div style={{ height: "250px" }}>
						{/**??Only inline styling works here! Why??**/}
						<CodeEditor />
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} className={classes.submitBtn}>
						Submit
					</Button>
				</DialogActions>
				{/* </Grid> */}
			</Dialog>
		</div>
	);
}
