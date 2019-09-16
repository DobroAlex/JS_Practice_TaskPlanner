const bcrypt = require('bcrypt')

async function encryptPassword (rawPassword) {
  const encrtyptedPassword = await bcrypt.hash(rawPassword, Number(process.env.SALT_ROUNDS))
  return encrtyptedPassword
}

async function comparePassword (rawPassword, encrtyptedPassword) {
  const result = await bcrypt.compare(rawPassword, encrtyptedPassword)
  return result
}

module.exports = { encryptPassword, comparePassword }
