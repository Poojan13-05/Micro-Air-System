import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Use `useNavigate` instead of `useHistory`
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Replace `useHistory` with `useNavigate`

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/owners/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/add-customer');  // Use `navigate` to navigate after successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
