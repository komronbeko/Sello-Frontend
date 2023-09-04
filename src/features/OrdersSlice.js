import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthAssetsFromLocalStorage } from "../utils/storage";
import http from "../service/api";

export const fetchOrders = createAsyncThunk("order/fetchOrders", () => {
  const authAssets = getAuthAssetsFromLocalStorage();
  return http
    .get(`/order/ofusers/${authAssets.user_id}`)
    .then((res) => res.data.data);
});

const initialState = {
  loading: false,
  orders: [],
  error: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.error = "";
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false;
      state.orders = [];
      state.error = action.error.message;
    });
  },
});

export default orderSlice.reducer;
