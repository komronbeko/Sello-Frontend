import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../service/api";

export const fetchPartners = createAsyncThunk("partner/fetchPartners", () => {
  return http.get(`/partner`).then((res) => res.data.data);
});

const initialState = {
  loading: false,
  partners: [],
  error: "",
};

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPartners.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPartners.fulfilled, (state, action) => {
      state.loading = false;
      state.partners = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPartners.rejected, (state, action) => {
      state.loading = false;
      state.partners = [];
      state.error = action.error.message;
    });
  },
});

export default partnerSlice.reducer;
