const crypto = require('../../libs/crypto')
const utils = require('../../libs/utils')
const jwt = require('../../libs/jwt-utils')
const ajv = require('../../libs/ajv')
const validator = require('../common/validate-ajv-schema')

const userModel = require('../../models/user')

async function registerUser (ctx, next) {
  validator.assignSchemaAndDataToCtx(ctx, ajv.REGISTRATION_SCHEMA, ctx.request.body)

  await validator.validateSchema(ctx, next)

  const newUser = ctx.request.body
  newUser.role = 'user' // all users are not admins by default
  newUser.password = await crypto.encryptPassword(newUser.password) // ready to be stored in DB after encryption
  newUser.tasks = [] // by default they are empty

  await new userModel.User(newUser).save() // saving and storing

  utils.ctxResponseSetter(ctx, 200, `New user ${newUser.email} saved OK`)

  await next()
}

async function loginUser (ctx, next) {
  validator.assignSchemaAndDataToCtx(ctx, ajv.AUTH_SCHEMA, ctx.request.body)

  await validator.validateSchema(ctx, next)

  const foundUser = await userModel.User.findOne({ email: ctx.request.body.email })

  if (!foundUser) {
    //throw utils.errorGenerator(404, 'No such email or password')
    conse E = new Error('No such email or passsword')
    E.status = 404
    throw E
  }

  if (await crypto.comparePassword(ctx.request.body.password, foundUser.password)) {
    foundUser.token = jwt.newAccessToken({ email: ctx.request.body.email, role: foundUser.role })

    await foundUser.save()

    utils.ctxResponseSetter(ctx, 200, { token: foundUser.token })
  } else {
    // throw utils.errorGenerator(404, 'No such email or password')
    const E = new Error('!!!!')
    E.status = 404
    throw E
  }
  await next()
}

module.exports = { registerUser, loginUser }
