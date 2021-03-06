import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Image from "material-ui-image";

import Menu from "../utils/NavbarMenu";
import ImageAvatar from "../utils/Avatar";
import BadgeMenu from "../utils/BadgeMenu";
import UploadDialog from "../utils/UploadDialog";

import logo from "../../src/images/logo.png";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		height: "80px",
		alignItems: "center",
	},
	btn: {
		color: "white",
		textTransform: "none",
		fontSize: "14px",
		fontWeight: "normal",
		borderRadius: "20px",
		margin: "0 20px",
	},
	navbar: {
		display: "flex",
		justifyContent: "space-between",
		width: "50vw",
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
	logo: {
		backgroundColor: theme.palette.primary.main,
		transition: "none",
	},
	logoContainer: {
		width: "30px",
		height: "30px",
		marginRight: "auto",
		marginLeft: theme.spacing(3),
		marginBottom: "14px",
	},
}));

export default function Navbar() {
	const classes = useStyles();
	const history = useHistory();
	const [imgSrc, setImgSrc] = useState("");

	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			const id = JSON.parse(user)._id;
			setImgSrc(`/api/users/avatar/${id}`);
		}
	}, []);

	return (
		<AppBar position="static" className={classes.root}>
			<div className={classes.logoContainer}>
				<Image src={logo} className={classes.logo} aspectRatio={3 / 4} />
			</div>
			<div className={classes.toolbar}>
				<Toolbar className={classes.navbar}>
					<Button
						variant="contained"
						color="primary"
						className={classes.btn}
						onClick={() => {
							history.push("/reviews");
						}}>
						Reviews
					</Button>
					<Button
						variant="contained"
						color="primary"
						className={classes.btn}
						onClick={() => {
							history.push("/balance");
						}}>
						Balance
					</Button>
					<BadgeMenu />
					<UploadDialog />
					<ImageAvatar alt="User Avatar" src={imgSrc} />
					<Menu title="Profile" />
				</Toolbar>
			</div>
		</AppBar>
	);
}
