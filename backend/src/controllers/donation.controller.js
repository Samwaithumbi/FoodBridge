
const Donations = require('../models/donation.model')

//create new donation
const createDonation = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File received:", req.file);

    const donation = await Donations.create({
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.path : null,
      location: req.body.location,
      expiryDate: req.body.expiryDate,
      donor: req.user._id,
    });

    res.status(201).json({ success: true, donation });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//get donor donations
const getMyDonations= async(req, res)=>{
  try{
    const donations = await Donations.find({ donor: req.user._id})
    res.status(200).json(donations)
  }catch(error){
    res.status(500).json({message:"Error fetching donations", error:error.message})
  }
}


//get all donations
const getDonations = async(req, res)=>{
try {
    const donations = await Donations.find()
    res.status(200).json({donations})
} catch (error) {
    res.status(400).json({error:error.message})
}
}

//get donation by id
const getOneDonation = async (req, res)=>{
    try {
       
        const donation = await Donations.findById(req.params.id)

        if(!donation) return res.status(404).json({message:'Donation not found'})
       
        if(donation.donor.toString() !== req.user._id.toString() &&req.user.role !== 'admin'){
          return res.status(403).json({message:'Access denied'})
      }
       res.status(200).json({donation})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}


// Update Donation
const updateDonation = async (req, res) => {
  try {
    const donor = req.user._id;

    if (!donor) {
      return res.status(400).json({ message: "Donor required" });
    }

    const donation = await Donations.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    // Ensure only the donor who created it can update
    if (donation.donor.toString() === req.user._id.toString() && req.user.role === 'donor') {
      const updatedDonation = await Donations.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({ success: true, donation: updatedDonation });
    } else {
      res.status(403).json({ message: 'Access denied' });
    }

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Donation
const deleteDonation = async (req, res) => {
  try {
    const donation = await Donations.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: 'Donation not found' });

    if (donation.donor.toString() === req.user._id.toString() && req.user.role === 'donor' || 'admin') {
      await Donations.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Donation deleted successfully' });
    } else {
      res.status(403).json({ message: 'Access denied' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={createDonation, getDonations,getMyDonations, getOneDonation, updateDonation, deleteDonation}