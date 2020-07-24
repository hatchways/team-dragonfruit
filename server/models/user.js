const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		default: "User",
	},
	title: {
		type: String,
		trim: true,
		default: "Coder",
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
	experience: {
		type: Map,
		of: Number,
		default: {},
	},
	profileCompleted: {
		type: Boolean,
		default: false,
	},
	balance: {
		type: Number,
		default: 3,
	},
	avatar: {
		type: Buffer,
	},
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

/////// A method for preventing uneccessary data to be sent back to client /////////
userSchema.methods.toJSON = function () {
	const userObject = this.toObject();
	delete userObject.password;
	delete userObject.avatar;
	let expObj = [...userObject.experience.entries()].reduce(
		(expObj, [key, value]) => ((expObj[key] = value), expObj),
		{},
	);
	userObject.experience = expObj;

	return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
