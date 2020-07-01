const express = require('express');

const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

/////// User sign up route handler ///////
router.post('/users/signup', async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		const token = await user.generateAuthToken();
		res.cookie('accessToken', token, { httpOnly: true });
		res.status(201).send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

/////// User login route handler ///////
router.post('/users/login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findUserByCredentials(email, password);
		const token = await user.generateAuthToken();
		res.cookie('accessToken', token, { httpOnly: true });
		res.send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

/////// User log out route handler ///////
router.post('/users/logout', auth, async (req, res) => {

	res.cookie('accessToken', '', { maxAge: 0, httpOnly: true });
	res.send('logged out successfully.');
});

/////// User profile route handler ///////
router.get('/users/me', auth, async (req, res) => {
	const user = req.user;
	res.send(user);
});

module.exports = router;
