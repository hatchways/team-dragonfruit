const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

const User = require("../models/user");
const auth = require("../middleware/auth");

const Stripe = require("stripe");
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET);

const router = express.Router();

/////// User sign up route handler ///////
router.post("/signup", async (req, res) => {
	const { name, email, password } = req.body;
	const user = new User({ name, email, password });

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

/////// Retrieve user profile route handler ///////
router.get("/me", auth, async (req, res) => {
	const user = req.user;
	res.send(user);
});

/////// Update user profile route handler ///////
router.patch("/me", auth, async (req, res) => {
	const { name, title } = req.body;
	const user = await User.findByIdAndUpdate(req.user.id, { name, title });
	await user.save();
	res.send(user);
});

// get balance
router.get("/balance", auth, (req, res) => {
	const user = req.user;
	res.status(200).send(user);
});

// add credit to top-up
router.post("/topup", auth, async (req, res) => {
	const { credit } = req.body;

	try {
		const user = req.user;

		user.balance += credit;

		await user.save();
		res.status(200).send(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// Stripe processing to accept payment
router.post("/charge", async (req, res) => {
	const { id, amount } = req.body;

	try {
		const payment = await stripe.paymentIntents.create({
			amount: amount,
			currency: "CAD",
			description: "Topup Payment",
			payment_method: id,
			confirm: true,
		});

		return res.status(200).json({
			confirm: "Successful transaction",
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: err.message });
	}
});

// credit check for code review
router.get("/review", auth, async (req, res) => {
	try {
		const user = req.user;
		if (user.balance <= 0) {
			return res
				.status(400)
				.json({ msg: "You do not have enough credit for code review" });
		} else {
			user.balance -= 1;
			await user.save();
			res.status(200).send(user);
		}
	} catch (err) {
		console.error(err);
	}
});

/////// Update user experience route handler ///////
router.post("/experience", auth, async (req, res) => {
	const user = await User.findById(req.user._id);

	req.body.forEach((exp) => {
		user.experience.set(Object.keys(exp)[0], Object.values(exp)[0]);
	});

	user.profileCompleted = true;
	await user.save();
	res.send(user);
});

/////// Upload user profile picture route handler ///////
const upload = multer({
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error("Please upload an image file"));
		}
		cb(undefined, true);
	},
});

router.post(
	"/avatar",
	auth,
	upload.single("avatar"),
	async (req, res) => {
		console.log("req: ", req.file);
		const buffer = await sharp(req.file.buffer)
			.resize({ width: 300, height: 300 })
			.png()
			.toBuffer();
		req.user.avatar = buffer;
		await req.user.save();
		res.send({ message: "Avatar uploaded successfully!" });
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	},
);

/////// Retrieve user profile picture route handler ///////
router.get("/avatar/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user || !user.avatar) {
			throw new Error();
		}
		res.set("Content-Type", "image/png");
		res.send(user.avatar);
	} catch (e) {
		res.status(404).send();
	}
});

/////// Delete user profile picture route handler ///////
router.delete("/avatar", auth, async (req, res) => {
	req.user.avatar = undefined;
	await req.user.save();
	res.send();
});

module.exports = router;
