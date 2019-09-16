const Router = require('koa-router')
const router = new Router()

const middleware = require('../middlewares/public/public')

router.post('/public/registration', middleware.registerUser)

router.post('/public/login', middleware.loginUser)

module.exports = router
