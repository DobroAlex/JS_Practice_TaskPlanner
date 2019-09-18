const Router = require('koa-router')
const router = new Router()

const jwt = require('../middlewares/common/check-token')
const middleware = require('../middlewares/me/me')

router.use(jwt.checkToken)

router.get('/me', middleware.getMe)

module.exports = router
