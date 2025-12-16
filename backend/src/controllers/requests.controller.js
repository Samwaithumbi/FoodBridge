const mongoose = require("mongoose");
const Requests = require("../models/requests.model");
const Donations = require("../models/donation.model");
const Notifications = require("../models/notification.model");

/**
 * CREATE REQUEST
 * Beneficiary → Donor
 */
const createRequest = async (req, res, next) => {
  try {
    const { donationId, message } = req.body;
    const beneficiaryId = req.user._id;

    const donation = await Donations.findById(donationId);
    if (!donation)
      return res.status(404).json({ message: "Donation not found" });

    // ❌ Block if donation already requested
    if (donation.request) {
      return res
        .status(400)
        .json({ message: "This donation already has a pending request." });
    }

    // ❌ Block if donation not available
    if (donation.donationStatus !== "Available") {
      return res
        .status(400)
        .json({ message: "This donation is not available for requests." });
    }

    const newRequest = await Requests.create({
      donor: donation.donor,
      beneficiary: beneficiaryId,
      donation: donationId,
      message,
      reqStatus: "Pending",
    });

    // ✅ Correct linking
    donation.request = newRequest._id;
    donation.donationStatus = "Assigned";
    await donation.save();

    // 🔔 Notify donor
    await Notifications.create({
      user: donation.donor,
      title: "Donation Requested",
      message: "A beneficiary has requested your donation.",
      type: "Donation",
      relatedId: donation._id,
      isRead: false,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error("CREATE REQUEST ERROR:", error);
    next(error);
  }
};


/**
 * GET ALL REQUESTS (ADMIN)
 */
const getPendingRequests = async (req, res) => {
  try {
    const requests = await Requests.find()
      .populate("donor", "name email location")
      .populate("beneficiary", "name email location")
      .populate("donation", "title quantity location expiryDate donationStatus");

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET REQUEST BY ID
 */
const getRequestById = async (req, res) => {
  try {
    const request = await Requests.findById(req.params.id)
      .populate("donor", "name email")
      .populate("beneficiary", "name email")
      .populate("donation", "title quantity location expiryDate donationStatus");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * APPROVE REQUEST (ADMIN)
 */
const approveRequest = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const request = await Requests.findById(req.params.id)
      .populate("beneficiary", "_id")
      .populate({
        path: "donation",
        populate: { path: "donor", select: "_id" }
      })
      .session(session);

    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.reqStatus === "Approved") return res.status(400).json({ message: "Already approved" });

    // 1. Approve request
    request.reqStatus = "Approved";
    await request.save({ session });

    // 2. Update donation
    request.donation.donationStatus = "Assigned"; // Assigned to this beneficiary
    await request.donation.save({ session });

    // 🔔 Beneficiary: Request approved
    await Notifications.create([{
      user: request.beneficiary._id,
      title: "Request Approved",
      message: "Your food request has been approved.",
      type: "Request",
      relatedId: request._id
    }], { session });

    // 🔔 Donor: Donation assigned
    await Notifications.create([{
      user: request.donation.donor._id,
      title: "Donation Assigned",
      message: "Your donation has been assigned to a beneficiary.",
      type: "Donation",
      relatedId: request.donation._id
    }], { session });

    await session.commitTransaction();
    res.status(200).json(request);

  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};


/**
 * REJECT REQUEST
 */
const rejectRequest = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const request = await Requests.findById(req.params.id)
      .populate("beneficiary", "_id")
      .populate({
        path: "donation",
        populate: { path: "donor", select: "_id" }
      })
      .session(session);

    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.reqStatus === "Rejected") return res.status(400).json({ message: "Already rejected" });

    // 1. Reject request
    request.reqStatus = "Rejected";
    await request.save({ session });

    // 2. Reset donation
    request.donation.donationStatus = "Available";
    request.donation.request = null;
    await request.donation.save({ session });

    // 🔔 Beneficiary: Request rejected
    await Notifications.create([{
      user: request.beneficiary._id,
      title: "Request Rejected",
      message: "Your food request has been rejected.",
      type: "Request",
      relatedId: request._id
    }], { session });

    // 🔔 Donor: Donation now available
    await Notifications.create([{
      user: request.donation.donor._id,
      title: "Donation Available",
      message: "Your donation is now available for requests again.",
      type: "Donation",
      relatedId: request.donation._id
    }], { session });

    await session.commitTransaction();
    res.status(200).json({ message: "Request rejected" });

  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

// update request
const updateRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { reqStatus } = req.body;

    if (!reqStatus) {
      return res.status(400).json({ message: "reqStatus is required" });
    }

    const updatedRequest = await Requests.findByIdAndUpdate(
      requestId,
      { reqStatus },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Updated", updatedRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE REQUEST
 */
const deleteRequest = async (req, res) => {
  try {
    const request = await Requests.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    await Requests.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Request deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRequest,
  getPendingRequests,
  getRequestById,
  approveRequest,
  rejectRequest,
  updateRequest,
  deleteRequest
};
