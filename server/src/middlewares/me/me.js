const utils = require('../../libs/utils')
const jwt = require('../../libs/jwt-utils')
const ajv = require('../../libs/ajv')
const validator = require('../common/validate-ajv-schema')

const userModel = require('../../models/user')

async function getMe (ctx, next) {
  validator.assignSchemaAndDataToCtx(ctx, ajv.JWT_TOKEN_SCHEMA, ctx.decodedToken)
  await validator.validateSchema(ctx, next)

  const foundUser = await userModel.User.findOne({ email: ctx.decodedToken.email }, 'email tasks')

  ctx.status = 200
  ctx.message = foundUser

  await next()
}

module.exports = { getMe }
