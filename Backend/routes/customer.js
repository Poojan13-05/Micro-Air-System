const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Middleware for authentication (if needed, replace with your auth middleware)
const protect = require('../middleware/auth'); // Assuming you have a JWT auth middleware

// Add a new customer
router.post('/add', protect, async (req, res) => {
  try {
    const {
      name,
      phoneNo,
      addresses,
      dateOfPurchase,
      amount,
      modeOfPayment,
      tonOfAC,
      acCompany,
      quantity,
      yearsOfWarranty,
      modelNo
    } = req.body;

    // Check if the customer already exists
    const existingCustomer = await Customer.findOne({ phoneNo });
    if (existingCustomer) {
      return res.status(400).json({
        status: 'fail',
        message: 'Customer with this phone number already exists.'
      });
    }

    // Create a new customer
    const newCustomer = new Customer({
      name,
      phoneNo,
      addresses,
      dateOfPurchase,
      amount,
      modeOfPayment,
      tonOfAC,
      acCompany,
      quantity,
      yearsOfWarranty,
      modelNo
    });

    await newCustomer.save();
    res.status(201).json({
      status: 'success',
      data: newCustomer
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
});

// Get customer by phone number
router.get('/search/:phoneNo', protect, async (req, res) => {
  try {
    const { phoneNo } = req.params; // Extract phoneNo from request parameters

    const customer = await Customer.findOne({ phoneNo });

    if (!customer) {
      return res.status(404).json({
        status: 'fail',
        message: 'Customer not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: customer
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
});

module.exports = router;
