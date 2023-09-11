import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../constants/api";

export const fetchOrders = createAsyncThunk("order/fetchOrders", (token) => {
  return axios
    .get(`${API_BASE_URL}/order/ofuser/`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) =>
      res.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    );
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
