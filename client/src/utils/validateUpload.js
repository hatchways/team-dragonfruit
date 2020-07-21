import axios from "axios";

const validate = async (userData) => {
	const { language, code } = userData;

	let errors = {};
	const response = await axios.get("/api/users/me");
	const experience = response.data.experience;
	const balance = response.data.balance;

	console.log("experience from validateUpload: ", experience);

	// User must have enough balance
	if (balance < 1) {
		errors.balance = "You don't have enough credits";
		return errors;
	}

	// user profile is not complete
	if (!Object.keys(experience).includes(language)) {
		errors.language = "Please specify your level in this language";
	}

	// language is required
	if (language === "") {
		errors.language = "Please choose a language";
	}

	// Avoid submitting empty editor
	if (code.length === 0) {
		errors.code = "Please provide the code to be reviewed";
	}

	return errors;
};

export default validate;
