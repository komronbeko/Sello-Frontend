import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    state: false
};

const authModalSlice = createSlice({
    name: 'authModal',
    initialState, 
    reducers: {
        setAuthModalFalse: (state) =>{
            state.state = false
        },
        setAuthModalTrue: (state) =>{
            state.state = true
        },
    }
});

export default authModalSlice.reducer;
export const {setAuthModalFalse, setAuthModalTrue} = authModalSlice.actions;
