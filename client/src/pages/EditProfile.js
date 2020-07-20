import React from "react";
import { Typography, Paper, Button, Dialog } from "@material-ui/core";
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

const EditProfile = () => {
	const classes = useStyles();
	const history = useHistory();
	const [open, setOpen] = React.useState(true);

	const handleClose = () => {
		setOpen(false);
		history.push("/");
	};
	return (
		<WithBackground>
			<Dialog open={open} fullWidth maxWidth="md">
				<Paper className={classes.container}>
					<UploadAvatar />
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
