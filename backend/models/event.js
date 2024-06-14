const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  description: String,
  name: String,
  created_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // date: Date,
})

module.exports = mongoose.model('Event', eventSchema)
