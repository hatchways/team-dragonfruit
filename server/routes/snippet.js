const express = require("express");

const auth = require("../middleware/auth");
const balance = require("../middleware/balance");
const Snippet = require("../models/snippet");
const matchReviewer = require("../utils/match");

const router = express.Router();

/////// Upload code route handler ///////
router.post("/upload", auth, balance, async (req, res) => {
	const snippet = new Snippet({
		...req.body,

		author: req.user._id,
		reviewer: null,
		comments: null,
		rating: 0,
		date_accepted: null,
		date_submitted: null,
	});

	// if (!req.user.experience.has(language)) {
	// 	res.status(403).send({
	// 		error: "Please specify your level in this language.",
	// 	});
	// }
	// else {
	// const level = req.user.experience.get(language);
	// matchReviewer(language, level, snippet._id);
	try {
		await snippet.save();
		req.user.balance -= 1;
		await req.user.save();
		res.status(201).send(snippet);
	} catch (e) {
		res.status(400).send(e);
	}
	// }
});

/////// Retrieve code route handler ///////
router.get("/snippet", auth, async (req, res) => {
	const snippets = await Snippet.find({ author: req.user._id });
	res.send(snippets);
});

// fetch requested reviews
router.get("/requested", auth, async (req, res) => {
	try {
		const requestedReviews = await Snippet.find({ author: req.user._id })
			.populate("author", ["name"])
			.populate("reviewer", ["name"]);
		return res.status(200).json(requestedReviews);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
});

// fetch received reviews
router.get("/received", auth, async (req, res) => {
	try {
		const receivedReviews = await Snippet.find({
			reviewer: req.user._id,
		})
			.populate("author", ["name"])
			.populate("reviewer", ["name"]);

		return res.status(200).json(receivedReviews);
	} catch (error) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
});

// accept a review
router.patch("/accept/:review_id", auth, async (req, res) => {
	try {
		const receivedReviews = await Snippet.find({ reviewer: req.user._id });

		if (!receivedReviews) return res.status(404).send("Not Found");

		// find index of a specific review
		const objIndex = receivedReviews.findIndex(
			(obj) => obj._id.toString() === req.params.review_id,
		);
		// change status and date_accepted
		receivedReviews[objIndex].status = "in-review";
		receivedReviews[objIndex].date_accepted = Date.now();

		await receivedReviews[objIndex].save();

		return res.status(200).json(receivedReviews);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
});

// decline a review
router.patch("/decline/:review_id", auth, async (req, res) => {
	try {
		const receivedReviews = await Snippet.find({ reviewer: req.user._id });

		if (!receivedReviews) return res.status(404).send("Not Found");

		// find index of a specific review
		const objIndex = receivedReviews.findIndex(
			(review) => review._id.toString() === req.params.review_id,
		);
		// change status and reviewer and date_accepted
		receivedReviews[objIndex].status = "pending";
		receivedReviews[objIndex].reviewer = null;
		receivedReviews[objIndex].date_accepted = null;

		await receivedReviews[objIndex].save();

		return res.status(200).json(receivedReviews);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
});

// submit a comment
router.post("/comment/:review_id", auth, async (req, res) => {
	const { comment } = req.body;

	try {
		const receivedReviews = await Snippet.find({ reviewer: req.user._id });

		if (!receivedReviews) return res.status(400).send("Not Found");

		// find index of a specific review
		const objIndex = receivedReviews.findIndex(
			(review) => review._id.toString() === req.params.review_id,
		);
		// change status and comments and date_submitted
		receivedReviews[objIndex].comments = comment;
		receivedReviews[objIndex].status = "completed";
		receivedReviews[objIndex].date_submitted = Date.now();

		await receivedReviews[objIndex].save();

		return res.status(200).json(receivedReviews);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
});

// rating feedback
router.patch("/rating/:review_id", auth, async (req, res) => {
	const { rating } = req.body;

	try {
		const requestedReviews = await Snippet.find({ author: req.user._id });

		if (!requestedReviews) return res.status(404).send("Not Found");

		// find index of a specific review
		const objIndex = requestedReviews.findIndex(
			(review) => review._id.toString() === req.params.review_id,
		);
		// change status and reviewer and date_accepted
		requestedReviews[objIndex].rating = rating;

		await requestedReviews[objIndex].save();

		return res.status(200).json(requestedReviews);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
