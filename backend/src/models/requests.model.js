const mongoose = require('mongoose')

const requestSchema =new mongoose.Schema({
   donor:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true
      },
   beneficiary:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
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
   },
   createdAt:{
      type: Date,
      default: Date.now
   }
},{timestamps: true})

requestSchema.index({ donation: 1, beneficiary: 1 }, { unique: true });

const Requests = mongoose.model("Requests", requestSchema)

module.exports = Requests