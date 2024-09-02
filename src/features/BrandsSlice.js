import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../service/api";

export const fetchBrands = createAsyncThunk("brand/fetchBrands", () => {
  return http.get(`/brand`).then((res) => res.data.data);
});

const initialState = {
  loading: false,
  brands: [],
  error: "",
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBrands.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;
      state.error = "";
    });
    builder.addCase(fetchBrands.rejected, (state, action) => {
      state.loading = false;
      state.brands = [];
      state.error = action.error.message;
    });
  },
});

export default brandSlice.reducer;
