import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../service/api";

export const fetchCatalogs = createAsyncThunk("catalog/fetchCatalogs", () => {
  return http.get(`/catalog`).then((res) => res.data.data);
});

const initialState = {
  loading: false,
  catalogs: [],
  error: "",
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCatalogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCatalogs.fulfilled, (state, action) => {
      state.loading = false;
      state.catalogs = action.payload;
      state.error = "";
    });
    builder.addCase(fetchCatalogs.rejected, (state, action) => {
      state.loading = false;
      state.catalogs = [];
      state.error = action.error.message;
    });
  },
});

export default catalogSlice.reducer;
