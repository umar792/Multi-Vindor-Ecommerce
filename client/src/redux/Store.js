import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/UserReducer";
import ShopReducer from "./reducer/ShopReducer";
import ownerReducer from "./reducer/OwnerDashboardReducer";
import { cartReducer } from "./reducer/CartReducer";
import { OrderReducer } from "./reducer/OrderReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    shop: ShopReducer,
    owner: ownerReducer,
    cart: cartReducer,
    order: OrderReducer,
  },
});

export default Store;
