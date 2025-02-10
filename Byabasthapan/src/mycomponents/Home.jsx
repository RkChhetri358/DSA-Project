import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Home.css";

const Home = () => {
  const location = useLocation();
  const [bgColor, setBgColor] = useState("#fff"); 

  
  React.useEffect(() => {
    
    if (
      location.pathname === "/" ||
      location.pathname === "/transaction" ||
      location.pathname === "/insertProducts" ||
      location.pathname === "/sales" ||
      location.pathname === "/graph" ||
      location.pathname === "/monthly" ||
      location.pathname === "/profit"
    ) {
      setBgColor("#f4f4f4"); // Match sidebar color
    } else {
      setBgColor("#fff"); // Default color
    }
  }, [location]);

  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content" style={{ backgroundColor: bgColor }}>
        <Outlet context={[bgColor]} />
      </div>
    </div>
  );
};

export default Home;
