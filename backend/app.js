const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/users')
const eventRoutes = require('./routes/events')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/api', userRoutes)
app.use('/api', eventRoutes)

module.exports = app
