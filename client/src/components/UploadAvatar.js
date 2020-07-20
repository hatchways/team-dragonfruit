import axios from "axios";
import React from "react";
import { Typography, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import CircularProgress from "@material-ui/core/CircularProgress";

import DropZone from "../utils/DropeZone";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		margin: "2rem auto",
		padding: "1.5rem",
		alignItems: "center",
		background: "secondary",
	},

	btn: {
		color: "white",
		padding: "0.5rem 1rem",
		borderRadius: "2rem",
		background: "turquoise",
		textTransform: "capitalize",
		fontSize: "1rem",
		margin: "1rem 0",
		"&:hover": {
			backgroundColor: "#43dd9a",
			color: "#6E3ADB",
		},
	},
	done: {
		color: "green",
		width: "3vw",
		fontSize: "2.5rem",
		margin: "0 auto",
	},
	loadingContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "10vh",
	},
}));

const Loading = () => {
	const classes = useStyles();
	return (
		<div className={classes.loadingContainer}>
			<CircularProgress size={40} />
		</div>
	);
};

const UploadAvatar = () => {
	const classes = useStyles();
	const [selectedFile, setSelectedFile] = React.useState("null");
	const [done, setDone] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const getFile = (files) => {
		setSelectedFile(files[0]);
	};

	const handleSubmitAvatar = async (e) => {
		setLoading(true);
		const data = new FormData();
		data.append("avatar", selectedFile);
		await axios.post("/api/users/avatar", data);
		setLoading(false);
		setDone(true);
	};
	return (
		<Paper className={classes.container}>
			<Typography variant="h6" color="primary">
				Upload your profile picture:
			</Typography>

			<DropZone onFilesAdded={getFile} />

			<Button
				variant="outlined"
				className={classes.btn}
				onClick={handleSubmitAvatar}>
				Upload
			</Button>

			{loading ? <Loading /> : null}

			{done ? (
				<div className={classes.done}>
					<Typography>
						Done
						<CloudDoneIcon fontSize="large" />
					</Typography>
				</div>
			) : null}
		</Paper>
	);
};

export default UploadAvatar;
