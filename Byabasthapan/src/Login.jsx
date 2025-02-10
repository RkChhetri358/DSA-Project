import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserLogin({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = { UserID: email, Password: password };
    const url = "https://localhost:44365/api/Test/login";

    try {
      const result = await axios.post(url, data);
      if (result.data.StatusCode === 200) {
        console.log(result.data);
        onLoginSuccess();
        navigate("/home");
      }
    } catch (error) {
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl p-8 rounded-2xl border border-gray-200">
        <h2 className="text-center text-3xl font-bold text-gray-800">Login In</h2>
        <p className="text-center text-gray-500">Access your account</p>
        <div className="mt-6">
          <label className="block text-gray-700 font-medium">Email Address</label>
          <input
            type="email"
            className="w-full p-3 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 font-medium">Password</label>
          <input
            type="password"
            className="w-full p-3 mt-1 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox text-blue-500 focus:ring-blue-500" />
            <span className="ml-2">Remember me</span>
          </label>
          <a href="#" className="hover:underline text-blue-500">Forgot password?</a>
        </div>
        <br/>
        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
        >
          Login
        </button>
       
      </div>
    </div>
  );
}
