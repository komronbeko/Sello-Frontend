import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../constants/api";

export const fetchReviewOne = createAsyncThunk(
  "review/fetchReviewOne",
  ({ token, product_id }) => {
    return axios
      .get(`${API_BASE_URL}/product-review/exact/${product_id}`, {
        headers: { Authorization: token },
      })
      .then((res) => res.data.data);
  }
);

const initialState = {
  loading: false,
  review: "",
  error: "",
};

const reviewOneSlice = createSlice({
  name: "reviewOne",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchReviewOne.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReviewOne.fulfilled, (state, action) => {
      state.loading = false;
      state.review = action.payload;
      state.error = "";
    });
    builder.addCase(fetchReviewOne.rejected, (state, action) => {
      state.loading = false;
      state.review = {};
      state.error = action.error.message;
    });
  },
});

export default reviewOneSlice.reducer;
