const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Add a new customer
router.post('/', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).send(customer);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Search for a customer by name
router.get('/search', async (req, res) => {
  try {
    const customer = await Customer.findOne({ name: new RegExp(req.query.name, 'i') });
    if (!customer) {
      return res.status(404).send('Customer not found');
    }
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.send(customers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;