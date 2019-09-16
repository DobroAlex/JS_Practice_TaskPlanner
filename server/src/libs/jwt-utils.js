const jwt = require('jsonwebtoken')

function newAccessToken ({ email, role }, expiration = process.env.JWT_DEFAULT_EXPIRATION) {
  return jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: expiration })
}

function verifyAccessToken (token, expiration = process.env.JWT_DEFAULT_EXPIRATION) {
  return jwt.verify(token, process.env.JWT_SECRET, { expiresIn: expiration })
}

module.exports = { newAccessToken, verifyAccessToken }
