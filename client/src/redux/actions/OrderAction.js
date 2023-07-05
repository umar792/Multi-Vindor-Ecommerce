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
