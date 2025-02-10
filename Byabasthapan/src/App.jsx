import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Dashboard from './mycomponents/Dashboard';
import Home from './mycomponents/Home';
import Transaction from './mycomponents/Transaction';
import InsertProducts from './mycomponents/InsertProducts';
import Sales from './Sales';
import Graph from './mycomponents/Graph';
import Available_Items from './mycomponents/Available_Items';
import Login from './Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" /> 
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
        
        
        <Route path="/home" element={<Home />}>
          {/* Nested routes should be relative */}
          <Route path="transaction" element={<Transaction />} />
          <Route path="insertProducts" element={<InsertProducts />} />
          <Route path="sales" element={<Sales />} />
          <Route path="graph" element={<Graph />} />
          <Route path="available_items" element={<Available_Items />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
