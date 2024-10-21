const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const Customer = require('../models/Customer');

// Add a service schedule
router.post('/add', async (req, res) => {
  try {
    const { customerPhoneNo, addressId, serviceIntervalMonths, nextServiceDate } = req.body;

    const customer = await Customer.findOne({ phoneNo: customerPhoneNo });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });

    const addressExists = customer.addresses.id(addressId);
    if (!addressExists) return res.status(404).json({ message: 'Address not found for this customer' });

    const newService = new Service({ customerPhoneNo, addressId, serviceIntervalMonths, nextServiceDate });
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
