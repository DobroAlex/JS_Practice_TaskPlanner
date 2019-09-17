const _ = require('lodash')

const crypto = require('../../libs/crypto')
const utils = require('../../libs/utils')
const jwt = require('../../libs/jwt-utils')
const ajv = require('../../libs/ajv')
const validator = require('../common/validate-ajv-schema')

const userModel = require('../../models/user')

async function registerUser (ctx, next) {
  ctx.validationTarget = ctx.request.body
  ctx.validationSchema = ajv.REGISTRATION_SCHEMA

  await validator.validateSchema(ctx, next)

  const newUser = ctx.request.body
  newUser.password = await crypto.encryptPassword(newUser.password) // ready to be stored in DB after encryption
  newUser.tasks = [] // by default they are empty

  await new userModel.User(newUser).save() // saving and storing

  ctx.status = 200
  ctx.message = `New user ${newUser.email} saved OK`

  await next()
}

async function loginUser (ctx, next) {
  const foundUser = await userModel.User.findOne({ email: ctx.request.body.email })

  if (!foundUser) {
    throw utils.errorGenerator(404, 'No such email or password')
  }

  if (await crypto.comparePassword(ctx.request.body.password, foundUser.password)) {
    foundUser.token = jwt.newAccessToken({ email: ctx.request.body.email, role: foundUser.role })

    await foundUser.save()

    ctx.status = 200
    ctx.message = 'OK'
  } else {
    throw utils.errorGenerator(404, 'No such email or password')
  }
  await next()
}

module.exports = { registerUser, loginUser }
