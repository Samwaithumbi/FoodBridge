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
        default: "https://placehold.co/400x300", // fallback image
      },
      location: {
        type: String,
        required: [true, "Please provide a location"]
      },
      expiryDate: {
        type: Date,
        required: [true, "Please provide an expiry date"]
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