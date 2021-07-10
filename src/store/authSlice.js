import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useCookies } from "react-cookie";

// const [cookies] = useCookies(["token"]);
const initialState = { temp: 0 };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reverify(state, action) {
      const token = action.payload;
      axios.defaults.headers.common.Authorization = token;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
