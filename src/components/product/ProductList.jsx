import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ListPlus,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
} from "../../redux/products/productsSlice";
import Swal from "sweetalert2";
import ProductDetail from "./ProductDetail";
import LogisticsForm from "../logs/LogisticsForm";

const ProductList = () => {
  const [modalProductDetail, setModalProductDetail] = useState(false);
  const [modalLogisticForm, setModalLogisticForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const dispatch = useDispatch();
  const { products, loading, error, isSuccess } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchProducts());
    }
  }, [isSuccess]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error || "Something went wrong!",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Your product has been deleted.",
          });
        }
      }
    });
  };

  const Loading = () => {
    return (
      <div className="py-10 flex items-center justify-center">
        <div className="w-6 h-6 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin mr-2"></div>
        Loading...
      </div>
    );
  };

  const Error = () => {
    return (
      <div className="my-4 mx-4 sm:my-10 sm:mx-10 py-8 bg-red-200 text-red-600 rounded-lg p-4 text-center">
        {error}
      </div>
    );
  };

  const NotFound = () => {
    return (
      <div className="my-4 mx-4 sm:my-10 sm:mx-10 py-8 bg-gray-200 text-gray-600 rounded-lg p-4 text-center">
        Product not found!
      </div>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-6">
        <h2 className="text-2xl font-bold flex justify-center md:justify-start mb-4 md:mb-0">
          <Package size={30} className="mr-3 text-blue-600" /> Product Inventory
        </h2>
        <div className="flex justify-center md:justify-end space-x-4">
          <button
            onClick={() => setModalLogisticForm(true)}
            className="border-2 border-emerald-500 hover:bg-emerald-500 text-emerald-600 hover:text-white font-medium px-3 rounded-lg"
          >
            Add Logistics Process
          </button>
          <Link
            to="/products/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex hover:bg-blue-700"
          >
            <ListPlus className="mr-2" /> Add Product
          </Link>
        </div>
      </div>

      {modalLogisticForm && <LogisticsForm setModalLogisticForm={setModalLogisticForm}/>}

      <div className="bg-white shadow-md rounded-lg">
        {loading && <Loading />}

        {!loading && error && <Error />}

        {!loading && !error && products.length === 0 && <NotFound />}

        {!loading && !error && products.length > 0 && (
          <div className="overflow-x-auto mx-6 py-6">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr className="text-center">
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Price (IDR)</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b hover:bg-gray-50 text-center"
                  >
                    <td className="p-3 text-left">
                      <p>{product.name}</p>
                    </td>
                    <td className="p-3">{product.price.toLocaleString()}</td>
                    <td className="p-3">{product.stock}</td>
                    <td className="p-3">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => {
                            setModalProductDetail(true);
                            setSelectedProductId(product.id);
                          }}
                          className="text-blue-600 hover:bg-blue-100 p-2 rounded-full"
                        >
                          <Eye size={18} />
                        </button>
                        <Link
                          to={`/products/edit/${product.id}`}
                          className="text-yellow-600 hover:bg-yellow-100 p-2 rounded-full"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:bg-red-100 p-2 rounded-full"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {modalProductDetail && (
          <ProductDetail
            setModalProductDetail={setModalProductDetail}
            productId={selectedProductId}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
