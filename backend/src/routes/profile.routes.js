const Router = require('express');
const { myProfile, editProfile } = require('../controllers/profile.controller');
const {protect} = require('../middleware/auth.middleware')
const router = Router()

router.get("/myprofile", protect, myProfile);
router.patch("/edit/:id",protect , editProfile)

module.exports = router