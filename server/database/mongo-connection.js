const mongoose = require('mongoose')

const SERVER_ADDR = 'mongodb://localhost:27017/UserTasks'

async function connectToMongo (address = SERVER_ADDR) {
  try {
    return await mongoose.connect(address, { useNewUrlParser: true })
  } catch (e) {
    console.log(`Couldn't connect to mongo db at ${address}, you should abort execution \n ${e}`)
    return -1
  }
}

module.exports = { connectToMongo }
