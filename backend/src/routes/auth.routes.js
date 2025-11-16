const Router = require('express')
const {registerUser, loginUser, myProfile, editProfile, getAllUsers, getUserById} = require('../controllers/auth.controller')
const router = Router()
const User = require('../models/auth.model')
const {protect, authorize}= require('../middleware/auth.middleware')


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get("/myprofile", protect, myProfile);
router.put("/edit-profile/:id",protect , editProfile)
router.get("/users", getAllUsers)
router.get("/users/:id", getUserById)

  
  // Get all users (admin only)
  router.get("/", protect, authorize("admin"), async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
  });

module.exports = router