import React from "react";
import { Card, CardContent } from "../mycomponents/ui/card";
import { Button } from "../mycomponents/ui/button";
import { FaChartLine, FaBoxOpen, FaDollarSign } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { BiMenu } from "react-icons/bi";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gradient-to-r from-orange-500 to-pink-500 p-4">
      {/* Sidebar */}
      <aside className="w-64 bg-white rounded-2xl p-4 flex flex-col shadow-lg">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-purple-600 rounded-full"></div>
          <span className="font-semibold text-lg">Martina Jackson</span>
        </div>
        <nav className="space-y-4">
          <Button className="w-full flex items-center space-x-2 text-left">
            <IoMdPerson /> <span>Summary</span>
          </Button>
          <Button className="w-full flex items-center space-x-2 text-left">
            <FaChartLine /> <span>Transactions</span>
          </Button>
          <Button className="w-full flex items-center space-x-2 text-left">
            <FaBoxOpen /> <span>Products</span>
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white rounded-2xl shadow-lg overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Business Dashboard</h2>
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-purple-600 text-white">
            <CardContent>
              <p>Customers</p>
              <h3 className="text-xl font-bold">5,896</h3>
            </CardContent>
          </Card>
          <Card className="bg-purple-600 text-white">
            <CardContent>
              <p>Income</p>
              <h3 className="text-xl font-bold">$100,098</h3>
            </CardContent>
          </Card>
          <Card className="bg-purple-600 text-white">
            <CardContent>
              <p>Products Sold</p>
              <h3 className="text-xl font-bold">69,878</h3>
            </CardContent>
          </Card>
        </div>

        <section className="mt-6 grid grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <p>Data Analytics Overview</p>
              <p>See how your account grows.</p>
              <Button>Start</Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <p>Upgrade to PRO</p>
              <p>$29/mo</p>
              <Button className="bg-purple-600 text-white">Upgrade</Button>
            </CardContent>
          </Card>
        </section>

        <section className="mt-6">
          <h3 className="text-xl font-bold">Recent Orders</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p>#96856984 - iPad Pro 456gb - Delivered</p>
            <p>#96856985 - iPad Pro Mini 512gb - Canceled</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
