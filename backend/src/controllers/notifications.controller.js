const Notifications = require("../models/notification.model")


const getNotificatons = async (req, res, next) => {
   try {
     const userId = req.user.id || req.user._id || req.user;
 
     const notifications = await Notifications.find({ user: userId });
 
     res.status(200).json({ notifications });
   } catch (error) {
     next(error);
   }
 };
 

const getMyNotifications = async (req, res, next) => {
   try {
     console.log("REQ.USER:", req.user);
 
     const userId = req.user.id || req.user._id || req.user;
 
     const notifications = await Notifications
       .find({ user: userId })
       .sort({ createdAt: -1 });
 
     res.status(200).json({ notifications });
   } catch (error) {
     console.log(error);
     next(error);
   }
 };
 


 const markAllAsRead = async (req, res, next) => {
   try {
     const userId = req.user.id || req.user._id || req.user;
 
     await Notifications.updateMany(
       { user: userId, isRead: false },
       { isRead: true }
     );
 
     res.json({ message: "All notifications marked as read" });
   } catch (error) {
     next(error);
   }
 };
 

module.exports = {getNotificatons, getMyNotifications, markAllAsRead}