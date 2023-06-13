import { createReducer } from "@reduxjs/toolkit";

const initialValue = {
  isloading: false,
};

const userReducer = createReducer(initialValue, {
  LoadUserRequest: (state) => {
    state.isloading = true;
  },
  LoadUserFail: (state) => {
    state.isloading = false;
  },
  LoadUserSuccess: (state, action) => {
    state.isloading = false;
    state.user = action.payload;
  },
  LoadUserError: (state) => {
    state.isloading = false;
  },
});

export default userReducer;
