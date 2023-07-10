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

// ----------------- all evensts
export const OwnerAllEvenstGetFunc = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadGetOwnerEvent" });
    const res = await fetch(`http://localhost:4000/event/getOwnerEvents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("shopownerToken"),
      },
    });
    const data = await res.json();
    dispatch({ type: "OwnerEventGetFail" });
    if (res.status === 400 || !data) {
      return console.log(data.message);
    } else {
      //   console.log(");
    }
    dispatch({ type: "GetOwnerEventSuccess", payload: data.ownerEvents });
  } catch (error) {
    dispatch({ type: "OwnerAllEventGetError", payload: Error.message });
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

// ------------------------ create Enent Product

export const CreateEventProduct =
  (
    name,
    description,
    category,
    Tags,
    originalPrice,
    discountPrice,
    stock,
    images,
    startDate,
    endDate,
    setSelect
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: "LoadEventCreateProduct" });
      const res = await fetch(
        "http://localhost:4000/event/createEventProduct",
        {
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
            startDate,
            endDate,
          }),
        }
      );
      const data = await res.json();
      if (res.status === 400 || !data) {
        dispatch({ type: "ShopEventCreateProductFail" });
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        dispatch({ type: "CreateEventProductSuccess" });
        setSelect(3);
      }
    } catch (error) {
      dispatch({ type: "CreateEventProductError", payload: error.message });
    }
  };

// ------------------ delete Eventr by owner

export const deleteEventbyOwner = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteOwnerEventStart" });
    const res = await fetch(
      `http://localhost:4000/event/deleteeventbyOwner/${id}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("shopownerToken"),
        },
      }
    );
    const data = await res.json();
    dispatch({ type: "DeleteOwnerEventFail" });
    if (res.status === 400 || !data) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
      // setSelect(0);
    }
    dispatch({
      type: "DeeleteOwnerEventSuccess",
    });
  } catch (error) {
    dispatch({ type: "DeleteOwnerEventError", payload: Error.message });
  }
};

// ---------------- get all products
export const AllProductsfun = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllProductsDataLoad" });
    const res = await fetch(`http://localhost:4000/product/allProducts`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "getAllProductsDataLoadFail" });
    const data = await res.json();
    dispatch({ type: "getAllProductsDataSuccess", payload: data.products });
  } catch (error) {
    dispatch({
      type: "getAllProductsDataSuccessError",
      payload: error.message,
    });
  }
};

// ---------------- get all Events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllEvenstDataLoad" });
    const res = await fetch(`http://localhost:4000/event/getAllEvents`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "getAllEvenstDataLoadFail" });
    const data = await res.json();
    dispatch({ type: "getAllEvenstDataSuccess", payload: data.products });
  } catch (error) {
    dispatch({
      type: "getAllEvenstDataSuccessError",
      payload: error.message,
    });
  }
};

// ---------------- get all Events
export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getSingleProductDataLoad" });
    const res = await fetch(
      `http://localhost:4000/product/singleProduct/${id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "getSingleProducttDataLoadFail" });
    const data = await res.json();
    dispatch({ type: "getSingleProductDataSuccess", payload: data.product });
  } catch (error) {
    dispatch({
      type: "getSingleProductDataSuccessError",
      payload: error.message,
    });
  }
};
export const getSingleEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getSingleProductDataLoad" });
    const res = await fetch(`http://localhost:4000/event/singleEvent/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: "getSingleProducttDataLoadFail" });
    const data = await res.json();
    dispatch({ type: "getSingleProductDataSuccess", payload: data.product });
  } catch (error) {
    dispatch({
      type: "getSingleProductDataSuccessError",
      payload: error.message,
    });
  }
};
export const createReview = (comment, id) => async (dispatch) => {
  try {
    dispatch({ type: "createReviewDataLoad" });
    const res = await fetch(`http://localhost:4000/product/addreview`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("myecomtoken"),
      },
      body: JSON.stringify({ comment, id }),
    });
    console.log("hello");
    dispatch({ type: "createReviewLoadFail" });
    const data = await res.json();
    console.log(data);
    if (res.status === 400 || !data) {
      return toast.error(data.message);
    } else {
      toast.success(data.message);
    }
    dispatch({ type: "createReviewSuccess" });
  } catch (error) {
    dispatch({
      type: "createReviewSuccessError",
      payload: error.message,
    });
  }
};
