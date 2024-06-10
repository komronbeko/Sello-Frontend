import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: "main",
};

const footerMenuStatesSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    setActivePage: (state, { payload }) => {
      state.state = payload;
    },
  },
});

export default footerMenuStatesSlice.reducer;
export const { setActivePage } = footerMenuStatesSlice.actions;
