import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/ShopReducer";
import { toast } from "react-toastify";

const ShopContext = createContext();

const initialValue = {
  shopLoading: false,
  ShopAuthanticated: false,
  ShopOwner: {},
  ERROR: "",
};

const ShopContextPrpvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    const token = localStorage.getItem("shopownerToken");
    if (token) {
      dispatch({ type: "AUTH_SUCCESS_Shop", payload: true });
    }
  }, []);

  //   ----------------------- login User
  const LoginUser = async (email, password, navigate) => {
    try {
      dispatch({ type: "SHOP_OWNEER_LOGIN_LOAD" });
      const res = await fetch("http://localhost:4000/shop/logintoshop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      dispatch({ type: "SHOP_OWNEER_LOGIN_LOAD_FETCH_ERROR" });
      const data = await res.json();
      if (res.status === 400 || !data) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        localStorage.setItem("shopownerToken", data.Token);
        navigate("/Shop/Owner/Dashboard");
      }
      dispatch({ type: "SHOP_OWNER_LOGIN_SUCCESS", payload: data.ShopOwner });
    } catch (error) {
      dispatch({ type: "SHOP_OWNER_LOGIN_ERROR", payload: error.message });
    }
  };

  // ---------------- get ShopOwner
  const getOwner = async () => {
    try {
      dispatch({ type: "SHOP_OWNEER_GET_LOAD" });
      const res = await fetch("http://localhost:4000/shop/ShowOwner", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("shopownerToken"),
        },
      });
      dispatch({ type: "SHOP_OWNEER_GET_LOAD_FETCH_ERROR" });
      const data = await res.json();
      if (res.status === 400 || !data) {
        return;
      } else {
      }
      dispatch({ type: "SHOP_OWNER_GET_SUCCESS", payload: data.owner });
    } catch (error) {
      dispatch({ type: "SHOP_OWNER_GET_ERROR", payload: error.message });
    }
  };

  return (
    <ShopContext.Provider value={{ ...state, LoginUser, getOwner }}>
      {children}
    </ShopContext.Provider>
  );
};

const UseShopContext = () => {
  return useContext(ShopContext);
};

export { ShopContext, ShopContextPrpvider, UseShopContext };
