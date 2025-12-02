const Router = require('express')
const upload = require('../config/multer')
const {getMyDonations, createDonation,  updateDonation, deleteDonation, getOneDonation, requestDonation, getAllDonations, getAvailableDonations} = require('../controllers/donation.controller')
const router = Router()
const { protect} = require("../middleware/auth.middleware");
const {authorize} = require('../middleware/role.middleware')



router.post("/create", protect, upload.single("image"), createDonation);
router.get('/all-donations', getAllDonations)
router.get('/available', getAvailableDonations)
router.get('/my-donations',protect, getMyDonations)
router.get('/:id', protect, authorize('Donor', 'Admin'),  getOneDonation)
router.put('/:id', protect, authorize('Donor', 'Admin'),  updateDonation)
router.delete('/:id', protect, authorize('Donor', 'Admin') , deleteDonation)



module.exports=router