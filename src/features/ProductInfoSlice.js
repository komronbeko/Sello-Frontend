import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../service/api";

export const fetchProductInfos = createAsyncThunk(
  "productInfos/fetchProductInfos",
  (product_id) => {
    return http.get(`/product-info/${product_id}`).then((res) => res.data.data);
  }
);

const initialState = {
  loading: false,
  productInfos: [],
  error: "",
};

const productInfosSlice = createSlice({
  name: "productInfos",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProductInfos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductInfos.fulfilled, (state, action) => {
      state.loading = false;
      state.productInfos = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProductInfos.rejected, (state, action) => {
      state.loading = false;
      state.productInfos = {};
      state.error = action.error.message;
    });
  },
});

export default productInfosSlice.reducer;
