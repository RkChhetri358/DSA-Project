import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import axios from "axios";

export default function Graph() {
  const [salesData, setSalesData] = useState([]);
  const [filterType, setFilterType] = useState("month"); 

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = () => {
    const url = "https://localhost:44365/api/ViewPurchase/view_total_sales";
    axios.post(url)
      .then((result) => {
        if (result.data.StatusCode === 200) {
          setSalesData(result.data.listNewdata);
          console.log(result.data.listNewdata);
        } else {
          setSalesData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching sales data:", error);
        setSalesData([]);
      });
  };

 
  const processProfitData = () => {
    let groupedData = {};
    salesData.forEach(sale => {
      const dateParts = sale.Date.split("/"); 
      const year = dateParts[0];
      const month = dateParts[1];
      const week = Math.ceil(parseInt(dateParts[2]) / 7);
      const key =
        filterType === "year" ? year :
        filterType === "month" ? `${year}-${month}` : `${year}-W${week}`;

      if (!groupedData[key]) {
        groupedData[key] = { date: key, profit: 0 };
      }
      groupedData[key].profit += sale.Total_Profit;
    });

    return Object.values(groupedData);
  };

 
  const processSalesData = () => {
    let groupedData = {};

    salesData.forEach(sale => {
        const dateParts = sale.Date.split("/"); 
        const year = dateParts[0];
        const month = dateParts[1];
        const week = Math.ceil(parseInt(dateParts[2]) / 7); 

        const key =
            filterType === "year" ? year :
            filterType === "month" ? `${year}-${month}` : `${year}-W${week}`;

        // Initialize if key doesn't exist
        if (!groupedData[key]) {
            groupedData[key] = { date: key, totalSales: 0 };
        }

        
        groupedData[key].totalSales++;
    });

    console.log(groupedData); 
    return Object.values(groupedData);
};

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Sales & Profit Trends</h2>
      
      {/* Dropdown for filtering */}
      <div className="flex justify-center mb-6">
        <select
          onChange={(e) => setFilterType(e.target.value)}
          value={filterType}
          className="p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>
      </div>


      <div className="mb-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Profit Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={processProfitData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="profit" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

  
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Sales Volume (Bar Graph)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={processSalesData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSales" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>

     
      <div className="mb-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Total Sales Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={processSalesData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalSales" stroke="#82ca9d" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
