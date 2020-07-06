import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(3),
	},
	menu: {
		flexGrow: 1,
		color: "white",
		textTransform: "none",
		fontSize: "16px",
		fontWeight: "normal",
	},
	icon: {
		marginLeft: "10px",
	},
	link: {
		color: "black",
		"&:hover": {
			color: theme.palette.primary.main,
			textDecoration: "none",
		},
	},
}));

export default function SimpleMenu(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const classes = useStyles();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleClick}
				className={classes.menu}>
				{props.title}
				<ArrowDropDownIcon className={classes.icon} />
			</Button>

			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				<MenuItem onClick={handleClose}>
					<Link href="/users/dashboard" className={classes.link}>
						Dashboard
					</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Link href="/users/profile" className={classes.link}>
						My account
					</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Link href="/api/users/logout" className={classes.link}>
						Logout
					</Link>
				</MenuItem>
			</Menu>
		</div>
	);
}
