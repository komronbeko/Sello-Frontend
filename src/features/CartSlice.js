import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthAssetsFromLocalStorage } from "../utils/storage";
import http from "../service/api";

export const fetchCarts = createAsyncThunk("cart/fetchCarts", () => {
  const authAssets = getAuthAssetsFromLocalStorage();
  return http
    .get(`/cart/${authAssets.user_id}`)
    .then((res) => res.data.data);
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
