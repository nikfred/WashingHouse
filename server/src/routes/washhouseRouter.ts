import Express from 'express'
const router = Express.Router()
const washhouseController = require('../controllers/washhouseController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const admin: Array<any> = [authMiddleware, adminMiddleware]

router.post('/', ...admin, washhouseController.create)
router.put('/:washhouse_id', ...admin, washhouseController.update)
router.put('/services/:washhouse_id', ...admin, washhouseController.updateServices)
router.delete('/:washhouse_id', ...admin, washhouseController.remove)

router.get('/all', washhouseController.getAll)
router.get('/:washhouse_id', washhouseController.getOne)

module.exports = router