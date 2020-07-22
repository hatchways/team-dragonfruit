const Notification = require("../models/notification");

const event = async ({ user, snippet, event }) => {
  try {
    const noti = new Notification({
      user,
      snippet,
      event,
    });

    await noti.save();
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { event };
