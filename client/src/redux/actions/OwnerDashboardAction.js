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
