import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: null,
  totalPrice: 0,
  quantity: 0,
  user: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchOrder: (state, action) => {
      state.orders = action.payload;
      state.quantity = action.payload.products.length;
      state.totalPrice = action.payload.totalPrice;
    },
    addOrders: (state, action) => {
      state.orders.products = [...state.orders.products, action.payload];
      state.quantity += action.payload.products.length;
      state.totalPrice += action.payload.totalPrice;
    },
    removeOrder: (state, action) => {
      state.orders.products.map((order) => {
        if (order._id === action.payload) {
          state.totalPrice -= order.price * order.quantity;
          state.quantity -= 1;
        }
      });
      state.orders.products = state.orders.products.filter(
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
export const { fetchOrder, addOrder, removeOrder, clearCart, getUser } =
  orderSlice.actions;

export default orderSlice.reducer;
