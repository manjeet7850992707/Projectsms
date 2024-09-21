const express = require('express');
const router = express.Router(); // Use express.Router() to create a router instance
const controller=require('../controllers/logincotrol')
const addmember= require('../controllers/addmemberapi')

// Define your routes here

router.post('/register',controller.register)
router.post('/login',controller.login)
router.post('/addmember',addmember.addmember)


module.exports = router;
