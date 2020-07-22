const express = require("express");

const auth = require("../middleware/auth");
const Snippet = require("../models/snippet");
const User = require("../models/user");
const Notification = require("../models/notification");

const router = express.Router();

/////// Fetch New and Seen notification on dashboard loading ///////
router.get("/notifications", auth, async (req, res) => {
	const notificationsNew = await Notification.find({
		user: req.user._id,
		status: "new",
	});
	const notificationsSeen = await Notification.find({
		user: req.user._id,
		status: "seen",
	});

	const notifications = {
		new: notificationsNew,
		seen: notificationsSeen,
	};
	res.send(notifications);
});

/////// Change status of a notification ///////
router.post("/notifications/:notif_id", async (req, res) => {
	const notification = await Notification.findById(notif_id);
	notification.status = req.body.status;
	await notification.save();
});

module.exports = router;
