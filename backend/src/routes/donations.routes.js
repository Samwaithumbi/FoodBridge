const Router = require('express')
const {getDonations, createDonation,  updateDonation, deleteDonation, getOneDonation} = require('../controllers/donation.controller')
const router = Router()
const { protect, authorize } = require("../middleware/auth.middleware");

router.post('/create', protect, authorize('donor'), createDonation)
router.get('/', getDonations)
router.get('/:id', protect, authorize('donor', 'admin'),  getOneDonation)
router.put('/:id', protect, authorize('donor', 'admin'),  updateDonation)
router.delete('/:id', protect, authorize('donor', 'admin') , deleteDonation)


module.exports=router