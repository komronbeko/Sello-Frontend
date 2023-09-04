import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  state: {
    verifyCode: "",
    user_id: "",
  },
};

const AuthAssetsSlice = createSlice({
  name: "authAssets",
  initialState,
  reducers: {
    getAuthAssets: (state, {payload}) => {
      (state.state.verifyCode = payload.verifyCode),
        (state.state.user_id = payload.user_id);
    },
  },
});

export default AuthAssetsSlice.reducer;
export const { getAuthAssets } = AuthAssetsSlice.actions;
