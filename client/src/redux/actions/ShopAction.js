import { toast } from "react-toastify";

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
      return;
    } else {
      console.log("profile Open");
    }
    dispatch({ type: "ShopOwnerSuccess", payload: data.owner });
  } catch (error) {
    dispatch({ type: "ShopOwnerGetError", payload: Error.message });
  }
};

// ------------------------ create Shop Owner Product

export const CreateShopProduct =
  (
    name,
    description,
    category,
    Tags,
    originalPrice,
    discountPrice,
    stock,
    images,
    navigate
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: "LoadOwnerCreateProduct" });
      const res = await fetch("http://localhost:4000/product/createProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("shopownerToken"),
        },
        body: JSON.stringify({
          name,
          description,
          category,
          Tags,
          originalPrice,
          discountPrice,
          stock,
          images,
        }),
      });
      const data = await res.json();
      if (res.status === 400 || !data) {
        dispatch({ type: "ShopOwnerCreateProductFail" });
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        dispatch({ type: "CreateShopOwnerProductSuccess" });
        navigate("/Shop/Owner/Dashboard");
      }
    } catch (error) {
      dispatch({ type: "CreateOwnerProductError", payload: error.message });
    }
  };
