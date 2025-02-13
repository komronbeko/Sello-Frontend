import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../service/api";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  (page) => {
    return http.get(`/product?page=${page}&limit=10`).then((res) => res.data);
  }
);

export const fetchUserProducts = createAsyncThunk(
  "product/fetchUserProducts",
  (token) => {
    return http
      .get(`/product/user-products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);
  }
);

export const fetchUnauthorizedProducts = createAsyncThunk(
  "product/unauthorizedProducts",
  (token) => {
    return http
      .get(`/product/unverified/get-all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);
  }
);

const initialState = {
  loading: false,
  products: [],
  userProducts: [],
  unauthorized: [],
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.error = "";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.error.message;
      })

      // Fetch products by user
      .addCase(fetchUserProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.userProducts = action.payload;
        state.error = "";
      })
      .addCase(fetchUserProducts.rejected, (state, action) => {
        state.loading = false;
        state.userProducts = [];
        state.error = action.error.message;
      })

      // Fetch unverified products by user
      .addCase(fetchUnauthorizedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUnauthorizedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.unauthorized = action.payload;
        state.error = "";
      })
      .addCase(fetchUnauthorizedProducts.rejected, (state, action) => {
        state.loading = false;
        state.unauthorized = [];
        state.error = action.error.message;
      });
  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;
