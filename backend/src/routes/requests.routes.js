const Router = require("express")
const {createRequest} = require('../controllers/requestDonations')
const { protect } = require("../middleware/auth.middleware")

const router=Router()

router.post('/requests', protect, createRequest)

module.exports = router