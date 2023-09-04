import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../service/api";

export const fetchBanners = createAsyncThunk("banner/fetchBanners", () => {
  return http.get(`/banner`).then((res) => res.data.data);
});

const initialState = {
  loading: false,
  banners: [],
  error: "",
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBanners.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBanners.fulfilled, (state, action) => {
      state.loading = false;
      state.banners = action.payload;
      state.error = "";
    });
    builder.addCase(fetchBanners.rejected, (state, action) => {
      state.loading = false;
      state.banners = [];
      state.error = action.error.message;
    });
  },
});

export default bannerSlice.reducer;
