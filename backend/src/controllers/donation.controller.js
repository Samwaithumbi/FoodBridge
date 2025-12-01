const Donations = require("../models/donation.model");
const mongoose = require("mongoose");


const createDonation = async (req, res, next) => {
  try {
    const { title, description, location, expiryDate, quantity, image, donationStatus } = req.body;

    if (!title || !description || !location || !expiryDate || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than zero" });
    }

    // 3. Validate expiry date
    const chosenDate = new Date(expiryDate);
    if (isNaN(chosenDate.getTime())) {
      console.log("❌ Invalid date format");
      return res.status(400).json({ message: "Invalid expiry date" });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (chosenDate < today) {
      console.log("❌ Date in past");
      return res.status(400).json({ message: "Expiry date cannot be in the past" });
    }

    // 4. Create donation
    const donation = await Donations.create({
      title,
      description,
      location,
      expiryDate: chosenDate,
      quantity,
      donor: req.user._id,
      image: req.file?.path || image || null,
      donationStatus
    });

    console.log("✅ Donation created successfully!");
    res.status(201).json({ success: true, donation });
  } catch (error) {
    next(error)
  }
};

// Donor's  donations
const getMyDonations = async (req, res, next) => {
  try {
    const donations = await Donations.find({ donor: req.user._id });

    if (donations) {
      res.status(404).json({message:"Donations not found"})
    }
    res.status(200).json(donations);
  } catch (error) {
   next(error)
  }
};

// All  Donations
const getAllDonations = async (req, res, next) => {
  try {
    const { q, status } = req.query;
    let filter = {};

    // Search by title or description
    if (q) {
      filter.$or = [
        { title: new RegExp(q, "i") },
        { description: new RegExp(q, "i") }
      ];
    }

    //sort by status
    if (status && status.trim() !== "") {
      filter.donationStatus = status;
    }

    const donations = await Donations.find(filter).populate('donor', 'name');
    res.status(200).json({ donations });
  } catch (error) {
   next(error)
  }
};


// Get available donations
const getAvailableDonations = async (req, res) => {
  try {
    const today = new Date();

    const donations = await Donations.find({
      expiryDate: { $gt: today },
      status: "Available"
    }).populate("donor", "name email");

    res.status(200).json({ donations });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get donation by id
const getOneDonation = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid donation ID" });
    }

    const donation = await Donations.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // 3. Authorization check
    if (
      donation.donor.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ donation });

  } catch (error) {
   next(error)
  }
};

// Update Donation
const updateDonation = async (req, res) => {
  try {
    const donor = req.user._id;

    if (!donor) {
      return res.status(400).json({ message: "Donor required" });
    }

    const donation = await Donations.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    // Allow both donors AND admins to update
    if (donation.donor.toString() === req.user._id.toString() || req.user.role === "admin") {
      const updatedDonation = await Donations.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({ success: true, donation: updatedDonation });
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Donation
const deleteDonation = async (req, res) => {
  try {
    const donation = await Donations.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    // Allow deletion if user is the donor OR if user is admin
    if (donation.donor.toString() === req.user._id.toString() || req.user.role === "admin") {
      await Donations.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Donation deleted successfully" });
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDonation,
  getAllDonations,
  getAvailableDonations,
  getMyDonations,
  getOneDonation,
  updateDonation,
  deleteDonation,
};