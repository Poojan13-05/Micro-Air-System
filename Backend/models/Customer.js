const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a customer name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  address: {
    type: String,
    required: [true, 'Please provide an address'],
    trim: true,
    maxlength: [200, 'Address cannot be more than 200 characters']
  },
  phoneNo: {
    type: String,
    required: [true, 'Please provide a phone number'],
    trim: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  },
  acDetails: [{
    company: {
      type: String,
      required: [true, 'Please provide the AC company'],
      trim: true,
      maxlength: [50, 'AC company name cannot be more than 50 characters']
    },
    model: {
      type: String,
      required: [true, 'Please provide the AC model'],
      trim: true,
      maxlength: [50, 'AC model cannot be more than 50 characters']
    },
    ton: {
      type: Number,
      required: [true, 'Please provide the AC tonnage'],
      min: [0.5, 'AC tonnage must be at least 0.5'],
      max: [5, 'AC tonnage cannot exceed 5']
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide the number of ACs'],
      min: [1, 'Number of ACs must be at least 1']
    }
  }],
  totalAmount: {
    type: Number,
    required: [true, 'Please provide the total amount'],
    min: [0, 'Total amount cannot be negative']
  },
  paymentDetails: {
    amountPaid: {
      type: Number,
      required: [true, 'Please provide the amount paid'],
      min: [0, 'Amount paid cannot be negative']
    },
    date: {
      type: Date,
      default: Date.now
    },
    method: {
      type: String,
      enum: ['cash', 'credit card', 'debit card', 'bank transfer'],
      default: 'cash'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create a text index on the name field for efficient text search
customerSchema.index({ name: 'text' });

// Add a pre-save hook to update the 'updatedAt' field
customerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;