import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Total Inventory</h3>
          <p className="text-3xl font-bold text-blue-600">1,254</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Pending Orders</h3>
          <p className="text-3xl font-bold text-orange-600">42</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Shipments</h3>
          <p className="text-3xl font-bold text-green-600">128</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Low Stock</h3>
          <p className="text-3xl font-bold text-red-600">7</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
