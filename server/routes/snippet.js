const express = require("express");

const auth = require("../middleware/auth");
const balance = require("../middleware/balance");
const Snippet = require("../models/snippet");

const router = express.Router();

/////// Upload code route handler ///////
router.post("/upload", auth, balance, async (req, res) => {
	const snippet = new Snippet({ ...req.body, author: req.user._id });
	try {
		await snippet.save();
		req.user.balance -= 1;
		await req.user.save();
		res.status(201).send(snippet);
	} catch (e) {
		res.status(400).send(e);
	}
});

/////// Retrieve code route handler ///////
router.get("/code", auth, async (req, res) => {
	const snippets = await Snippet.find({ author: req.user._id }).exec();
	snippets.forEach(snippet => console.log(snippet.code));
	res.send(snippets);
});

module.exports = router;
