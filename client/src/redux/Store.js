import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/UserReducer";
import ShopReducer from "./reducer/ShopReducer";
import ownerReducer from "./reducer/OwnerDashboardReducer";
import { cartReducer } from "./reducer/CartReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    shop: ShopReducer,
    owner: ownerReducer,
    cart: cartReducer,
  },
});

export default Store;
