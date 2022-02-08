const config = require('../config')
const { Router } = require('express')

const router = Router()

// Initialize Controller
const reportsController = require('../controllers/reportsController')

// Get All
router.get('/report', reportsController.list)

// Get One
router.get('/report/:id', reportsController.show)

// Create
router.post('/report', config.isAuthenticated, reportsController.create)

// Update
router.put('/report/:id', config.isAuthenticated, reportsController.update)

// Delete
router.delete('/report/:id', config.isAuthenticated, reportsController.delete)

module.exports = router
