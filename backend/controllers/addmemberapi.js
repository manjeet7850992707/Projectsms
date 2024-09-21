const Admin = require('../modals/addmember');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const generateEmployeeId = () => {
    const prefix = "EMP@"; // Customize the prefix
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
    return `kotibox${prefix}${randomNumber}`;
};

// Function to generate a unique userId based on employeeId and a timestamp
const generateUniqueUserId = (employeeId) => {
    const timestamp = Date.now().toString(); // Get current timestamp
    return `${employeeId}-${timestamp}`; // Combine employeeId with timestamp to ensure uniqueness
};

// Function to generate password similar to employeeId but different
const generatePasswordFromEmployeeId = (employeeId) => {
    const base = employeeId.replace(/[^\w]/g, ''); // Remove special characters from employeeId
    const randomSuffix = crypto.randomBytes(4).toString('hex'); // Random 4-byte hex string
    return `${base.substring(0, 6)}${randomSuffix}`; // Take first 6 chars of employeeId + random suffix
};

exports.addmember = async (req, res) => {
    let { name, number, email, age, experience, gender, position, salary, pf, incentive, address, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(409).json({
                message: "Admin with this email already exists",
                statusCode: 409
            });
        }

        // Generate an employee ID
        const employeeId = generateEmployeeId();

        // Generate a custom userId based on employeeId
        const userId = generateUniqueUserId(employeeId);

        // Generate a password similar to employeeId but different
        if (!password) {
            password = generatePasswordFromEmployeeId(employeeId);
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin instance
        const newAdmin = new Admin({
            name,
            number,
            email,
            age,
            experience,
            gender,
            position,
            salary,
            pf,
            incentive,
            address,
            password: hashedPassword, // Store the hashed password
            employeeId, // Store the generated employee ID
            userId // Store the generated unique userId
        });

        // Save the admin to the database
        const savedAdmin = await newAdmin.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: savedAdmin._id, email: savedAdmin.email },
            'your_secret_key', // Replace with your secret key
            { expiresIn: '1h' }
        );

        // Respond with success, employee ID, and JWT token
        return res.status(201).json({
            message: "Admin successfully registered",
            statusCode: 201,
            data: savedAdmin,
            employeeId,
            userId, // Return the custom unique userId
            token,
            password // Return the auto-generated password (optional)
        });
    } catch (error) {
        // Handle errors
        return res.status(500).json({
            message: "An error occurred during registration",
            statusCode: 500,
            error: error.message,
        });
    }
};
