import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import isLoggedInReducer from "./boolSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: { user: userReducer, bools: isLoggedInReducer, auth: authReducer },
});

export default store;
