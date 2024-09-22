const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'employee'], // Ensure role can only be 'admin' or 'employee'
    required: true,
  },
  employeeId: {
    type: String,
    unique: true, // Ensure each user has a unique employee ID
  }
}, {
  timestamps: true,
});

// Instance method to generate a JWT for a user
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ userId: this._id, email: this.email, role: this.role }, JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
