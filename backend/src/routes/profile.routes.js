const Router = require('express');
const { myProfile, editProfile } = require('../controllers/profile.controller');
const {protect} = require('../middleware/auth.middleware')
const upload = require("../config/multer")
const router = Router()

router.get("/myprofile", protect, myProfile);
router.patch("/edit/",  upload.single("profilePic"),protect , editProfile)

module.exports = router