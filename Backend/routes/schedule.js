const express = require('express');
const router = express.Router();
const AmcContract = require('../models/AmcContract');
const Service = require('../models/Service');

// Get monthly schedule
router.get('/monthly-schedule', async (req, res) => {
  try {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const amcContractsEnding = await AmcContract.find({ endDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } });
    const servicesLinedUp = await Service.find({ nextServiceDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } });

    res.json({ amcContractsEnding, servicesLinedUp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
