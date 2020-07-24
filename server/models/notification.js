const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ["new", "seen", "dismissed"],
    default: "new",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
