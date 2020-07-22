const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
	status: {
		type: String,
		enum: ["new", "seen", "dismissed"],
		default: "new",
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	snippet: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Snippet",
	},
	event: {
		type: String,
		required: true,
	},
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
