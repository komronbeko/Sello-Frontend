import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../service/api";

export const fetchSortProducts = createAsyncThunk(
  "product/sort",
  ({
    value,
    catalog_id,
    category_id,
    from,
    to,
    discount,
    brand,
    category,
    product_infos,
  }) => {
    let query = `/product/filters/all-in-one?value=${value}`;

    if (catalog_id) {
      query += `&catalog_id=${catalog_id}`;
    }

    if (category_id) {
      query += `&category_id=${category_id}`;
    }

    if (from && to) {
      query += `&from=${from}&to=${to}`;
    }

    if (discount && JSON.parse(discount).length) {
      query += `&discounts=${discount}`;
    }

    if (brand && JSON.parse(brand).length) {
      query += `&brands=${brand}`;
    }

    if (category && JSON.parse(category).length) {
      query += `&sub_categories=${category}`;
    }

    if (product_infos && JSON.parse(product_infos).length) {
      query += `&product_infos=${product_infos}`;
    }

    return http.get(`${query}`).then((res) => res.data.data);
  }
);

const initialState = {
  loading: false,
  products: [],
  error: "",
};

const sortProductSlice = createSlice({
  name: "sortProducts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSortProducts.pending, (state) => { 
      state.loading = true;
    });
    builder.addCase(fetchSortProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = ""
    });
    builder.addCase(fetchSortProducts.rejected, (state, action) => {
        state.loading = false,
        state.products = [],
        state.error = action.error.message
    })
  },
});

export default sortProductSlice.reducer;
