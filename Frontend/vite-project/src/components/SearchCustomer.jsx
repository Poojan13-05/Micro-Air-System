import React, { useState } from 'react';
import axios from 'axios';

const SearchCustomer = () => {
  const [phoneNo, setPhoneNo] = useState('');
  const [customerData, setCustomerData] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/customer/search/${phoneNo}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCustomerData(res.data.data);
    } catch (error) {
      console.error('Error fetching customer:', error);
    }
  };

  return (
    <div className="container">
      <h1>Search Customer</h1>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      {customerData && (
        <div>
          <h2>Customer Details:</h2>
          <p>Name: {customerData.name}</p>
          <p>Phone: {customerData.phoneNo}</p>
          <p>Address: {customerData.addresses[0].addressLine}, {customerData.addresses[0].city}, {customerData.addresses[0].state}</p>
          <p>Model No: {customerData.modelNo}</p>
          {/* Add more fields as required */}
        </div>
      )}
    </div>
  );
};

export default SearchCustomer;
