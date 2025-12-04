const User = require('../models/auth.model')

//user profile
const myProfile = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone:user.phone,
      location:user.location,
      
    });
    
  } catch (error) {
    next(error);
  }
};

const editProfile = async (req, res) => {
  try {
    const { name, email, phone, location, role } = req.body;
    let profilePic = req.body.profilePic;

    // If image uploaded, push to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "user_profiles",
      });
      profilePic = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,   // USE LOGGED-IN USER ID
      { name, email, phone, location, role, profilePic },
      { new: true }
    );

    return res.status(200).json(user);

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: error.message });
  }
};



  module.exports = {myProfile, editProfile}