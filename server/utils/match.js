const express = require("express");
const User = require("../models/user");

const randomIndexGenerator = (length) => {
	const randomIndex = Math.floor(Math.random() * length);
	return randomIndex;
};

const matchReviewer = async (language, level, id) => {
	let reviewers = await User.find({
		["experience." + language]: { $gt: level },
	});

	console.log("Potential reviewers: ", reviewers);

	let done = false;
	let reviewer = reviewers[randomIndexGenerator(reviewers.length)];

	while (done === false) {
		if (reviewer.declined.indexOf(id) != -1) {
			console.log("Declined by: ", reviewer);

			// remove that person from the array
			reviewers = reviewers.filter((el) => el != reviewer);

			// do another match
			reviewer = reviewers[randomIndexGenerator(reviewers.length)];
			
		} else {
			// send request for the reviewer
			console.log("Send request to: ", reviewer);
			done = true;
		}
	}
};

module.exports = matchReviewer;
