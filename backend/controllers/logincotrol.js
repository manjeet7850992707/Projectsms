const User = require('../modals/Modal'); // Ensure the correct path to your User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use environment variable for security

// Register a new user
exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists',
                statusCode: 400
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create new user with hashed password
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        // Generate a token
        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({
            message: 'User registered successfully',
            statusCode: 201,
            data: { email: newUser.email, userId: newUser._id }, // Exclude password from response
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error occurred during registration',
            statusCode: 500,
            error: error.message
        });
    }
};

// Login an existing user
// Login an existing user or super admin
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user is the super admin
        const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || 'superadmin@example.com';
        const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD || 'supersecretpassword';

        if (email === SUPER_ADMIN_EMAIL && password === SUPER_ADMIN_PASSWORD) {
            // Generate a JWT token for the super admin
            const token = jwt.sign({ userId: 'superadmin', email: SUPER_ADMIN_EMAIL, role: 'superadmin' }, JWT_SECRET, { expiresIn: '1h' });

            return res.status(202).json({
                message: 'Successfully logged in as Super Admin',
                statusCode: 202,
                data: { email: SUPER_ADMIN_EMAIL, userId: 'superadmin' },
                token
            });
        }

        // Find user by email in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not registered',
                statusCode: 404
            });
        }

        // Check if the password is correct by comparing the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password',
                statusCode: 401
            });
        }

        // Generate a JWT token for regular users
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(202).json({
            message: 'Successfully logged in',
            statusCode: 202,
            data: { email: user.email, userId: user._id },
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: 'An error occurred during login',
            statusCode: 500,
            error: error.message
        });
    }
};
