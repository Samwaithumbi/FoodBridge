const User = require('../models/auth.model')
const generateToken = require('../utils/generateToken')

//register new user
const registerUser = async(req, res,next)=>{
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
        res.status(201).json({message:"User Created Successfully"})
       
    } catch (error) {
        next(error)
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
        res.status(200).json({message:"User loggged in", user})
    } catch (error) {
        next(error)
    }
}



module.exports={registerUser, loginUser}