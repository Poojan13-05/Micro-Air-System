import React, { useState } from 'react';
import axios from 'axios';

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    addressLine: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfPurchase: '',
    amount: '',
    modeOfPayment: '',
    tonOfAC: '',
    acCompany: '',
    quantity: '',
    yearsOfWarranty: '',
    modelNo: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      // Prepare the payload to match what the backend expects
      const customerData = {
        name: formData.name,
        phoneNo: formData.phoneNo,
        addresses: [
          {
            addressLine: formData.addressLine,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode
          }
        ],
        dateOfPurchase: formData.dateOfPurchase,
        amount: formData.amount,
        modeOfPayment: formData.modeOfPayment,
        tonOfAC: formData.tonOfAC,
        acCompany: formData.acCompany,
        quantity: formData.quantity,
        yearsOfWarranty: formData.yearsOfWarranty,
        modelNo: formData.modelNo
      };

      // Make the API request to add the customer
      const res = await axios.post('http://localhost:5000/api/customer/add', customerData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Customer added successfully:', res.data);
    } catch (error) {
      console.error('Error adding customer:', error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>Add Customer</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="text" name="phoneNo" placeholder="Phone Number" onChange={handleChange} required />
        <input type="text" name="addressLine" placeholder="Address Line" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" onChange={handleChange} required />
        <input type="text" name="zipCode" placeholder="Zip Code" onChange={handleChange} required />
        <input type="date" name="dateOfPurchase" placeholder="Date of Purchase" onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount" onChange={handleChange} required />
        <select name="modeOfPayment" onChange={handleChange} required>
          <option value="">Select Payment Mode</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
          <option value="Online">Online</option>
        </select>
        <input type="number" name="tonOfAC" placeholder="Ton of AC" onChange={handleChange} required />
        <input type="text" name="acCompany" placeholder="AC Company" onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required />
        <input type="number" name="yearsOfWarranty" placeholder="Warranty (Years)" onChange={handleChange} required />
        <input type="text" name="modelNo" placeholder="Model Number" onChange={handleChange} required />
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default AddCustomer;
