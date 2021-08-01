import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import boolReducer from "./boolSlice";
import varReducer from "./varSlice";

const store = configureStore({
  reducer: { user: userReducer, bools: boolReducer, vars: varReducer },
});

export default store;
