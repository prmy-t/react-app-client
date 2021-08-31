import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { getDefaultMiddleware } from '@reduxjs/toolkit';
import axios from "axios";

export const getOrders = createAsyncThunk(
    'orders/getOrders',
    async (dispatch,getStats)=>{
        return await axios.get("http://localhost:3000/get-orders");
    }
)

const orderSlice = createSlice({
    name:'orders',
    initialState:{orders:[],status:""},
    extraReducers:{
        [getOrders.pending]:(state,action)=>{
            state.status = 'loading'
        },
        [getOrders.fulfilled]:(state,action)=>{
            console.log(action.payload.data);
            state.orders = action.payload.data
            state.status = "success"
        },
        [getOrders.rejected]:(state,action)=>{
            state.status = "failed"
        }
    }
})

export default orderSlice.reducer;