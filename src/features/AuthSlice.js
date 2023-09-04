import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    state: true
};

const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {
        setAuthFalse: (state) =>{
            state.state = false
        },
        setAuthTrue: (state) =>{
            state.state = true
        },
    }
});

export default authSlice.reducer;
export const {setAuthFalse, setAuthTrue} = authSlice.actions;
