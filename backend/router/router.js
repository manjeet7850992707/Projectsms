const router = require('express').Router(); // Fixed by adding parentheses
const CAPI = require('../controller/controller');

// Define the login route
router.post('/login', CAPI.login);

// Export the router module
module.exports = router;
