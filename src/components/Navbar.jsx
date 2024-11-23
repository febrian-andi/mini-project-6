import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  WarehouseIcon,
  X,
  Menu,
  ScrollText,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveMenu } from "../redux/menu/menuSlice";


const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  const dispatch = useDispatch();
  const { activeMenu } = useSelector((state) => state.activeMenu);

  const handleActiveMenu = (menu) => {
    dispatch(setActiveMenu(menu));
    toggleSidebar();
  };

  return (
    <>
      <div
        className={`
                fixed inset-y-0 left-0 z-30 w-64 sm:w-72 bg-white shadow-lg 
                transform transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="flex items-center justify-between h-16 bg-blue-600 text-white px-3">
          <div className="flex items-center">
            <WarehouseIcon className="mr-2" />
            <span className="text-xl font-bold">Warehouse</span>
          </div>
          <X
            onClick={toggleSidebar}
            strokeWidth={3}
            className="md:hidden hover:text-orange-600 cursor-pointer"
          />
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li
              className={`hover:bg-blue-300 rounded-lg ${
                activeMenu === "dashboard" ? "bg-blue-200" : ""
              }`}
            >
              <Link
                to="/"
                onClick={() => handleActiveMenu("dashboard")}
                className="flex items-center p-2 text-gray-700"
              >
                <LayoutDashboard className="mr-3" /> Dashboard
              </Link>
            </li>
            <li
              className={`hover:bg-blue-300 rounded-lg ${
                activeMenu === "products" ? "bg-blue-200" : ""
              }`}
            >
              <Link
                to="/products"
                onClick={() => handleActiveMenu("products")}
                className="flex items-center p-2 text-gray-700"
              >
                <Package className="mr-3" /> Products
              </Link>
            </li>
            <li
              className={`hover:bg-blue-300 rounded-lg ${
                activeMenu === "logs" ? "bg-blue-200" : ""
              }`}
            >
              <Link
                to="/logs"
                onClick={() => handleActiveMenu("logs")}
                className="flex items-center p-2 text-gray-700"
              >
                <ScrollText className="mr-3" /> Logs
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <header className="md:hidden bg-white shadow-md p-4 flex justify-between items-center">
        <button onClick={toggleSidebar} className="text-gray-600">
          <Menu />
        </button>
        <div className="flex items-center">
          <h1 className="hidden md:block text-lg font-bold text-center text-blue-600">
            Warehouse Management System
          </h1>
        </div>
      </header>
    </>
  );
};

export default Navbar;
