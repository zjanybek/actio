const Event = require('../models/event')
const User = require('../models/user')

exports.getEvents = async (req, res) => {
  const events = await Event.find()

  res.json(events)
}

exports.createEvent = async (req, res) => {
  const { description, name, created_user_id } = req.body

  const user = await User.findById(created_user_id)
  if (!user) {
    return res.status(400).json({ error: 'Invalid created_user_id' })
  }

  try {
    const event = new Event({ description, name, created_user_id })
    await event.save()
    res.json(event)
  } catch (error) {
    res.json({ status: 400 })
  }
}

exports.updateEvent = async (req, res) => {
  const { id } = req.params
  const { description, name, date } = req.body
  const event = await Event.findById(id)

  if (event.created_user_id.toString() === req.body.user_id) {
    event.description = description
    event.name = name
    event.date = date
    await event.save()
    res.json(event)
  } else {
    res.status(403).json({ message: 'Forbidden' })
  }
}

exports.deleteEvent = async (req, res) => {
  const { id } = req.params
  const event = await Event.findById(id)

  if (event.created_user_id.toString() === req.body.user_id) {
    await event.remove()
    res.json({ message: 'Event deleted' })
  } else {
    res.status(403).json({ message: 'Forbidden' })
  }
}
