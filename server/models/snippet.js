const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
	code: {
		type: Array,
		required: true,
	},
	status: {
		type: String,
		enum: ["pending", "requested", "in-review", "completed"],
		default: "pending",
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	reviewer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	title: {
		type: String,
		required: true,
	},
	language: {
		type: String,
		required: true,
	},
	comments: {
		type: String,
	},
	rating: {
		type: Number,
		min: 0,
		max: 5,
	},
	date_requested: {
		type: Date,
		required: true,
		default: Date.now,
	},
	date_submitted: {
		type: Date,
	},
	date_accepted: {
		type: Date,
	},
});

const Snippet = mongoose.model("Snippet", snippetSchema);
module.exports = Snippet;
