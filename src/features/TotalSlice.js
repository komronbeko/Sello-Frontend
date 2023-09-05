import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    count: 0,
    price: 0,
    discount: 0,
    total: 0
};

const totalSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers: {
        setCount: (state, {payload}) =>{
            state.count = payload
        },
        setPrice: (state, {payload}) =>{
            state.price = payload
        },
        setDiscount: (state, {payload}) =>{
            state.discount = payload
        },
        setTotal: (state, {payload}) =>{
            state.total = payload
        },
    }
});

export default totalSlice.reducer;
export const {setCount, setDiscount, setPrice, setTotal} = totalSlice.actions;
