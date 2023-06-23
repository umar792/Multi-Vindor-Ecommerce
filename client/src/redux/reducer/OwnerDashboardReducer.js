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
});

export default ownerReducer;
