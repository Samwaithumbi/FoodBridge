const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require: [true, 'Username is required'],
        trim: true,
        minlength:3,
        maxlength:30,
    },
     email:{
        type:String,
        require:  [true, 'Email is required'],
        unique:true,
        lowercase: true,
        match:[/\S+@\S+\.\S+/, "Please enter a valid email"],
    },
    password:{
        type:String,
        require: [true, 'Password is required'],
        minlength:6 ,
    },
    role:{
        type:String,
        require: true,
        enum:['donor', 'beneficiary', 'admin'],
        default:'donor'
    },
    phone:{
      type: String,
      required: true
    },
    location:{
        type:String,
        require: true,
        trim: true
    },
    profilePic:{
        type:String
    }
}, {timestamps:true})

//hashing password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//comparing entered password and hashed password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


const User = mongoose.model('User', userSchema)

module.exports=User