const bcrypt = require('bcrypt')
const sha = require('js-sha256')

async function encryptPassword (rawPassword) {
  const salt = sha.sha256(Date.now())
  const encrtyptedPassword = await bcrypt.hash(rawPassword, salt)
  return encrtyptedPassword
}

async function comparePassword (rawPassword, encrtyptedPassword) {
  const result = await bcrypt.compare(rawPassword, encrtyptedPassword)
  return result
}

module.exports = { encryptPassword, comparePassword }
