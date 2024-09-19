const User = require('../modals/Modal'); // Assuming your User model is in the 'models' folder
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;
const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;
const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD;

// const generateUserId = async () => {
//     const userCount = await User.countDocuments();
//     return `Kotibox${userCount + 1}`;
//   };

// Register a new user
// const validatePasswordStrength = (password) => {
//     // Regex for strong password with length check
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return passwordRegex.test(password);
//   };
  
  exports.register = async (req, res) => {
    const { email, password } = req.body;
  
    // Validate password length and strength
    if (password.length < 8 ) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long and meet the strength requirements' });
    }
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.status(201).json({
        data: newUser,
        message: 'User registered successfully'
      });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  };
// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (email === SUPER_ADMIN_EMAIL && password === SUPER_ADMIN_PASSWORD) {
    // Handle super admin login
    res.status(200).json({ message: 'Super admin login successful' });
    return;
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ data:user, message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
