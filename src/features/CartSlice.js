import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../constants/api";

export const fetchCarts = createAsyncThunk("cart/fetchCarts", (token) => {
  return axios
  .get(`${API_BASE_URL}/cart/ofuser`, {headers: { Authorization: 'Bearer ' + token}})
  .then((res) => {
    const filtercarts = res?.data?.data.filter(el => el.status === "unpaid");
    return filtercarts;
  });
});

const initialState = {
  loading: false,
  carts: [],
  error: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCarts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCarts.fulfilled, (state, action) => {
      state.loading = false;
      state.carts = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCarts.rejected, (state, action) => {
      state.loading = false;
      state.carts = [];
      state.error = action.error.message;
    });
  },
});

export default cartSlice.reducer;
