const express = require("express");

const auth = require("../middleware/auth");
const balance = require("../middleware/balance");
const Snippet = require("../models/snippet");
const matchReviewer = require("../utils/match");

const router = express.Router();

/////// Upload code route handler ///////
router.post("/upload", auth, balance, async (req, res) => {
	const snippet = new Snippet({ ...req.body, author: req.user._id });
	const language = snippet.language;
	const expIndex = req.user.experience.findIndex(
		(exp) => exp.language === language,
	);

	if (expIndex == -1) {
		res
			.status(403)
			.send({ error: "Please specify your level in this language." });
		return;
	} else {
		const level = req.user.experience[expIndex].level;
		// matchReviewer(language, level, snippet._id);
		console.log(language, level);

		try {
			await snippet.save();
			req.user.balance -= 1;
			await req.user.save();
			res.status(201).send(snippet);
		} catch (e) {
			res.status(400).send(e);
		}
	}
});

/////// Retrieve code route handler ///////
router.get("/snippet", auth, async (req, res) => {
	const snippets = await Snippet.find({ author: req.user._id });
	res.send(snippets);
});

module.exports = router;
