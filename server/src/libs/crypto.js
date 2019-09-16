const bcrypt = require('bcrypt')
const sha = require('js-sha256')

async function encryptPassword (rawPassword) {
  const salt = sha.sha256(Date.now())
  const encrtyptedPass = await bcrypt.hash(rawPassword, salt)
  return encrtyptedPass
}

module.exports = { encryptPassword }
