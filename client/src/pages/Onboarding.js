import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

// export default function SimpleSelect() {
// 	const classes = useStyles();
// 	const [age, setAge] = React.useState("");

// 	const handleChange = (event) => {
// 		setAge(event.target.value);
// 	};

// 	return (
// 		<div>
// 			<FormControl variant="outlined" className={classes.formControl}>
// 				<InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
// 				<Select
// 					labelId="demo-simple-select-outlined-label"
// 					id="demo-simple-select-outlined"
// 					value={age}
// 					onChange={handleChange}
// 					label="Age">
// 					<MenuItem value="">
// 						<em>None</em>
// 					</MenuItem>
// 					<MenuItem value={10}>Ten</MenuItem>
// 					<MenuItem value={20}>Twenty</MenuItem>
// 					<MenuItem value={30}>Thirty</MenuItem>
// 				</Select>
// 				<InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
// 				<Select
// 					labelId="demo-simple-select-outlined-label"
// 					id="demo-simple-select-outlined"
// 					value={age}
// 					onChange={handleChange}
// 					label="Level">
// 					<MenuItem value="">
// 						<em>None</em>
// 					</MenuItem>
// 					<MenuItem value={10}>Ten</MenuItem>
// 					<MenuItem value={20}>Twenty</MenuItem>
// 					<MenuItem value={30}>Thirty</MenuItem>
// 				</Select>
// 			</FormControl>
// 		</div>
// 	);
// }

export default function FormDialog() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Open form dialog
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To subscribe to this website, please enter your email address here.
						We will send updates occasionally.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Email Address"
						type="email"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleClose} color="primary">
						Subscribe
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
