const jwt = require('jsonwebtoken')

function newAccessToken ({ email, role }, expiration = process.env.JWT_DEFAULT_EXPIRATION) {
  return jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: expiration })
}

function verifyAccessToken (token) {
  return jwt.verify(token, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DEFAULT_EXPIRATION })
}

module.exports = { newAccessToken, verifyAccessToken }
