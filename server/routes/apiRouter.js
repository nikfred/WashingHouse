const Express = require('express')
const router = Express.Router()
const userRouter = require('./userRouter')
const serviceRouter = require('./serviceRouter')
const washhouseRouter = require('./washhouseRouter')
const orderRouter = require('./orderRouter')

router.use('/user', userRouter)
router.use('/service', serviceRouter)
router.use('/washhouse', washhouseRouter)
router.use('/order', orderRouter)

module.exports = router