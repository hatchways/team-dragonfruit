const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error('Please provide a valid email address.');
			}
		},
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 7,
	},
	experience: [
		{
			language: {
				type: String,
				required: true,
			},
			level: {
				type: Number,
				required: true,
			},
		},
	],
	profileCompleted: {
		type: Boolean,
		default: false,
	},
	balance: {
		type: Number,
		default: 3,
	},
	tokens: [
		//**!!! Array of tokens for different sessions/devices or only one token? !!!**//
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});


/////// A method for generating a token ///////
// userSchema.methods.generateAuthToken = async function () {
// 	const token = jwt.sign({ _id: this._id.toString() }, 'thisismysecret'); //!!!** Don't forget to move secret to .env **!!!//
// 	this.tokens = this.tokens.concat({ token });
// 	await this.save();
// 	return token;
// };


/////// A middleware for hashing the plain text password before saving ///////
userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	next();
});


/////// A method for verifying a user's password ///////
userSchema.statics.findUserByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Unable to login!');
	}

	const passwordMatched = await bcrypt.compare(password, user.password);
	if (!passwordMatched) {
		throw new Error('Unable to login!');
	}

	return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
