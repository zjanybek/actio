const mongoose = require('mongoose')
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const app = require('./app')

dotenv.config({ path: './.env' })

// Connect DB
const DB = process.env.DATABASE

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err))

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// Start the server
const port = process.env.PORT || 5001
const server = app.listen(port, () => {
  console.log(`Server is running on Port ${port}`)
})

process.on('unhandledRejection', err => {
  console.log(err)
})
