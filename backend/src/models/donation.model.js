const mongoose = require('mongoose')

//donation schema
const donationSchema = new mongoose.Schema({
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requests"
    },
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
      donationStatus: { 
        type: String,
        enum: ["Pending","Available","Approved", "Claimed","Rejected","Completed","Expired"],
        default: "Pending"
      },      
}, {timestamps: true})

donationSchema.index({ expiryDate: 1 });
donationSchema.index({ status: 1 });


const Donations = mongoose.model('Donations', donationSchema)

module.exports=Donations