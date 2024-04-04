import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../constants/api";

const END_POINT = "product-review";

export const fetchReviews = createAsyncThunk("review/fetchReviews", (token) => {
  return axios
    .get(`${API_BASE_URL}/${END_POINT}`, {
      headers: { Authorization: "Bearer " + token },
    })
    .then((res) => res.data.data);
});

export const fetchProductReviews = createAsyncThunk(
  "review/fetchProductReviews",
  ({ token, product_id }) => {
    return axios
      .get(`${API_BASE_URL}/${END_POINT}/by-product/${product_id}`, {
        headers: { Authorization: token },
      })
      .then((res) => res.data.data);
  }
);

export const fetchUserReviews = createAsyncThunk(
  "review/fetchUserReviews",
  ({ token }) => {
    return axios
      .get(`${API_BASE_URL}/${END_POINT}/by-user`, {
        headers: { Authorization: "Bearer" + token },
      })
      .then((res) => res.data.data);
  }
);

export const fetchUserOne = createAsyncThunk(
  "review/fetchUserOne",
  ({ token, product_id }) => {
    return axios
      .get(`${API_BASE_URL}/${END_POINT}/${product_id}`, {
        headers: { Authorization: "Bearer" + token },
      })
      .then((res) => res.data.data);
  }
);

const initialState = {
  loading: false,
  reviews: [],
  error: "",
};

const reviewsSlice = createSlice({
  name: "review",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
        state.error = "";
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
        state.error = "";
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
        state.error = "";
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.reviews = [];
        state.error = action.error.message;
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.reviews = [];
        state.error = action.error.message;
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.loading = false;
        state.reviews = [];
        state.error = action.error.message;
      });
  },
});

export default reviewsSlice.reducer;
