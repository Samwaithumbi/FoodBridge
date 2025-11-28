const Router = require("express")
const {createRequest, getPendingRequests, updateRequest, getRequestById, approveRequest, rejectRequest, deleteRequest} = require('../controllers/requests.controller')
const { protect } = require("../middleware/auth.middleware")

const router=Router()

router.post('/create', protect, createRequest)
router.get('/pending-requests', getPendingRequests)
router.get('/:id', getRequestById)
router.put("/update/:id", updateRequest)
router.patch("/:id/approve", approveRequest)
router.patch("/:id/reject", rejectRequest)
router.delete("/:id/delete", deleteRequest)


module.exports = router