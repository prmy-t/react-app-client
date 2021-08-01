import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  orderId: "",
};

const varSlice = createSlice({
  name: "vars",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setOrderId(state, action) {
      state.orderId = action.payload;
    },
  },
});

export const varActions = varSlice.actions;

export default varSlice.reducer;
