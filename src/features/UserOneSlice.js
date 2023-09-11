import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getAuthAssetsFromLocalStorage } from "../utils/storage";
import axios from "axios";
import { API_BASE_URL } from "../constants/api";

// const authAssets = getAuthAssetsFromLocalStorage();

export const fetchUserOne = createAsyncThunk(
  "userOne/fetchUserOne",
  (token) => {
    return axios
      .get(`${API_BASE_URL}/user/user-one`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => res.data.data);
  }
);

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
