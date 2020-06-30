const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
});

/////// A method for generating a token ///////
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id.toString() }, 'thisismysecret'); //!!!** Don't forget to move secret to .env **!!!//
	return token;
};

/////// A middleware for hashing the plain text password before saving ///////
userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	next();
});
