import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/UserReducer";

const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default Store;
