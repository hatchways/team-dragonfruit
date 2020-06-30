const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer', '');
		const deciphered = jwt.verify(token, 'thisismysecret'); //!!!** Don't forget to move secret to .env **!!!//
		const user = await User.findOne({
			_id: deciphered._id,
			'tokens.token': token,
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
