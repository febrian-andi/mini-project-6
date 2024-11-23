import React, { useState, useEffect } from "react";
import { Package, Save, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ScannerModal from "./ScannerModal";
import {
  addProduct,
  getProductById,
  updateProduct,
} from "../../redux/products/productsSlice";

const ProductForm = ({ isEdit }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, currentProduct } = useSelector((state) => state.product);

  const [scannerActive, setScannerActive] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: 0,
    stock: 0,
    description: "",
  });

  useEffect(() => {
    if (isEdit && productId) {
      dispatch(getProductById(productId));
    }
  }, [isEdit, productId]);

  useEffect(() => {
    if (isEdit && currentProduct) {
      setFormData((prevState) => ({
        ...prevState,
        id: currentProduct.id || "",
        name: currentProduct.name || "",
        price: currentProduct.price || 0,
        stock: currentProduct.stock || 0,
        description: currentProduct.description || "",
      }));
    }
  }, [isEdit, currentProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "price" || name === "stock" ? parseInt(value) || 0 : value,
    }));
  };

  const handleScan = (scannedId) => {
    setFormData((prevState) => ({
      ...prevState,
      id: scannedId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (products.find((item) => item.id === formData.id)) {
      alert("Product ID already exists. Please use a unique ID.");
      return;
    }
    if (isEdit) {
      dispatch(updateProduct(formData));
    } else {
      dispatch(addProduct(formData));
    }
    navigate("/products");
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link to="/products" className="mr-4 text-gray-600 hover:text-blue-600">
          <ArrowLeft />
        </Link>
        <h2 className="text-2xl font-bold flex items-center">
          <Package className="mr-3 text-blue-600" /> {isEdit ? "Edit" : "Add"}{" "}
          Product
        </h2>
      </div>
      <ScannerModal
        isOpen={scannerActive}
        onClose={() => setScannerActive(false)}
        onScan={handleScan}
      />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 space-y-4"
      >
        <div className="form-group">
          <label className="block mb-2 text-gray-700">Product ID</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <input
              type="text"
              inputMode="numeric"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isEdit
                  ? "bg-gray-100 cursor-not-allowed md:col-span-3"
                  : "md:col-span-2"
              }`}
              required
              disabled={isEdit}
            />
            {!isEdit && (
              <button
                onClick={() => setScannerActive(true)}
                className="border border-emerald-500 text-emerald-500 text-sm rounded-lg px-2 py-2 hover:bg-emerald-500 hover:text-white"
              >
                Input ID by Scanning
              </button>
            )}
          </div>
        </div>
        <div className="form-group">
          <label className="block mb-2 text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="form-group">
          <label className="block mb-2 text-gray-700">Price (IDR)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min={0}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="form-group">
          <label className="block mb-2 text-gray-700">Stock Amount</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min={0}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="form-group md:col-span-2">
          <label className="block mb-2 text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Deskripsi detail barang"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            required
          />
        </div>
        <div className="md:col-span-2 flex justify-end space-x-4">
          <Link
            to="/products"
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700"
          >
            <Save className="mr-2" /> Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
