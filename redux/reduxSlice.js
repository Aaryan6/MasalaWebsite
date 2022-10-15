import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  totalPrice: 0,
  quantity: 0,
  user: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders = [...state.orders, action.payload];
      state.quantity += 1;
      state.totalPrice += action.payload.totalPrice;
    },
    removeOrder: (state, action) => {
      state.orders.map((order) => {
        if (order._id === action.payload) {
          state.totalPrice -= order.totalPrice;
          state.quantity -= 1;
        }
      });
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
    },
    clearCart: (state, action) => {
      state.orders = [];
      state.quantity = 0;
      state.totalPrice = 0;
    },
    getUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addOrder, removeOrder, clearCart, getUser } = orderSlice.actions;

export default orderSlice.reducer;
