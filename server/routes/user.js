const express = require("express");

const User = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

/////// User sign up route handler ///////
router.post("/api/users/signup", async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.cookie("accessToken", token, {
			httpOnly: true,
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});
		res.status(201).send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

/////// User login route handler ///////
router.post("/api/users/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findUserByCredentials(email, password);
		const token = await user.generateAuthToken();
		res.cookie("accessToken", token, {
			httpOnly: true,
			maxAge: 30 * 24 * 60 * 60 * 1000,
		});
		res.send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

/////// User log out route handler ///////
router.post("/api/users/logout", auth, async (req, res) => {
	res.clearCookie("accessToken");
	res.send("logged out successfully.");
});

/////// User profile route handler ///////
router.get("/api/users/me", auth, async (req, res) => {
	const user = req.user;
	res.send(user);
});

module.exports = router;
