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
router.post("/notifications/:notif_id", auth, async (req, res) => {
	const notification = await Notification.findById(req.params.notif_id);
	notification.status = req.body.status;
	await notification.save();
});

/////// For test: Store notifications in db ///////
router.post("/notifications/create/:snippet_id", auth, async (req, res) => {
	const notification = new Notification({
		user: req.user.id,
		snippet: req.params.snippet_id,
		event: req.body.event,
	});

	await notification.save();
	res.send(notification);
});

module.exports = router;
