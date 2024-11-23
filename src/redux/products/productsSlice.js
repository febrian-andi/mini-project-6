import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
});

export const addProduct = createAsyncThunk("products/addProduct", async (product) => {
  const response = await axios.post(`${API_URL}/products`, product);
  return response.data;
});

export const updateProduct = createAsyncThunk("products/updateProduct", async (product) => {
  const response = await axios.put(`${API_URL}/products/${product.id}`, product);
  return response.data;
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
  await axios.delete(`${API_URL}/products/${id}`);
});

export const getProductById = createAsyncThunk("products/getProductById", async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
});

const initialState = {
  products: [],
  currentProduct: {},
  isUpdate: false,
  loading: false,
  error: null,
  isSuccess: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // extraReducers for fetch products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });

    // extraReducers for add products
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });

    // extraReducers for update products
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true;
        state.isUpdate = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });

    // extraReducers for delete products
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });

    // extraReducers for get product by id
    builder
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
        state.isUpdate = false;
        state.currentProduct = {};
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.isUpdate = true;
        state.currentProduct = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default productsSlice.reducer;