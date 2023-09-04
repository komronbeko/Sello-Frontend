import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../service/api";

export const fetchProductOne = createAsyncThunk(
  "productOne/fetchProductOne",
  (product_id) => {
    return http.get(`/product/${product_id}`).then((res) => res.data.data);
  }
);

const initialState = {
  loading: false,
  productOne: {},
  error: "",
};

const productOneSlice = createSlice({
  name: "productOne",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProductOne.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductOne.fulfilled, (state, action) => {
      state.loading = false;
      state.productOne = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProductOne.rejected, (state, action) => {
      state.loading = false;
      state.productOne = {};
      state.error = action.error.message;
    });
  },
});

export default productOneSlice.reducer;
