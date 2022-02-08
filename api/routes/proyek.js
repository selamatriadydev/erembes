const config = require('../config')
const { Router } = require('express')

const router = Router()

// Initialize Controller
const proyekController = require('../controllers/proyekController')

// Get All
router.get('/proyek_limit/:page', proyekController.list_limit)

// Get All
router.get('/proyek', proyekController.list)

// Get One
router.get('/proyek/:id', proyekController.show)

// Create
router.post('/proyek', config.isAuthenticated, proyekController.create)

// Update
router.put('/proyek/:id', config.isAuthenticated, proyekController.update)

// Delete
router.delete('/proyek/:id', config.isAuthenticated, proyekController.delete)

module.exports = router
