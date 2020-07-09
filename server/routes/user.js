const express = require("express");

const User = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

/////// User sign up route handler ///////
router.post("/signup", async (req, res) => {
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
router.post("/login", async (req, res) => {
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
router.post("/logout", auth, async (req, res) => {
	res.clearCookie("accessToken");
	res.send("logged out successfully.");
});

/////// User profile route handler ///////
router.get("/me", auth, async (req, res) => {
	const user = req.user;
	res.send(user);
});

/////// Update user experience route handler ///////
router.post("/experience", auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	user.experience = req.body.userExp;
	user.profileCompleted = true;
	await user.save();
	res.send(user);
});

// get balance
router.get('/api/users/balance', auth, (req, res) => {
  const user = req.user;
  res.status(200).send(user);
});

// add credit to top-up
router.post('/api/users/topup', auth, async (req, res) => {
  const { credit } = req.body;

  try {
    const user = req.user;

    user.balance += credit;

    await user.save();
    res.status(200).send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
