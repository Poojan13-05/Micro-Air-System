import React, { useState } from 'react';
import axios from 'axios';

const AddServiceSchedule = () => {
  const [formData, setFormData] = useState({
    customerPhoneNo: '',
    addressId: '',
    serviceIntervalMonths: '',
    nextServiceDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/service/add', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Service scheduled:', res.data);
    } catch (error) {
      console.error('Error scheduling service:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>Add Service Schedule</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="customerPhoneNo" placeholder="Customer Phone No" onChange={handleChange} required />
        <input type="text" name="addressId" placeholder="Address ID" onChange={handleChange} required />
        <input type="number" name="serviceIntervalMonths" placeholder="Service Interval (Months)" onChange={handleChange} required />
        <input type="date" name="nextServiceDate" placeholder="Next Service Date" onChange={handleChange} required />
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default AddServiceSchedule;
