const Router = require('express')
const upload = require('../config/multer')
const {getDonations,getMyDonations, createDonation,  updateDonation, deleteDonation, getOneDonation} = require('../controllers/donation.controller')
const router = Router()
const { protect, authorize } = require("../middleware/auth.middleware");



router.post("/create", protect, upload.single("image"), createDonation);
router.get('/all-donations', getDonations)
router.get('/my-donations',protect, getMyDonations)
router.get('/:id', protect, authorize('donor', 'admin'),  getOneDonation)
router.put('/:id', protect, authorize('donor', 'admin'),  updateDonation)
router.delete('/:id', protect, authorize('donor', 'admin') , deleteDonation)


module.exports=router