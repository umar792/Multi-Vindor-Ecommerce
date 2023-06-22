import { createReducer } from "@reduxjs/toolkit";

const initailValue = {
  shopLoading: false,
};

const ShopReducer = createReducer(initailValue, {
  LoadShopOwnerRequest: (state) => {
    state.shopLoading = true;
  },
  ShopOwnerLoadFail: (state) => {
    state.shopLoading = false;
  },
  ShopOwnerSuccess: (state, action) => {
    state.shopLoading = false;
    state.SingelShopOwner = action.payload;
  },
  ShopOwnerGetError: (state, action) => {
    state.shopLoading = false;
    state.ERROR = action.payload;
  },
});

export default ShopReducer;
