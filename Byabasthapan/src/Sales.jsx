import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Sales() {
    const [salesData, setSalesData] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(""); 
    const [sortType, setSortType] = useState("name"); 
    const [dateFilter, setDateFilter] = useState({ day: "", month: "", year: "" });

    useEffect(() => {
        fetchSalesData();
    }, []);

    const fetchSalesData = () => {
        const url = 'https://localhost:44365/api/ViewPurchase/view_total_sales';
        axios.post(url)
            .then((result) => {
                const data = result.data;
                if (data.StatusCode === 200) {
                    setSalesData(data.listNewdata);
                    console.log("Fetched sales data:", data.listNewdata);
                } else {
                    setSalesData([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching sales data:", error);
                setSalesData([]);
            });
    };

    // Merge Sort Algorithm
    function mergeSort(arr, key, isString = false) {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = mergeSort(arr.slice(0, mid), key, isString);
        const right = mergeSort(arr.slice(mid), key, isString);

        return merge(left, right, key, isString);
    }

    function merge(left, right, key, isString) {
        let sortedArray = [];
        let i = 0, j = 0;

        while (i < left.length && j < right.length) {
            let comparison;
            if (isString) {
                comparison = left[i][key].localeCompare(right[j][key]) <= 0;
            } else {
                comparison = left[i][key] <= right[j][key];
            }

            if (comparison) {
                sortedArray.push(left[i]);
                i++;
            } else {
                sortedArray.push(right[j]);
                j++;
            }
        }

        return [...sortedArray, ...left.slice(i), ...right.slice(j)];
    }

  
    const filteredSales = Array.isArray(salesData) ? salesData.filter(sale => {
        return (
            sale.Product_Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!dateFilter.day || sale.Date.includes(`/${dateFilter.day}/`)) &&
            (!dateFilter.month || sale.Date.includes(`${dateFilter.month}/`)) &&
            (!dateFilter.year || sale.Date.includes(`/${dateFilter.year}`))
        );
    }) : [];

 
    const sortedSales = mergeSort(filteredSales, sortType === "name" ? "Product_Name" : "Selling_price", sortType === "name");

    return (
        <div className="container mx-auto p-6">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Sales Records</h1>
            </header>
            
            <div className="mb-6 flex justify-between items-center">
                <div className="w-1/3">
                    <input 
                        type="text" 
                        placeholder="Search Product..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="w-1/3 flex space-x-2">
                    <input 
                        type="number" 
                        placeholder="Day" 
                        min="1" max="31" 
                        value={dateFilter.day} 
                        onChange={(e) => setDateFilter({ ...dateFilter, day: e.target.value })} 
                        className="w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input 
                        type="number" 
                        placeholder="Month" 
                        min="1" max="12" 
                        value={dateFilter.month} 
                        onChange={(e) => setDateFilter({ ...dateFilter, month: e.target.value })} 
                        className="w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input 
                        type="number" 
                        placeholder="Year" 
                        value={dateFilter.year} 
                        onChange={(e) => setDateFilter({ ...dateFilter, year: e.target.value })} 
                        className="w-1/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="w-1/3">
                    <select 
                        onChange={(e) => setSortType(e.target.value)} 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="name">Sort by Name</option>
                        <option value="price">Sort by Price</option>
                    </select>
                </div>
            </div>
            
            <table className="min-w-full table-auto border-collapse text-center">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 border border-gray-300">SN</th>
                        <th className="py-2 px-4 border border-gray-300">Date</th>
                        <th className="py-2 px-4 border border-gray-300">Name</th>
                        <th className="py-2 px-4 border border-gray-300">Quantity</th>
                        <th className="py-2 px-4 border border-gray-300">Selling Price</th>
                        <th className="py-2 px-4 border border-gray-300">Total Selling Price</th>
                        <th className="py-2 px-4 border border-gray-300">Profit</th>
                        <th className="py-2 px-4 border border-gray-300">Total Profit</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {sortedSales.map((sale, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border border-gray-300">{i + 1}</td>
                            <td className="py-2 px-4 border border-gray-300">{sale.Date}</td>
                            <td className="py-2 px-4 border border-gray-300">{sale.Product_Name}</td>
                            <td className="py-2 px-4 border border-gray-300">{sale.Quantity}</td>
                            <td className="py-2 px-4 border border-gray-300">{(sale.Selling_price / sale.Quantity).toFixed(2)}</td>
                            <td className="py-2 px-4 border border-gray-300">{sale.Selling_price.toFixed(2)}</td>
                            <td className="py-2 px-4 border border-gray-300">{sale.Profit}</td>
                            <td className="py-2 px-4 border border-gray-300">{sale.Total_Profit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
