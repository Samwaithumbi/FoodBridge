const Router = require('express')
const {registerUser, loginUser, myProfile, editProfile} = require('../controllers/auth.controller')
const router = Router()
const User = require('../models/auth.model')
const {protect, authorize}= require('../middleware/auth.middleware')
const upload = require('../middleware/upload.middleware')

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get("/myprofile", protect, myProfile);
router.put("/edit-profile/:id",protect ,  upload.single("profilePic"), editProfile)

  
  // Get all users (admin only)
  router.get("/", protect, authorize("admin"), async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
  });

module.exports = router