const express = require("express");
const User = require('../models/user');


const matchReviewer = async(language, level, id) => {
	const reviewers = await User.find({ experience[language]: { $gte: level } })
	const randomIndex = Math.floor(Math.random() * reviewers.length);
	const reviewer = reviewers[randomIndex];

	if (reviewer.declined.has(id)) {
		//select another one
	}
	else {
		// send request for the reviewer 
	}

}


module.exports = matchReviewer;