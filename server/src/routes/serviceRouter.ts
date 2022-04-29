import Express from 'express'
const router = Express.Router()
const serviceController = require('../controllers/serviceController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const admin: Array<any> = [authMiddleware, adminMiddleware]

router.post('/', ...admin, serviceController.create)
router.put('/:service_id', ...admin, serviceController.update)
router.delete('/:service_id', ...admin, serviceController.remove)

router.get('/all', serviceController.getAll)
router.get('/:service_id', serviceController.getOne)

module.exports = router