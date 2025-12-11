const Router = require("express")
const { getNotificatons, markAllAsRead, getMyNotifications } = require("../controllers/notifications.controller")
const {protect} =require("../middleware/auth.middleware")
const router = Router()


router.get("/", protect, getNotificatons)
router.get("/my-notifications",protect, getMyNotifications)
router.put("/read/all",protect, markAllAsRead)

module.exports = router