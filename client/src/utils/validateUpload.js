import axios from "axios";

const validate = (userData) => {
	const { language, code } = userData;

	let errors = {};
	const user = JSON.parse(localStorage.getItem("user"));
	const experience = user.experience;

	// user profile is not complete
	if (experience === {} || !Object.keys(experience).includes(language)) {
		errors.language = "Please specify your level in this language";
	}

	// language is required
	if (language === "") {
		errors.language = "Please choose a language";
	}

	// Avoid submitting empty editor
	if (code === "") {
		errors.code = "Please provide the code to be reviewed";
	}

	return errors;
};

export default validate;
