import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../../redux/products/productsSlice";

const ProductDetail = ({ setModalProductDetail, productId }) => {
  const dispatch = useDispatch();
  const { currentProduct } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-xl font-semibold">Product Details</h3>
          <button
            onClick={() => setModalProductDetail(false)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X size={24} strokeWidth={3} className="text-red-500 hover:text-red-700" />
          </button>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div>
            <p className="text-gray-700"><span className="font-medium">Product ID :</span> {currentProduct?.id || "-"}</p>
          </div>
          <div>
            <p className="text-gray-700"><span className="font-medium">Product Name :</span> {currentProduct?.name || "-"}</p>
          </div>
          <div>
            <p className="text-gray-700"><span className="font-medium">Price (IDR) :</span> {currentProduct?.price || "-"}</p>
          </div>
          <div>
            <p className="text-gray-700"><span className="font-medium">Stock :</span> {currentProduct?.stock || "-"}</p>
          </div>
          <div>
            <p className="text-gray-700"><span className="font-medium">Description :</span> {currentProduct?.description || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
