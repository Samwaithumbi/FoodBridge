const User = require('../models/auth.model')

//user profile
const myProfile = (req, res)=>{
    try {
        res.json(req.user)
    } catch (error) {
        res.json({mssg:"Failed to fetch user data"})
    }

}

//update profile
const editProfile = async (req, res) => {
    try {
        const { username, email, phone, location, role } = req.body;
        let profilePic = req.body.profilePic;
    
        // If image uploaded, push to Cloudinary
        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "user_profiles",
          });
          profilePic = result.secure_url;
        }
    
        const user = await User.findByIdAndUpdate(
          req.params.id,
          { username, email, phone, location, role, profilePic },
          { new: true }
        );
    
        res.status(200).json(user);
      } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: error.message });
      }
  };

  module.exports = {myProfile, editProfile}