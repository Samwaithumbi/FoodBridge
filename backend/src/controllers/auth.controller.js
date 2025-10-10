const User = require('../models/auth.model')
const generateToken = require('../utils/generateToken')

//register new user
const registerUser = async(req, res)=>{
    const {username, email, password, role, location}=req.body
    try {
        //check if user exists
        const userExists = await User.findOne({email})
        if(userExists){
           return res.status(400).json({message:'User already exists login to continue'})
        }else{
            //create new user
            const user = await User.create({username, email, password, role, location})
            res.status(201).json({
                message:'User created successfully',
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateToken(user.id),
            })
        }
       
    } catch (error) {
        res.status(400).json({message:'Error creating new user', error:error.message})
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
                username: user.username,
                email: user.email,
                token: generateToken(user.id),
            })
        }else{
            res.status(401).json({message:'Inalid email or password'})
        }
    } catch (error) {
        res.status(500).json({message:'error logging in', error})
    }
}



module.exports={registerUser, loginUser}