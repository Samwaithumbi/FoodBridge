const Router = require("express")
const {createRequest, getPendingRequests} = require('../controllers/requestDonations')
const { protect } = require("../middleware/auth.middleware")

const router=Router()

router.post('/requests', protect, createRequest)
router.get('/pending-requests', getPendingRequests)

module.exports = router