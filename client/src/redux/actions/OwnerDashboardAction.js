import { toast } from "react-toastify";

export const OwnerAllProductsGetFunc = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadGetOwnerProducts" });
    const res = await fetch(`http://localhost:4000/product/getOwnerProducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("shopownerToken"),
      },
    });
    const data = await res.json();
    dispatch({ type: "OwnerProductsGetFail" });
    if (res.status === 400 || !data) {
      return console.log(data.message);
    } else {
      //   console.log(");
    }
    dispatch({ type: "GetOwnerProductSuccess", payload: data.ownerProducts });
  } catch (error) {
    dispatch({ type: "OwnerAllProductsGetError", payload: Error.message });
  }
};

// ------------------ delete product by owner

export const deleteproductbyOwnerredux =
  (id, navigate, setSelect) => async (dispatch) => {
    try {
      dispatch({ type: "DeleteOwnerProductStart" });
      const res = await fetch(
        `http://localhost:4000/product/deleteproductbyOwner/${id}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("shopownerToken"),
          },
        }
      );
      const data = await res.json();
      dispatch({ type: "DeleteOwnerProductFail" });
      if (res.status === 400 || !data) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        // navigate("/Shop/Owner/Dashboard");
        setSelect(0);
      }
      dispatch({
        type: "DeeleteOwnerProductSuccess",
      });
    } catch (error) {
      dispatch({ type: "DeleteOwnerProductError", payload: Error.message });
    }
  };
