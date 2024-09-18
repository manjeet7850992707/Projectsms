const Login = require('../Reg model/Login'); // Updated to 'Login' for clarity
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Make sure to import jwt

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
       
        const loginRecord = await Login.findOne({ email: email });

        // If user exists
        if (loginRecord) {
            // Compare provided password with hashed password in DB
            const matchedPassword = await bcrypt.compare(password, loginRecord.password);

            if (matchedPassword) {
                // Generate JWT token
                const token = jwt.sign(
                    { userId: loginRecord._id, email: loginRecord.email },
                    'your_secret_key', // Replace with your secret key
                    { expiresIn: '1h' }
                );

                // Respond with success message
                return res.status(202).json({
                    message: "Successfully logged in",
                    statusCode: 202,
                    data: loginRecord,
                    token, // Include JWT token in the response
                    userId: loginRecord._id
                });
            } else {
                // Password doesn't match
                return res.status(401).json({
                    message: "Password does not match",
                    statusCode: 401
                });
            }
        } else {
            // User not found
            return res.status(404).json({
                message: "User not registered",
                statusCode: 404
            });
        }
    } catch (error) {
        // Handle errors
        return res.status(500).json({
            message: "An error occurred",
            statusCode: 500,
            error: error.message
        });
    }
};
