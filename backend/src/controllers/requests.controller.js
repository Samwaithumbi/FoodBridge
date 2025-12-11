const Requests = require("../models/requests.model");
const Donation = require("../models/donation.model");
const Notifications = require("../models/notification.model")

// Create request
const createRequest = async (req, res, next) => { 
  try {
    const { donationId, message } = req.body;
    const beneficiaryId = req.user._id;

    const donation = await Donation.findById(donationId);
    if (!donation)
      return res.status(404).json({ message: "Donation not found" });

    const existing = await Requests.findOne({
      donation: donationId,
      beneficiary: beneficiaryId,
    });

    if (existing) {
      return res.status(400).json({ message: "You have already requested this donation." });
    }

    const newRequest = await Requests.create({
      donor: donation.donor,
      beneficiary: beneficiaryId,
      donation: donationId, 
      message,
      reqStatus: "Pending",
    });

    // Correct ID usage here
    await Donation.findByIdAndUpdate(donationId, {
      request: newRequest._id
    });

    res.status(201).json(newRequest);
  } catch (error) {
    next(error);
  }
};


// get all requests (admin)
const getPendingRequests = async (req, res) => {
  try {
    const requests = await Requests.find()
      .populate("donor", "name email location")
      .populate("beneficiary", "name email location")
      .populate("donation", "title quantity location expiryDate, request")

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get requesting by ID
const getRequestById = async (req, res) => {
  try {
    const request = await Requests.findById(req.params.id)
      .populate("donor", "name email location")
      .populate("beneficiary", "name email location")
      .populate("donation", "title quantity location expiryDate")
  

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

//approvin request
const approveRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    // 1. Find request
    const request = await Requests.findById(id).populate("donor");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // 2. Prevent double approval
    if (request.reqStatus === "Approved") {
      return res.status(400).json({ message: "Request already approved" });
    }

    // 3. Approve request
    request.reqStatus = "Approved";
    await request.save();

    // 4. Check for existing notification
    const exists = await Notifications.findOne({
      type: "Request",
      relatedId: id,
    });

    // 5. Create notification if not exists
    if (!exists) {
      await Notifications.create({
        user: request.donor._id,
        title: "Request Approved",
        message: `Your request has been approved by the admin.`,
        type: "Request",
        relatedId: id,
      });
    }

    res.status(200).json({
      message: "Request approved successfully",
      request,
    });
  } catch (error) {
    console.log("Approve error:", error);
    next(error);
  }
};

//rejecting request
const rejectRequest = async (req, res) => {
  try {
    const request = await Requests.findById(req.params.id).populate("donor");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Prevent double rejection
    if (request.reqStatus === "Rejected") {
      return res.status(400).json({ message: "Request is already rejected" });
    }

    // Update status
    request.reqStatus = "Rejected";
    await request.save();

    // Check if notification exists
    const existingNotification = await Notifications.findOne({
      type: "Request",
      relatedId: request._id
    });

    if (!existingNotification) {
      await Notifications.create({
        user: request.donor._id,                   // The donor receives the rejection notice
        title: "Request Rejected",
        message: `Your request has been rejected by the admin.`,
        type: "Request",                           // Correct enum
        relatedId: request._id
      });
    }

    res.status(200).json({
      message: "Request rejected",
      request
    });

  } catch (error) {
    console.log("Reject error:", error);
    res.status(500).json({ message: error.message });
  }
};

//deleting request
const deleteRequest = async (req, res) => {
  try {
    const id = req.params.id;

    const request = await Requests.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    await Requests.findByIdAndDelete(id);

    res.status(200).json({ message: "Request deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = {
  createRequest,
  getPendingRequests,
  getRequestById,
  updateRequest,
  approveRequest,
  rejectRequest,
  deleteRequest
};
