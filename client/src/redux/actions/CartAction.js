import { toast } from "react-toastify";

// add to cart
export const addTocart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "addToCart",
    payload: data,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  //   toast.success("Product add to card Successfuly");
  return data;
};

// remove from cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromCart",
    payload: data._id,
  });
  //   toast.success("Product remove from cart");
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

// ----------------- clear cart
export const ClearCart = () => async (dispatch) => {
  dispatch({ type: "ClearCart" });
};
