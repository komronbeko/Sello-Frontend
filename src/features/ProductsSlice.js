import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../service/api";

export const fetchProducts = createAsyncThunk("product/fetchProducts", () => {
  return http.get(`/product`).then((res) => res.data.data);
});

export const sortProducts = createAsyncThunk(
  "product/fetchProducts",
  ({
    value,
    catalog_id,
    category_id,
    from,
    to,
    discounts,
    brands,
    sub_categories,
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

    if (discounts && JSON.parse(discounts).length) {
      query += `&discounts=${discounts}`;
    }

    if (brands && JSON.parse(brands).length) {
      query += `&brands=${brands}`;
    }

    if (sub_categories && JSON.parse(sub_categories).length) {
      query += `&sub_categories=${sub_categories}`;
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

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
