import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthAssetsFromLocalStorage } from "../utils/storage";
import http from "../service/api";

export const fetchUserOne = createAsyncThunk("userOne/fetchUserOne", () => {
    const authAssets = getAuthAssetsFromLocalStorage();
  return http.get(`/user/${authAssets.user_id}`).then((res) => res.data.data);
});

const initialState = {
  loading: false,
  userOne: {},
  error: "",
};

const userOneSlice = createSlice({
  name: "userOne",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserOne.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserOne.fulfilled, (state, action) => {
      state.loading = false;
      state.userOne = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUserOne.rejected, (state, action) => {
      state.loading = false;
      state.userOne = {};
      state.error = action.error.message;
    });
  },
});

export default userOneSlice.reducer;
