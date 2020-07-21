import axios from "axios";

const validate = async (userData) => {
	const { language, code } = userData;

	let errors = {};
	const response = await axios.get("/api/users/me");
	const experience = response.data.experience;

	// language is required
	if (language === "") {
		errors.language = "Please choose a language";
	}

	// user profile is not complete
	if (!Object.keys(experience).includes(language)) {
		errors.language = "Please specify your level in this language";
	}

	// Avoid submitting empty editor
	if (code.length === 0) {
		errors.code = "Please provide the code to be reviewed";
	}

	return errors;
};

export default validate;
