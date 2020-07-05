import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Image from "material-ui-image";

import SimpleMenu from "../utilities/SimpleMenu";
import ImageAvatar from "../utilities/Avatar";
import BadgeMenu from "../utilities/BadgeMenu";

//??** Is it the only way to show the image to import the file?
//??** I couldn't get it to show just by passing the src props!
import JohnDoe from "../../src/images/avatar1.png";
import logo from "../../src/images/logo.png";

///////***** To Be Implemented: DIFFERENT CONTENT BASED ON BEING LOGGED IN OR NOT *******/////////

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

	return (
		<AppBar position="static" className={classes.root}>
			<div className={classes.logoContainer}>
				<Image src={logo} className={classes.logo} aspectRatio={3 / 4} />
			</div>
			<div className={classes.toolbar}>
				<Toolbar className={classes.navbar}>
					<Button variant="contained" color="primary" className={classes.btn}>
						Reviews
					</Button>
					<Button variant="contained" color="primary" className={classes.btn}>
						Balance
					</Button>
					<BadgeMenu />
					<Button variant="outlined" className={classes.uploadBtn}>
						Upload code
					</Button>
					<ImageAvatar alt="John Doe" src={JohnDoe} />
					<SimpleMenu title="Profile" />
				</Toolbar>
			</div>
		</AppBar>
	);
}
