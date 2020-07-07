const balance = (req, res, next) => {
	if (req.user.balance < 1) {
		return res.status(403).send({ error: "Not enough balance!" });
	}

	next();
};

module.exports = balance;
