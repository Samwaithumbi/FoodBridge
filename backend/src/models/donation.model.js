const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, 'Please enter a title for the food donation']
    },description: {
        type: String,
        required: [true, "Please provide a short description"]
      },
      image: {
        type: String,
       
      },
      location: {
        type: String,
        required: [true, "Please provide a location"]
      },
      expiryDate: {
        type: Date,
        required: [true, "Please provide an expiry date"]
      },
      quantity:{
        type: Number,
        required: [true, "Please the quantity of donation"]
      },
      status: {
        type: String,
        enum: ["available", "claimed", "expired"],
        default: "available"
      },
      donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
}, {timestamps: true})

const Donations = mongoose.model('Donations', donationSchema)

module.exports=Donations