import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../service/api";


export const fetchProducts = createAsyncThunk("product/fetchProducts", () => {
  return http.get(`/product`).then((res) => res.data.data);
});

export const sortProducts = createAsyncThunk("product/fetchProducts", ({value, catalog_id, category_id}) => {
  return http.get(`/product/sort/by-value?value=${value}&catalog_id=${catalog_id}&category_id=${category_id}`).then((res) => res.data.data);
});


const initialState = {
  loading: false,
  products: [],
  error: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
