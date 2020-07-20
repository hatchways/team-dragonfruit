import axios from "axios";

const validate = async (userData) => {
	const { language, content } = userData;

	let errors = {};
	const response = await axios.get("/api/users/me");
	const experience = response.data.experience;

	// user profile is not complete
	if (!Object.keys(experience).includes(language)) {
		errors.language = "Please specify your level in this language";
	}

	// language is required
	if (language === "") {
		errors.language = "Please choose a language";
	}

	// Avoid submitting empty editor
	if (content.length === 0) {
		errors.code = "Please provide the code to be reviewed";
	}

	return errors;
};

export default validate;
