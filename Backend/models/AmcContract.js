const mongoose = require('mongoose');

const amcContractSchema = new mongoose.Schema({
  customerPhoneNo: { type: String, required: true, ref: 'Customer' },
  addressId: { type: mongoose.Schema.Types.ObjectId, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  serviceDetails: { type: String, required: true }
});

const AmcContract = mongoose.model('AmcContract', amcContractSchema);

module.exports = AmcContract;
