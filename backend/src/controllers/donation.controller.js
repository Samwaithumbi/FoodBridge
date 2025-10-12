
const Donations = require('../models/donation.model')

//create new donation

const createDonation=async(req, res)=>{
try {
    const {title, description, image, location, expiryDate }= req.body

    const donation = await Donations.create({
        title,
      description,
      image,
      location,
      expiryDate,
      donor: req.user._id
    })
    res.status(201).json({success:true, donation})
} catch (error) {
    res.status(400).json({message:error.message})
}
}


//get all donations
const getDonations = async(req, res)=>{
try {
    const donations = await Donations.find()
    res.status(200).json({donations})
} catch (error) {
    res.status(400).json({message:error.message})
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

//update a donation
const updateDonation = async(req, res)=>{
  try {
    const donation = await Donations.findById(req.params.id)

    if(!donation) return res.status(404).json({message:'Donation not found', err:error.message})

    if(donation.donor.toString() !== req.user._id.toString() &&req.user.role !== 'admin'){
      return res.status(403).json({message:'Access denied'})
  }
    const updatedDonation = await Donations.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
res.json({success: true, donation: updatedDonation})
  } catch (error) {
    res.status(400).json({message:error.message})
  }
}

//deleting a donation
const deleteDonation = async(req, res)=>{
  try {
    const donation = await Donations.findById(req.params.id)

    if(!donation) {
        return res.status(404).json({message:'Donation not found'})
    }
    if(donation.donor.toString() !== req.user._id.toString() &&req.user._idrole !== 'admin'){
        return res.status(403).json({message:'Access denied'})
    }

    await Donations.deleteOne()
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

module.exports={createDonation, getDonations, getOneDonation, updateDonation, deleteDonation}