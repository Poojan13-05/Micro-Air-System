import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use `Routes` instead of `Switch`
import AddCustomer from './components/AddCustomer';
import SearchCustomer from './components/SearchCustomer';
import AddAmcContract from './components/AddAmcContract';
import AddServiceSchedule from './components/AddServiceSchedule';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes> {/* Use `Routes` instead of `Switch` */}
          <Route path="/" element={<Login />} /> {/* Use `element` prop */}
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/search-customer" element={<SearchCustomer />} />
          <Route path="/add-amc" element={<AddAmcContract />} />
          <Route path="/add-service" element={<AddServiceSchedule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
