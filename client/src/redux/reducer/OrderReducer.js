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

  // ------------------ get user order

  GetUserOrderLoad: (state) => {
    state.orderLoading = true;
  },
  GetUserOrderLoadFail: (state) => {
    state.orderLoading = false;
  },
  getUserOrderSuccess: (state, action) => {
    state.orderLoading = false;
    state.UserAllOrderData = action.payload;
  },
  getUserOrderError: (state, action) => {
    state.orderLoading = false;
    state.ERROR = action.payload;
  },

  // --------------------------- get single order

  GetSingleOrderLoad: (state) => {
    state.orderLoading = true;
  },
  GetSingleOrderLoadFail: (state) => {
    state.orderLoading = false;
  },
  GetSingleOrderSuccess: (state, action) => {
    state.orderLoading = false;
    state.SingleOrderdata = action.payload;
  },
  GetSingleOrderError: (state, action) => {
    state.orderLoading = false;
    state.ERROR = action.payload;
  },

  // --------------------------- get all order

  GetAllOrderLoad: (state) => {
    state.orderLoading = true;
  },
  GetAllOrderLoadFail: (state) => {
    state.orderLoading = false;
  },
  GetAllOrderSuccess: (state, action) => {
    state.orderLoading = false;
    state.ownerOrder = action.payload;
  },
  GetAllOrderError: (state, action) => {
    state.orderLoading = false;
    state.ERROR = action.payload;
  },
});
