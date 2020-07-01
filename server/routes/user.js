const express = require('express');
const User = require('../models/user');

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

module.exports = router;
