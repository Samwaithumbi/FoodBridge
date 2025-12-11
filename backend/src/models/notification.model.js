const mongoose = require("mongoose")

//notification schema
const notificationSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title:{
    type: String,
    required: true
  },
  message:{
    type: String,
    required: true
  },
  type:{
    type: String,
    enum: ["Donation", "Request", "System"],
    required: true
  },
  relatedId:{
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  isRead:{
    type:Boolean,
    default: false
  }
},{timestamps: true})

const Notifications = mongoose.model("Notifications", notificationSchema)

module.exports = Notifications