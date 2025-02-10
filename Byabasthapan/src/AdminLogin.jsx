import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'

export default function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const data = { UserID: email, Password: password };
    const url = 'https://localhost:44365/api/Test/login';

    try {
      const result = await axios.post(url, data);
      if (result.data.StatusCode === 200) {
        navigate('/home');
      }
    } catch (error) {
      alert('Login failed! Please check your credentials.');
    }
  };

  return (
    <>
        <div className="row bg-gray-100">
          <center>hello</center></div>
  
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-center text-2xl font-bold text-gray-800">Admin Login</h2>
        <div>
          <label className="block text-gray-700">Email Address</label>
          <input 
            type="email" 
            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter your email" 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input 
            type="password" 
            className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter your password" 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div className="flex justify-between items-center">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-500" />
            <span className="ml-2 text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
        </div>
        <button 
          onClick={handleLogin} 
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
        <br/>
        <br/>
        <button 
          onClick={handleLogin} 
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
        <p className="text-center text-gray-600">
          Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
    </>
  );
}