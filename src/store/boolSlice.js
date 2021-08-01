import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: false,
  isLoggedIn: false,
  logOutModal: false,
  confirmModal: false,
};

const boolSlice = createSlice({
  name: "bools",
  initialState,
  reducers: {
    setAdmin(state, action) {
      state.admin = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setLogOutModal(state, action) {
      state.logOutModal = action.payload;
    },
    setConfirmModal(state, action) {
      state.confirmModal = action.payload;
    },
  },
});

export const boolActions = boolSlice.actions;

export default boolSlice.reducer;
