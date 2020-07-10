import React from "react";
import { Typography, Box, Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
	text: {
		fontWeight: "bold",
		fontSize: "16px",
		margin: "10px",
		marginLeft: "35px",
		padding: "0",
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		display: "flex",
		justifyContent: "space-between",
	},
}));

const LanguageSelector = (props) => {
	const classes = useStyles();
	const [language, setLanguage] = React.useState([]);
	const [level, setLevel] = React.useState([]);

	const handleChangeLang = (e) => {
		const lang = e.target.value;
		setLanguage(lang);
		props.getLang(lang);
	};

	const handleChangeLevel = (e) => {
		const lev = e.target.value;
		setLevel(lev);
		props.getLevel(lev);
	};

	return (
		<Box className={classes.formControl}>
			<Typography className={classes.text}>Language:</Typography>

			<Select
				variant="outlined"
				value={language}
				onChange={handleChangeLang}
				style={{ width: "200px" }}>
				<MenuItem value="">None</MenuItem>
				<MenuItem value="JavaScript">JavaScript</MenuItem>
				<MenuItem value="Java">Java</MenuItem>
				<MenuItem value="Python">Python</MenuItem>
				<MenuItem value="C++">C++</MenuItem>
				<MenuItem value="Ruby">Ruby</MenuItem>
			</Select>

			<Typography className={classes.text}>Level:</Typography>
			<Select
				variant="outlined"
				value={level}
				onChange={handleChangeLevel}
				style={{ width: "200px" }}>
				<MenuItem value="">None</MenuItem>
				<MenuItem value={1}>Beginner</MenuItem>
				<MenuItem value={2}>Intermediate</MenuItem>
				<MenuItem value={3}>Advanced</MenuItem>
			</Select>
		</Box>
	);
};

export default LanguageSelector;
