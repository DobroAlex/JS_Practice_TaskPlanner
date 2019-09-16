const _ = require('lodash')
const crypto = require('../../libs/crypto')

const userModel = require('../../models/user')

async function registerUser (ctx, next) {
  const newUser = ctx.request.body
  newUser.password = crypto.encryptPassword(newUser.password)
}
