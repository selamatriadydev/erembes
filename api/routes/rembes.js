const config = require('../config')
const { Router } = require('express')

const router = Router()

// Initialize Controller
const rembesController = require('../controllers/rembesController')

// Get All
router.get('/rembes_limit/:page', rembesController.list_limit)

// Get All
router.get('/rembes', rembesController.list)

// Get One
router.get('/rembes/:id', rembesController.show)

// Create
router.post('/rembes', config.isAuthenticated, rembesController.create)

// Update
router.put('/rembes/:id', config.isAuthenticated, rembesController.update)

// Delete
router.delete('/rembes/:id', config.isAuthenticated, rembesController.delete)

module.exports = router
