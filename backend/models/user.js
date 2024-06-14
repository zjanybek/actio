const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  wallet_address: { type: String, required: true, unique: true },
})

module.exports = mongoose.model('User', userSchema)
