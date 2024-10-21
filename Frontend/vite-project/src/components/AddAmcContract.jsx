import React, { useState } from 'react';
import axios from 'axios';

const AddAmcContract = () => {
  const [formData, setFormData] = useState({
    customerPhoneNo: '',
    addressId: '',
    startDate: '',
    endDate: '',
    serviceDetails: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/amc/add', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('AMC contract added:', res.data);
    } catch (error) {
      console.error('Error adding AMC contract:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>Add AMC Contract</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="customerPhoneNo" placeholder="Customer Phone No" onChange={handleChange} required />
        <input type="text" name="addressId" placeholder="Address ID" onChange={handleChange} required />
        <input type="date" name="startDate" placeholder="Start Date" onChange={handleChange} required />
        <input type="date" name="endDate" placeholder="End Date" onChange={handleChange} required />
        <input type="text" name="serviceDetails" placeholder="Service Details" onChange={handleChange} required />
        <button type="submit">Add AMC</button>
      </form>
    </div>
  );
};

export default AddAmcContract;
