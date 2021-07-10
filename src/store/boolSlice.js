import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false, logOutModal: false };

const boolSlice = createSlice({
  name: "bools",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setLogOutModal(state, action) {
      state.logOutModal = action.payload;
    },
  },
});

export const boolActions = boolSlice.actions;

export default boolSlice.reducer;
