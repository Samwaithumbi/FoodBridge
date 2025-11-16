const User = require('../models/auth.model')
const generateToken = require('../utils/generateToken')

//register new user
const registerUser = async(req, res)=>{
    const {name, email, password, role}=req.body
    try {
        //check if user exists
        const userExists = await User.findOne({email})
        if(userExists){
           return res.status(400).json({message:'User already exists login to continue'})
        }else{
            //create new user
            const user = await User.create({name, email, password, role})
            res.status(201).json({
                message:'User created successfully',
                _id: user.id,
                name: user.name,
                email: user.email,
                role:user.role,
                token: generateToken(user.id),
            })
        }
       
    } catch (error) {
        res.status(500).json({message:'Error creating new user', error:error.message})
    }

}

//login user
const loginUser=async(req, res)=>{
    
    try {
        const {email, password}=req.body
        const user = await User.findOne({email})
        if (user &&(await user.matchPassword(password))) {
            res.status(200).json({
                message:'Logged in successfully',
                _id: user.id,
                name: user.name,
                email: user.email,
                role:user.role,
                token: generateToken(user.id),
            })
        }else{
            res.status(401).json({message:'Inalid email or password'})
        }
    } catch (error) {
        res.status(500).json({message:'error logging in', error})
    }
}


//user profile/data
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
  
  //getting all users
  const getAllUsers = async(req, res)=>{
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error.message)
    }
  } 
  const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  



module.exports={registerUser, loginUser,getAllUsers,getUserById, myProfile, editProfile}