import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/UserReducer";
import ShopReducer from "./reducer/ShopReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    shop: ShopReducer,
  },
});

export default Store;
