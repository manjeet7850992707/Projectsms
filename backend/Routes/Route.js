const express = require('express');
const router = express.Router(); // Use express.Router() to create a router instance
const controller=require('../controller/Controller')

// Define your routes here

router.post('/register',controller.register)
router.post('/login',controller.login)

// Export the router to use in your main app file
module.exports = router;
