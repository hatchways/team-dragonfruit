const jwt = require('jsonwebtoken');

const User = require('../models/user');

const auth = async (req, res, next) => {
	try {
		const token = req.cookies.accessToken;
		const deciphered = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({
			_id: deciphered._id,
		});

		if (!user) {
			throw new Error();
		}

		req.user = user;
		res.cookie('accessToken', token, { httpOnly: true }); //!!!** maxAge? **!!!//
		next();
	} catch {
		res.status(401).send({ error: 'Please authenticate!' });
	}
};

module.exports = auth;
