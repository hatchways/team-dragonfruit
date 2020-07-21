import axios from "axios";
import React, { useState, useEffect } from "react";
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
	Typography,
} from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import PrismDraft from "./PrismDraft";
import validate from "./validateUpload";
import Message from "../components/Message";

const useStyles = makeStyles((theme) => ({
	container: {
		margin: theme.spacing(2),
		minWidth: 120,
		display: "flex",
		justifyContent: "space-between",
		minHeight: "700px",
	},
	content: {
		display: "flex",
		justifyContent: "space-between",
		minHeight: "10vh",
		width: "90%",
		overflowY: "auto",
		margin: "0 auto",
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
			backgroundColor: "#6E3ADB",
			color: "#43dd9a",
		},
	},
	validateBtn: {
		margin: "20px auto",
		padding: "0.7rem 4rem",
		borderRadius: "2rem",
		background: theme.palette.primary.main,
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
	btnContainer: {
		display: "flex",
		justifyContent: "space-between",
		width: "100%",
	},
}));

export default function UploadDialog() {
	const [open, setOpen] = useState(false);
	const [errorData, setErrorData] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [validated, setValidated] = useState(false);
	const [data, setData] = useState({
		title: "",
		language: "",
		code: [],
	});

	const classes = useStyles();
	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChangeCode = (content) => {
		setData({ ...data, code: content });
	};

	// const handleValidate = async () => {
	// 	const errors = await validate(data);
	// 	console.log(errors);
	// 	if (Object.keys(errors).length === 0) {
	// 		setValidated(true);
	// 	}
	// 	setErrorData(errors);
	// 	setIsSubmitting(true);
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();

		// if (Object.keys(errorData).length === 0 && isSubmitting) {
		// 	console.log("submitting: ", data);
		// 	await axios.post("/api/users/upload", data);
		// 	setData({
		// 		language: "",
		// 		title: "",
		// 		code: [],
		// 	});
		// 	setIsSubmitting(false);
		// 	setOpen(false);
		// }

		const errors = await validate(data);
		setErrorData(errors);
		setIsSubmitting(true);
	};

	useEffect(() => {
		if (Object.keys(errorData).length === 0 && isSubmitting) {
			async function postCode(snippet) {
				await axios.post("/api/users/upload", snippet);
				console.log("from useEffect snippet: ", snippet);
			}
			postCode(data);
			setData({ language: "", title: "", code: [] });
			setOpen(false);
		}
		setIsSubmitting(false);
	}, [errorData, data, isSubmitting]);

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

				<DialogContent className={classes.content}>
					<TextField
						name="title"
						label="Title"
						type="text"
						variant="outlined"
						onChange={handleChange}
						style={{ width: "30vw", margin: "0 auto" }}
					/>

					<FormControl variant="outlined">
						<InputLabel required id="select-language">
							Language
						</InputLabel>

						<Select
							name="language"
							value={data.language}
							onChange={handleChange}
							label="Language"
							style={{ width: "20vw", margin: "0 auto" }}>
							<MenuItem value={"JavaScript"}>JavaScript</MenuItem>
							<MenuItem value={"Java"}>Java</MenuItem>
							<MenuItem value={"C++"}>C++</MenuItem>
							<MenuItem value={"Python"}>Python</MenuItem>
							<MenuItem value={"Ruby"}>Ruby</MenuItem>
						</Select>

						{errorData.language !== "" ? (
							<Typography
								variant="subtitle1"
								style={{
									color: "red",
									textAlign: "center",
								}}>
								{errorData.language}
							</Typography>
						) : null}
					</FormControl>
				</DialogContent>

				{errorData.code !== "" ? (
					<Typography
						variant="subtitle1"
						style={{
							color: "red",
							textAlign: "center",
						}}>
						{errorData.code}
					</Typography>
				) : null}
				<PrismDraft language={data.language} sendCode={handleChangeCode} />

				<DialogActions>
					{errorData.balance && (
						<Message message={errorData.balance} open={true} type="error" />
					)}

					<div className={classes.btnContainer}>
						<Button
							// onClick={(e) => handleValidate()}
							className={classes.validateBtn}>
							Validate
						</Button>
						{validated ? (
							<CheckCircleOutlineIcon fontSize="large" color="primary" />
						) : null}
						<Button
							onClick={(e) => handleSubmit(e)}
							className={classes.submitBtn}>
							Submit
						</Button>
					</div>
				</DialogActions>
			</Dialog>
		</div>
	);
}
