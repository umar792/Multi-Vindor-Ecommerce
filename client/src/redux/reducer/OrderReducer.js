import { createReducer } from "@reduxjs/toolkit";

const initialValue = {
  orderLoading: false,
};

export const OrderReducer = createReducer(initialValue, {
  // ------------------------- create order
  OrderItemLoad: (state) => {
    state.orderLoading = false;
  },
  OrderItemLoadFail: (state) => {
    state.orderLoading = false;
  },
  OrderItemSuccess: (state) => {
    state.orderLoading = false;
  },
  OrderItemERROR: (state, action) => {
    state.orderLoading = false;
    state.ERROR = action.payload;
  },
});
