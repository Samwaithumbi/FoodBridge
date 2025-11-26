const Router = require('express')
const { getUsers,getSingleUserById, deleteUser, getDonationsAdmin,getDonationById, approveDonation, rejectDonation, deleteDonationAdmin, updateUserDetails } = require('../controllers/admin.controller')
const { protect } = require('../middleware/auth.middleware')
const {authorize} =require('../middleware/role.middleware')
const router = Router()

router.use(protect, authorize("admin"))

router.get('/users', getUsers)
router.get('/users/:id', getSingleUserById)
router.patch('/users/:id', updateUserDetails)
router.delete('/users/:id', deleteUser)

router.get('/donations', getDonationsAdmin)
router.get('/donations/:id', getDonationById)
router.delete('/donations/:id', deleteDonationAdmin)
router.patch('/donations/:id/approve', approveDonation)
router.patch('/donations/:id/reject', rejectDonation)


module.exports=router