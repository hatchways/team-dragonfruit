const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
	code: {
		type: Array,
		required: true,
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
		default: "Unknown",
	},
	language: {
		type: String,
		required: true,
	},
});

const Snippet = mongoose.model("Snippet", snippetSchema);
module.exports = Snippet;
