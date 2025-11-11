const mongoose = require('mongoose')

const requestSchema =new mongoose.Schema({
   beneficiary:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user",
      required:true
   },
   donation:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Donations",
    required:true
   },
   reqStatus:{
      type:String,
     enum: ["Pending", "Approved", "Rejected", "Delivered"],
     
   },
   message:{
      type: String,
      default:""
   }
})

const Requests = mongoose.model("Requests", requestSchema)

module.exports = Requests