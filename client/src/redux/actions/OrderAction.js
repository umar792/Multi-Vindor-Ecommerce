// ----------------- create Order

import { toast } from "react-toastify";

export const CreateOrder = (orderData, setSelect) => async (dispatch) => {
  try {
    dispatch({ type: "OrderItemLoad" });
    const res = await fetch("http://localhost:4000/order/createOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("myecomtoken"),
      },
      body: JSON.stringify(orderData),
    });
    dispatch({ type: "OrderItemLoadFail" });
    const data = await res.json();
    if (res.status === 400 || !data) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
      setSelect(2);
    }

    dispatch({ type: "OrderItemSuccess" });
  } catch (error) {
    dispatch({ type: "OrderItemERROR", payload: error.message });
  }
};

// --------------------- get login user order

export const LoginUserOrder = () => async (dispatch) => {
  try {
    console.log("umar");
    dispatch({ type: "GetUserOrderLoad" });
    const res = await fetch("http://localhost:4000/order/userOrder", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("myecomtoken"),
      },
    });
    dispatch({ type: "GetUserOrderLoadFail" });
    const data = await res.json();
    console.log(data);
    console.log('data');
    if (res.status === 400 || !data) {
      return
    } else {
      dispatch({ type: "getUserOrderSuccess", payload: data.userOrder });
    }
  } catch (error) {
    dispatch({ type: "getUserOrderError", payload: error.message });
  }
};

// ----------------------- get single Order Data

export const SingleOrderFunc = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GetSingleOrderLoad" });
    const res = await fetch(
      `http://localhost:4000/order/user/single/order/${id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("myecomtoken"),
        },
      }
    );
    dispatch({ type: "GetSingleOrderLoadFail" });
    const data = await res.json();
    if (res.status === 400 || !data) {
      return toast.error(data.message);
    } else {
      dispatch({ type: "GetSingleOrderSuccess", payload: data.order });
    }
  } catch (error) {
    dispatch({ type: "GetSingleOrderError", payload: error.message });
  }
};
