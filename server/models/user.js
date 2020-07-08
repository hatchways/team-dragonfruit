const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

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
				throw new Error("Please provide a valid email address.");
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

userSchema.virtual("snippets", {
	ref: "Snippet",
	localField: "_id",
	foreignField: "author",
});

/////// A method for generating a token ///////
userSchema.methods.generateAuthToken = async function () {
	const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
	await this.save();
	return token;
};

/////// A middleware for hashing the plain text password before saving ///////
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	next();
});

/////// A method for verifying a user's password ///////
userSchema.statics.findUserByCredentials = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("Unable to login!");
	}
	const passwordMatched = await bcrypt.compare(password, user.password);
	if (!passwordMatched) {
		throw new Error("Unable to login!");
	}
	return user;
};

/////// A method for hiding private data /////////
userSchema.methods.toJSON = function () {
	const userObject = this.toObject();
	delete userObject.password;
	return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
