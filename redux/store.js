import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./reduxSlice";

export const store = configureStore({
  reducer: {
    order: orderReducer,
  },
});
