const jwt = require('../../libs/jwt-utils')
const utils = require('../../libs/utils')

function getTokenFromHeader (ctx) {
  if (!ctx.headers.authorization) {
    // throw utils.errorGenerator(400, 'No auth header in form of \'Bearer %token\' was found')
    const E = new Error('No auth header in form of \'Bearer %token\' was found')
    E.status = 400
    throw E
  }
  return ctx.headers.authorization.split(' ')[1].trim()
}

function checkGivenToken (token) {
  return jwt.verifyAccessToken(token)
}

async function checkToken (ctx, next) {
  ctx.decodedToken = checkGivenToken(getTokenFromHeader(ctx))
  await next()
}
module.exports = { checkToken }
