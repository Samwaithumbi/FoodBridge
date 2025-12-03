const Requests = require("../models/requests.model");
const Donation = require("../models/donation.model");


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

const approveRequest = async (req, res) => {
  try {
    const request = await Requests.findById(req.params.id);

    if (!request)
      return res.status(404).json({ message: "Request not found" });

    request.reqStatus = "Approved";
    await request.save();

   

    res.status(200).json({
      message: "Request approved",
      request
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//reject donation
const rejectRequest = async (req, res) => {
  try {
    const request = await Requests.findById(req.params.id);

    if (!request)
      return res.status(404).json({ message: "Request not found" });

    request.reqStatus = "Rejected";
    await request.save();

    res.status(200).json({
      message: "Request rejected",
      request
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
