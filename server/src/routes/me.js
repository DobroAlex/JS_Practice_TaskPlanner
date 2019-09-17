const Router = require('koa-router')
const router = new Router()
const jwt = require('../middlewares/common/check-token')

router.use(jwt.checkToken)

router.get('/me')
