const express = require('express');
const router = express.Router(); // Use express.Router() to create a router instance
const controller=require('../controllers/logincotrol')


// Define your routes here

router.post('/register',controller.register)
router.post('/login',controller.login)

router.get('/getmembersdata',controller.getmembersdata)


module.exports = router;
