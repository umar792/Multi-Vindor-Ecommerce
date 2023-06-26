import { createReducer } from "@reduxjs/toolkit";

const initailValue = {
  ownerLoading: false,
};

const ownerReducer = createReducer(initailValue, {
  LoadGetOwnerProducts: (state) => {
    state.ownerLoading = true;
  },
  OwnerProductsGetFail: (state) => {
    state.ownerLoading = false;
  },
  GetOwnerProductSuccess: (state, action) => {
    state.ownerLoading = false;
    state.OwnerAllProducts = action.payload;
  },
  OwnerAllProductsGetError: (state, action) => {
    state.ownerLoading = false;
    state.ERROR = action.payload;
  },

  // ------------------------ owner all Evensts
  LoadGetOwnerEvent: (state) => {
    state.ownerLoading = true;
  },
  OwnerEventGetFail: (state) => {
    state.ownerLoading = false;
  },
  GetOwnerEventSuccess: (state, action) => {
    state.ownerLoading = false;
    state.OwnerAllEvensts = action.payload;
  },
  OwnerAllEventGetError: (state, action) => {
    state.ownerLoading = false;
    state.ERROR = action.payload;
  },

  // ------------------------ delete products by owner
  DeleteOwnerProductStart: (state) => {
    state.ownerLoading = true;
  },
  DeleteOwnerProductFail: (state) => {
    state.ownerLoading = false;
  },
  DeeleteOwnerProductSuccess: (state) => {
    state.ownerLoading = false;
  },
  DeleteOwnerProductError: (state, action) => {
    state.ownerLoading = false;
    state.ERROR = action.payload;
  },

  // ------------------------------------- Create Evenst Product
  LoadEventCreateProduct: (state) => {
    state.ownerLoading = true;
  },
  ShopEventCreateProductFail: (state) => {
    state.ownerLoading = false;
  },
  CreateEventProductSuccess: (state) => {
    state.ownerLoading = false;
  },
  CreateEventProductError: (state, action) => {
    state.ownerLoading = false;
    state.ERROR = action.payload;
  },

  // ------------------------ delete Event by owner
  DeleteOwnerEventStart: (state) => {
    state.ownerLoading = true;
  },
  DeleteOwnerEventFail: (state) => {
    state.ownerLoading = false;
  },
  DeeleteOwnerEventSuccess: (state) => {
    state.ownerLoading = false;
  },
  DeleteOwnerEventError: (state, action) => {
    state.ownerLoading = false;
    state.ERROR = action.payload;
  },
});

export default ownerReducer;
