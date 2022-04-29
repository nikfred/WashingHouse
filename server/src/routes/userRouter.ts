import Express from 'express'
const router = Express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

const admin: Array<any> = [authMiddleware, adminMiddleware]

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/refresh', userController.refresh)
router.put('/recovery', userController.recovery)
router.put('/password', userController.updatePassword)

router.post('/logout', authMiddleware, userController.logout)
router.get('/', authMiddleware, userController.getUser)
router.put('/', authMiddleware, userController.update)


router.get('/all', ...admin, userController.getAllClient)
router.put('/role', ...admin, userController.updateRole)

module.exports = router