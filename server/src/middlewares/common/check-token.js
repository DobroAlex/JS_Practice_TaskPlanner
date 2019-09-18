const jwt = require('../../libs/jwt-utils')
const utils = require('../../libs/utils')

function getTokenFromHeader (ctx) {
  if (!ctx.headers.authorization) {
    throw utils.errorGenerator(400, 'No auth header in form of \'Bearer %token\' was found')
  }
  return ctx.headers.authorization.split(' ')[1].trim()
}

function checkGivenToken (token) {
  return jwt.verifyAccessToken(token)
}

async function checkToken (ctx, next) {
  try {
    ctx.decodedToken = checkGivenToken(getTokenFromHeader(ctx))
    await next()
  } catch (e) {
    throw utils.errorGenerator(422, `${e}`)
  }
}
module.exports = { checkToken }
