import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import boolReducer from "./boolSlice";
import varReducer from "./varSlice";
import orderReducer from './orderSlice'
const store = configureStore({
  reducer: { user: userReducer, bools: boolReducer, vars: varReducer, orders: orderReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })

});

export default store;
