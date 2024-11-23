import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/products/productsSlice";
import { fetchLogs } from "../../redux/logs/logsSlice";

const Statistic = () => {
  const { products } = useSelector((state) => state.product);
  const { logs } = useSelector((state) => state.log);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchLogs());
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Total Inventory</h3>
        <p className="text-3xl font-bold text-blue-600">
          {products ? products.length : "-"}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Total Logistic Records</h3>
        <p className="text-3xl font-bold text-orange-600">
          {logs ? logs.length : "-"}
        </p>
      </div>
    </div>
  );
};

export default Statistic;
