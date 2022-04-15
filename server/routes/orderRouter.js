const Express = require('express')
const router = Express.Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const admin = [authMiddleware, adminMiddleware]

router.put('/admin/ready/:order_id', ...admin,orderController.adminReady)
router.put('/admin/complete/:order_id', ...admin,orderController.adminComplete)
router.put('/admin/cancel/:order_id', ...admin,orderController.adminCancel)
router.put('/admin/services/:order_id', ...admin,orderController.adminRemoveServices)
router.put('/admin/info/:order_id', ...admin,orderController.updateInfo)
router.get('/admin/all', ...admin,orderController.adminGetAllOrders)
router.get('/admin/:order_id', ...admin,orderController.adminGetOne)
router.delete('/admin/:order_id', ...admin,orderController.adminRemove)

router.post('/', authMiddleware, orderController.create)
router.put('/complete/:order_id', authMiddleware,orderController.complete)
// router.get('/cancel/:order_id', authMiddleware,orderController.cancel)
router.get('/all', authMiddleware,orderController.getAllUserOrders)
router.get('/:order_id', authMiddleware,orderController.getOne)
router.delete('/:order_id', ...admin,orderController.remove)

module.exports = router