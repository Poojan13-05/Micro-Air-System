const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  addressLine: { type: String, required: true },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },
}, { _id: true });

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNo: { type: String, required: true, unique: true },
  addresses: { type: [addressSchema], default: [] },
  dateOfPurchase: { type: Date, required: true },
  amount: { type: Number, required: true },
  modeOfPayment: { type: String, required: true },
  tonOfAC: { type: Number, required: true },
  acCompany: { type: String, required: true },
  quantity: { type: Number, required: true },
  yearsOfWarranty: { type: Number, required: true },
  modelNo: { type: String, required: true }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
