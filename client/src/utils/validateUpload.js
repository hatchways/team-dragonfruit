const validate = (userData) => {
	const { language, code } = userData;

	let errors = {};

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
