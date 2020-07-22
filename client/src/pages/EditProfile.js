import axios from "axios";
import React, { useState } from "react";
import { Paper, Button, Dialog, TextField, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";

import WithBackground from "../hocs/withBackground";
import UploadAvatar from "../components/UploadAvatar";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		width: "800px",
		maxWidth: "1000px",
		margin: "2rem auto",
		padding: "2rem 0",
		alignItems: "center",
		background: "secondary",
	},
	closeBtn: {
		border: "1px solid #43dd9a",
		borderRadius: "2rem",
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
	nameContainer: {
		display: "flex",
		justifyContent: "space-between",
		width: "80%",
	},
	text: {
		width: "80%",
		margin: "0 2rem",
	},
}));

const EditProfile = () => {
	const classes = useStyles();
	const history = useHistory();
	const [open, setOpen] = useState(true);
	const [data, setData] = useState({});

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleClose = () => {
		setOpen(false);
		history.push("/");
	};

	const handleSubmit = async () => {
		setOpen(false);
		history.push("/");
		await axios.patch("/api/users/me", data);
	};
	return (
		<WithBackground>
			<Dialog open={open} fullWidth maxWidth="md">
				<Paper className={classes.container}>
					<Box className={classes.nameContainer}>
						<TextField
							name="name"
							label="Name"
							variant="outlined"
							onChange={(e) => handleChange(e)}
							className={classes.text}
						/>
						<TextField
							name="title"
							label="Job Title"
							variant="outlined"
							onChange={(e) => handleChange(e)}
							className={classes.text}
						/>
					</Box>
					<UploadAvatar />
					<Button
						onClick={(e) => handleSubmit(e)}
						className={classes.submitBtn}>
						Submit
					</Button>
					<Button
						onClick={handleClose}
						color="primary"
						className={classes.closeBtn}>
						Close
					</Button>
				</Paper>
			</Dialog>
		</WithBackground>
	);
};

export default EditProfile;
