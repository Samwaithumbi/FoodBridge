const User = require('../models/auth.model') 
const Donation = require('../models/donation.model')
const Notifications = require('../models/notification.model')
 
 //getting all users
 const getUsers = async (req, res) => {
  try {
    const { q, role } = req.query;
    const filter = {};

    if (q) {
      filter.$or = [
        { name: new RegExp(q, "i") },
        { email: new RegExp(q, "i") }
      ];
    }

    // ROLE FILTER
    if (role && role.trim() !== "") {
      filter.role = role;
    }

    const users = await User.find(filter).select("-password");

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  
  //get user by id
  const getSingleUserById = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      next(err)
    }
  };
  
  //update user
  const updateUserDetails =async (req, res, next)=>{
    try {
      const {name,email,role,phone,location}= req.body
      
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, phone, location, role},
        { new: true }
      );
  
      res.status(200).json(updateUser);
    } catch (error) {
      next(error)
    }
  }

  //delete user
  const deleteUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      await user.deleteOne();
      res.json({ message: "User deleted" });
    } catch (err) {
      next(err);
    }
  };
  
  //get donations
  const getDonationsAdmin = async (req, res, next) => {
    try {
      const { page = 1, limit = 50, q } = req.query;
      const filter = {};
      if (q) filter.$or = [{ title: new RegExp(q, "i") }, { description: new RegExp(q, "i") }];
  
      const donations = await Donation.find(filter)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate("donor", "name email")
        .sort({ createdAt: -1 });
  
      const total = await Donation.countDocuments(filter);
      res.json({ donations, total, page: parseInt(page), pages: Math.ceil(total / limit) });
    } catch (err) {
      next(err);
    }
  };
  //get donation by id
  const getDonationById= async (req, res, next) => {
    try {
      const donation = await Donation.findById(req.params.id);
  
      if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
      }
  
      res.status(200).json(donation);
    } catch (error) {
      next(err)
    }
  };
  
  //delete donation
  const deleteDonationAdmin = async (req, res, next) => {
    try {
      const donation = await Donation.findById(req.params.id);
      if (!donation) return res.status(404).json({ message: "Donation not found" });
  
      await donation.deleteOne();
      res.json({ message: "Donation removed" });
    } catch (err) {
      next(err);
    }
  };
  
  //approve donation
  const approveDonation = async (req, res) => {
    try {
      const donation = await Donation.findById(req.params.id).populate("donor", "name");
  
      if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
      }
  
      // If already approved
      if (donation.donationStatus === "Approved") {
        return res.status(400).json({ message: "Donation already approved" });
      }
  
      // Set approved
      donation.donationStatus = "Approved";
      await donation.save();
  
      // Check duplicate notification
      const exists = await Notifications.findOne({
        user: donation.donor._id,
        type: "Donation",
        relatedId: donation._id,
      });
  
      if (!exists) {
        await Notifications.create({
          user: donation.donor._id,
          title: "Donation Approved",
          message: `Your donation "${donation.title}" has been approved.`,
          type: "Donation",
          relatedId: donation._id
        });
      }
  
      res.status(200).json({
        message: "Donation approved",
        donation
      });
  
    } catch (err) {
      console.error("Approve donation error:", err);
      res.status(500).json({ message: err.message });
    }
  };
  
  

//reject donation
    const rejectDonation= async (req, res, next)=>{
      try {
        const donation = await Donation.findById(req.params.id);
        if (!donation) return res.status(404).json({ message: "Donation not found" });
    
        donation.donationStatus = "Rejected";
        await donation.save();

        const exists = await Notifications.findOne({
          user: donation.donor._id,
          type: "Donation",
          relatedId: donation._id,
        });
    
        if (!exists) {
          await Notifications.create({
            user: donation.donor._id,
            title: "Donation Rejected",
            message: `Your donation "${donation.title}" has been Rejected.`,
            type: "Donation",
            relatedId: donation._id,
          });
        }

        res.json({ message: "Donation rejected", donation });
      } catch (err) {
        next(err);
      }
    }

  module.exports = {
    getUsers,
    getSingleUserById,
  updateUserDetails,
    deleteUser,
    getDonationsAdmin,
    getDonationById,
    deleteDonationAdmin,
    approveDonation,
    rejectDonation
  }