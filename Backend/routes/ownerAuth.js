const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner');

// Helper function to sign JWT
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Create a new owner (Signup)
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
    }

    // Check if the owner already exists
    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) {
      return res.status(400).json({ status: 'fail', message: 'Owner with this email already exists' });
    }

    // Create a new owner
    const newOwner = await Owner.create({ email, password });

    // Generate a token
    const token = signToken(newOwner._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        owner: newOwner
      }
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
});

// Login owner
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
    }

    // Check if the owner exists and if the password is correct
    const owner = await Owner.findOne({ email }).select('+password');
    if (!owner || !(await owner.correctPassword(password, owner.password))) {
      return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
    }

    // If everything is ok, sign and send the token
    const token = signToken(owner._id);
    res.status(200).json({
      status: 'success',
      token
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
});

module.exports = router;
