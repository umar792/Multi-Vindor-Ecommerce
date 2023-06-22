export const GetSingleShopOwner = (id) => async (dispatch) => {
  try {
    dispatch({ type: "LoadShopOwnerRequest" });
    const res = await fetch(`http://localhost:4000/shop/singleowner/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    dispatch({ type: "ShopOwnerLoadFail" });
    if (res.status === 400 || !data) {
      return console.log(data);
    } else {
      console.log("profile Open");
    }
    dispatch({ type: "ShopOwnerSuccess", payload: data.owner });
  } catch (error) {
    dispatch({ type: "ShopOwnerGetError", payload: Error.message });
  }
};

// ------------------------ create Shop Owner Product

export const CreateShopProduct = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadOwnerCreateProduct" });
  } catch (error) {}
};
