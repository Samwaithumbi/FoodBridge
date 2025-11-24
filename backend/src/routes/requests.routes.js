const Router = require("express")
const {createRequest, getPendingRequests, updateRequest} = require('../controllers/requests.controller')
const { protect } = require("../middleware/auth.middleware")

const router=Router()

router.post('/create', protect, createRequest)
router.get('/pending-requests', getPendingRequests)
router.put("/update/:id", updateRequest)

module.exports = router