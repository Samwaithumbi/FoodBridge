const  Request = require("../models/requests.model")
const Donation = require("../models/donation.model")

//beneficiary requesting donation
const createRequest = async (req, res) => {
  try {
    const { donationId, message } = req.body;
    const beneficiaryId = req.user._id;

    const donation = await Donation.findById(donationId);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    const request = await Request.findOne({
      donation: donationId,
      beneficiary: beneficiaryId,
  })
    if(request){
     return res.status(400).json({message:"You have already requested this donation."})
    }
    const newRequest = await Request.create({
      beneficiary: beneficiaryId,
      donation: donationId,
      donor:donation.donor,
      message,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Duplicate request detected." });
    }
    res.status(500).json({ message: error.message });
  }
};

const getPendingRequests = async(req, res)=>{
  try {
    const pendingRequests = await Request.find()
    res.status(200).json(pendingRequests)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

   module.exports={createRequest, getPendingRequests}