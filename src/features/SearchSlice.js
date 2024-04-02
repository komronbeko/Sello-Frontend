import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../service/api";
import { SearchOffTwoTone } from "@mui/icons-material";

export const searchProducts = createAsyncThunk('product/search', (searchValue) => {
    return http.get(`/search?value=${searchValue}`).then((res) => res.data);
})

const initialState = {
    loading: false, 
    data: [],
    error: ''
};

const searchSlice = createSlice({
    name: "searchProducts",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(searchProducts.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(searchProducts.fulfilled, (state, action) => {
            state.loading = false,
            state.data = action.payload,
            state.error = ""
        });

        builder.addCase(searchProducts.rejected, (state, action) => {
            state.loading = false,
            state.data = [],
            state.error = action.error.message
        })
    }
});SearchOffTwoTone

export default searchSlice.reducer;