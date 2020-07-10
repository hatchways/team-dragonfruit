import React from "react";
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

//??** Is it the only way to show the image to import the file?
//??** I couldn't get it to show just by passing the src props!
import JohnDoe from "../../src/images/avatar1.png";
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

//**??Use hooks for getting the avatar src and keep it in the state object??**//

export default function Navbar() {
	const classes = useStyles();
	const history = useHistory();

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
					<ImageAvatar alt="John Doe" src={JohnDoe} />
					<Menu title="Profile" />
				</Toolbar>
			</div>
		</AppBar>
	);
}
