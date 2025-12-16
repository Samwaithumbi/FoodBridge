const mongoose = require("mongoose")
const User = require('../models/auth.model');
const Donation = require('../models/donation.model');
const Notifications = require('../models/notification.model');

/**
 * GET ALL USERS (with optional search & role filter)
 */
const getUsers = async (req, res, next) => {
  try {
    const { q, role } = req.query;
    const filter = {};

    if (q) {
      filter.$or = [
        { name: new RegExp(q, "i") },
        { email: new RegExp(q, "i") }
      ];
    }

    if (role && role.trim() !== "") {
      filter.role = role;
    }

    const users = await User.find(filter)
      .select("-password")
      .lean();

    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

/**
 * GET SINGLE USER BY ID
 */
const getSingleUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password").lean();

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE USER DETAILS
 */
const updateUserDetails = async (req, res, next) => {
  try {
    const { name, email, role, phone, location } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, location, role },
      { new: true }
    ).select("-password").lean();

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE USER
 */
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

/**
 * GET DONATIONS (Admin)
 */
const getDonationsAdmin = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const q = req.query.q || "";
    const filter = {};

    if (q) {
      filter.$or = [
        { title: new RegExp(q, "i") },
        { description: new RegExp(q, "i") }
      ];
    }

    const donations = await Donation.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("donor", "name email")
      .sort({ createdAt: -1 })
      .lean();

    const total = await Donation.countDocuments(filter);

    res.status(200).json({
      donations,
      total,
      page,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET DONATION BY ID
 */
const getDonationById = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id)
      .populate("donor", "name email")
      .lean();

    if (!donation) return res.status(404).json({ message: "Donation not found" });

    res.status(200).json({ donation });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE DONATION
 */
const deleteDonationAdmin = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    await donation.deleteOne();
    res.status(200).json({ message: "Donation removed" });
  } catch (error) {
    next(error);
  }
};

/**
 * APPROVE DONATION
 */
const approveDonation = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 1. Validation: Prevent CastError if id is "undefined" or malformed
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid or missing Donation ID" });
    }

    const donation = await Donation.findById(id).populate("donor", "name");
    
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // 2. State Check
    if (donation.donationStatus === "Available") {
      return res.status(400).json({ message: "Donation already approved" });
    }

    // 3. Update Status
    donation.donationStatus = "Available";
    await donation.save();

    // 4. Notification Logic
    const exists = await Notifications.findOne({
      user: donation.donor._id,
      type: "Donation",
      relatedId: donation._id
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

    res.status(200).json({ message: "Donation approved", donation });
  } catch (error) {
    console.error("Error in approveDonation:", error);
    next(error); 
  }
};

/**
 * REJECT DONATION
 */
const rejectDonation = async (req, res, next) => {
  try {

    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid or missing Donation ID" });
    }

    const donation = await Donation.findById(id).populate("donor", "name");
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    donation.donationStatus = "Rejected";
    await donation.save();

    const exists = await Notifications.findOne({
      user: donation.donor._id,
      type: "Donation",
      relatedId: donation._id
    });

    if (!exists) {
      await Notifications.create({
        user: donation.donor._id,
        title: "Donation Rejected",
        message: `Your donation "${donation.title}" has been rejected.`,
        type: "Donation",
        relatedId: donation._id
      });
    }

    res.status(200).json({ message: "Donation rejected", donation });
  } catch (error) {
    next(error);
  }
};

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
};
