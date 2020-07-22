const axios = require("axios");
const express = require("express");
const User = require("../models/user");
const Snippet = require("../models/snippet");

const randomIndexGenerator = (length) => {
	const randomIndex = Math.floor(Math.random() * length);
	return randomIndex;
};

const matchReviewer = async (snippet_id) => {
	const snippet = await Snippet.findById(snippet_id);
	const language = snippet.language;
	const author = snippet.populate("author").execPopulate();
	const level = author.experience.get(language);

	let reviewers = await User.find({
		["experience." + language]: { $gte: level },
	});

	console.log("Potential reviewers: ", reviewers);

	let done = false;
	let reviewer = reviewers[randomIndexGenerator(reviewers.length)];

	while (done === false) {
		if (reviewer.declined.indexOf(snippet_id) != -1) {
			console.log("Declined by: ", reviewer);

			// remove that person from the array
			reviewers = reviewers.filter((el) => el != reviewer);

			// do another match
			reviewer = reviewers[randomIndexGenerator(reviewers.length)];
		} else {
			// send request for the reviewer
			console.log("Send request to: ", reviewer);
			await axios.post(`/api/users/request/${reviewer._id}/${snippet_id}`);

			done = true;
		}
	}
};

module.exports = matchReviewer;
