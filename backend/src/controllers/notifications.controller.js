const Notifications = require("../models/notification.model");

/**
 * GET MY NOTIFICATIONS
 */
const getMyNotifications = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notifications = await Notifications.find({
      user: req.user._id
    })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ notifications });
  } catch (error) {
    next(error);
  }
};

/**
 * MARK ALL AS READ
 */
const markAllAsRead = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Notifications.updateMany(
      { user: req.user._id, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: "All notifications marked as read" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyNotifications,
  markAllAsRead
};
