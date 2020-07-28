const User = require("../models/user");
const Snippet = require("../models/snippet");

const randomIndexGenerator = (length) => {
	return Math.floor(Math.random() * length);
};

const matchReviewer = async (snippet_id) => {
	const snippet = await Snippet.findById(snippet_id);
	const language = snippet.language;
	const author = await snippet.populate("author").execPopulate();

	const level = author.author.experience.get(language);

	let reviewers = await User.find({
		["experience." + language]: { $gte: level },
	});


	// remove author from reviewers array
	const index = reviewers.findIndex(
		(el) => el._id.toString() === author.author._id.toString(),
	);
	console.log("index: ", index);
	reviewers.splice(index, 1);

	console.log("Potential reviewers: ", reviewers);

	// return if there is no reviewers for now
	if (reviewers.length === 0) {
		snippet.status = "waitlisted";
		await snippet.save();
		return;
	}

	let reviewer = reviewers[randomIndexGenerator(reviewers.length)];
	let done = false;

	while (done === false) {

		if (reviewer.declined.indexOf(snippet_id) !== -1) {
			console.log("Declined by: ", reviewer);

			// remove that person from the array
			const index = reviewers.findIndex(
				(el) => el._id.toString() === reviewer._id.toString(),
			);
			reviewers.splice(index, 1);

			// check if there is any reviewers left. If not, wait-list the snippet
			if (reviewers.length === 0) {
				snippet.status = "waitlisted";
				await snippet.save();
				done = true;
				return;
			} else {

				// try another match
				reviewer = reviewers[randomIndexGenerator(reviewers.length)];
			}
		}
		else {
			// request the reviewer
			console.log("request to: ", reviewer);
			done = true;
			snippet.reviewer = reviewer._id;
			snippet.status = "requested";
			snippet.date_requested = Date.now();
			await snippet.save();
		}
	}
};

module.exports = matchReviewer;
