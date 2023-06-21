import React, { createContext, useContext, useReducer } from "react";
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

  return (
    <ShopContext.Provider value={{ ...state, LoginUser }}>
      {children}
    </ShopContext.Provider>
  );
};

const UseShopContext = () => {
  return useContext(ShopContext);
};

export { ShopContext, ShopContextPrpvider, UseShopContext };
