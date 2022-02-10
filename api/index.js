const express = require('express')
const db = require('./db')
const path = require('path')


// Create express instnace
const app = express()

// Init body-parser options (inbuilt with express)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//define dir uploads
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))


// Require & Import API routes
const users = require('./routes/users')
const articles = require('./routes/articles')
const reports = require('./routes/report')
const proyek = require('./routes/proyek')
const rembes = require('./routes/rembes')

// Use API Routes
app.use(users)
app.use(articles)
app.use(reports)
app.use(proyek)
app.use(rembes)
// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
