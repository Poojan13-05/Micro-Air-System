const express = require('express');
const router = express.Router();
const AmcContract = require('../models/AmcContract');
const Customer = require('../models/Customer');

// Add a new AMC contract
router.post('/add', async (req, res) => {
  try {
    const { customerPhoneNo, addressId, startDate, endDate, serviceDetails } = req.body;

    const customer = await Customer.findOne({ phoneNo: customerPhoneNo });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    const addressExists = customer.addresses.id(addressId);
    if (!addressExists) return res.status(404).json({ message: 'Address not found for this customer' });

    const newAmcContract = new AmcContract({ customerPhoneNo, addressId, startDate, endDate, serviceDetails });
    await newAmcContract.save();
    res.status(201).json(newAmcContract);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
