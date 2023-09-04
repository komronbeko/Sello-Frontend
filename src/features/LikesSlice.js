import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthAssetsFromLocalStorage } from "../utils/storage";
import http from "../service/api";

export const fetchLikes = createAsyncThunk("like/fetchLikes", () => {
  const authAssets = getAuthAssetsFromLocalStorage();
  return http
    .get(`/like/${authAssets.user_id}`)
    .then((res) => res.data.data);
});

const initialState = {
  loading: false,
  likes: [],
  error: "",
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchLikes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLikes.fulfilled, (state, action) => {
      state.loading = false;
      state.likes = action.payload;
      state.error = "";
    });
    builder.addCase(fetchLikes.rejected, (state, action) => {
      state.loading = false;
      state.likes = [];
      state.error = action.error.message;
    });
  },
});

export default likeSlice.reducer;
