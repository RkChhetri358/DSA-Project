import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';


export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/records">Records</Link></li> 
       <li><Link to="/add-record">Add Record</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  )
}
