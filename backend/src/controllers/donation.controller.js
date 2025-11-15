const Donations = require("../models/donation.model");

// Create new donation
const createDonation = async (req, res) => {
  try {
    console.log("📝 === CREATE DONATION START ===");
    console.log("User:", req.user?._id);
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { title, description, location, expiryDate, quantity, image } = req.body;

    // 1. Validate required fields
    if (!title || !description || !location || !expiryDate || !quantity) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.user || !req.user._id) {
      console.log("❌ User not authenticated");
      return res.status(401).json({ message: "User not authenticated" });
    }

    // 2. Validate quantity
    if (quantity <= 0) {
      console.log("❌ Invalid quantity");
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

    console.log("✅ All validations passed");
    console.log("🔄 Creating donation in database...");

    // 4. Create donation
    const donation = await Donations.create({
      title,
      description,
      location,
      expiryDate: chosenDate,
      quantity,
      donor: req.user._id,
      image: req.file?.path || image || null,
    });

    console.log("✅ Donation created successfully!");
    console.log("   ID:", donation._id);
    console.log("   Image URL:", donation.image);
    console.log("📝 === CREATE DONATION END ===");

    res.status(201).json({ success: true, donation });
  } catch (error) {
    console.error("❌ === CREATE DONATION ERROR ===");
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// Get donor donations
const getMyDonations = async (req, res) => {
  try {
    const donations = await Donations.find({ donor: req.user._id });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations", error: error.message });
  }
};

// Get all donations
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donations.find();
    res.status(200).json({ donations });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get available donations
const getAvailableDonations = async (req, res) => {
  try {
    const today = new Date();
    const donations = await Donations.find({ expiryDate: { $gt: today } });
    res.status(200).json({ donations });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get donation by id
const getOneDonation = async (req, res) => {
  try {
    const donation = await Donations.findById(req.params.id);

    if (!donation) return res.status(404).json({ message: "Donation not found" });

    if (donation.donor.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ donation });
  } catch (error) {
    res.status(500).json({ message: error.message });
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