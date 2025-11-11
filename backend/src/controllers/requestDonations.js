const  Request = require("../models/requests.model")
const Donation = require("../models/donation.model")

//beneficiary requesting donation
const createRequest = async (req, res) => {
  try {
    const { donationId, message } = req.body;
    const beneficiaryId = req.user._id;

    const donation = await Donation.findById(donationId);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    const newRequest = await Request.create({
      beneficiary: beneficiaryId,
      donation: donationId,
      message,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

   module.exports={createRequest}