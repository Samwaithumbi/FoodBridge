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
   donor:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"donor",
   required: true
   },
   reqStatus:{
      type:String,
     enum: ["Pending", "Approved", "Rejected", "Delivered"],
     
   },
   message:{
      type: String,
      default:""
   }
},{timestamps: true})

requestSchema.index({ donation: 1, beneficiary: 1 }, { unique: true });

const Requests = mongoose.model("Requests", requestSchema)

module.exports = Requests