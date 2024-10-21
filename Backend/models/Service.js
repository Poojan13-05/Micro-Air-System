const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  customerPhoneNo: { type: String, required: true, ref: 'Customer' },
  addressId: { type: mongoose.Schema.Types.ObjectId, required: true },
  serviceIntervalMonths: { type: Number, required: true },
  nextServiceDate: { type: Date, required: true }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
