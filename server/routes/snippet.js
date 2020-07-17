const express = require("express");

const auth = require("../middleware/auth");
const balance = require("../middleware/balance");
const Snippet = require("../models/snippet");
const matchReviewer = require("../utils/match");

const router = express.Router();

/////// Upload code route handler ///////
router.post("/upload", auth, balance, async (req, res) => {

	const { code, title, language } = req.body;
	const snippet = new Snippet({ code, title, language, author: req.user._id });

	if (!req.user.experience.has(language)) {
		res.status(403).send({
			error: "Please specify your level in this language.",
		});
	} else {
		const level = req.user.experience.get(language);
		matchReviewer(language, level, snippet._id);
		
	}
});

/////// Retrieve code route handler ///////
router.get("/snippet", auth, async (req, res) => {
	const snippets = await Snippet.find({ author: req.user._id });
	res.send(snippets);
});

module.exports = router;
