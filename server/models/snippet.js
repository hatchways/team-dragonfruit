const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
});

const Snippet = mongoose.model("Snippet", snippetSchema);
module.exports = Snippet;
