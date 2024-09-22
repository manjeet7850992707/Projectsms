const crypto = require('crypto'); // Import the crypto module
const bcrypt = require('bcryptjs'); // Use bcrypt for password hashing
const jwt = require('jsonwebtoken');
const User = require('../modals/Modal'); // Ensure the correct path to your User model

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use environment variable for security

// Get members data
exports.getmembersdata = async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users
        res.status(200).json(users); // Send the users data as JSON
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};

// Register a new user
exports.register = async (req, res) => {
    const { email, mobileNumber, role } = req.body;

    try {
        // Validate role
        if (!['admin', 'employee'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role', statusCode: 400 });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', statusCode: 400 });
        }

        // Generate user ID
        const userCount = await User.countDocuments({ role });
        const employeeId = `Kotibox${role.charAt(0).toUpperCase()}${userCount + 1}`; // Generate employee ID

        // Generate a random password (for demonstration purposes)
        const randomPassword = `Kotibox${crypto.randomBytes(4).toString('hex')}`; // Random password with prefix

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        // Create new user
        const newUser = new User({ email, password: hashedPassword, mobileNumber, role, employeeId });
        await newUser.save();

        return res.status(201).json({
            message: 'User registered successfully',
            statusCode: 201,
            data: {
                email: newUser.email,
                userId: newUser._id,
                mobileNumber: newUser.mobileNumber,
                role: newUser.role,
                employeeId: newUser.employeeId,
                password: randomPassword // Returning plain password (consider emailing it instead for security)
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error occurred during registration', statusCode: 500, error: error.message });
    }
};

// Login function
exports.login = async (req, res) => {
    const { email, password } = req.body; // Use email directly for login

    try {
        // Super Admin credentials from environment variables
        const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || 'superadmin@example.com';
        const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD || 'supersecretpassword';

        // Check if the user is the Super Admin
        if (email === SUPER_ADMIN_EMAIL && password === SUPER_ADMIN_PASSWORD) {
            // Generate a JWT token for the Super Admin
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

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password',
                statusCode: 401
            });
        }

        // Generate a JWT token for regular users
        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(202).json({
            message: 'Successfully logged in',
            statusCode: 202,
            data: { email: user.email, userId: user._id, role: user.role },
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
