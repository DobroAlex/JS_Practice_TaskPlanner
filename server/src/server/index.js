const Koa = require('koa')
const app = new Koa()

require('dotenv').config()

const cors = require('@koa/cors')
app.use(cors())

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

const logger = require('koa-morgan')
app.use(logger('dev'))

const errorHandler = require('./error-handler')
app.use(errorHandler.errorHandle)

const responseTimeSetter = require('../middlewares/common/x-response-time')
app.use(responseTimeSetter.setResponseTimeHeader)

const server = app.listen(8081 || process.env.PORT)
console.log(`Server is listening at ${server.address().port}`)

const mongoConnection = require('../../database/mongo-connection')
const res = mongoConnection.connectToMongo()
if (res === -1) {
  server.close()
}
