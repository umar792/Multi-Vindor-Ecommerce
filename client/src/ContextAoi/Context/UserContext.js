import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../Reducer/userReducer";
import { toast } from "react-toastify";
import axios from "axios";

const server = "http://localhost:4000";
const initilaValue = {
  loading: false,
  Authanticated: false,
  user: {},
};
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initilaValue);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({ type: "AUTH_SUCCESS", payload: true });
    }
  }, []);

  // ------------------------- login user
  const LoginUser = async (email, password, navigate) => {
    try {
      dispatch({ type: "USER_LOGIN_LOAD" });
      const res = await fetch(`${server}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      dispatch({ type: "USER_LOGIN_LOAD_FAIL" });
      const data = await res.json();
      if (res.status === 400 || !data) {
        return toast.error(data.message);
      } else {
        toast.success(data.message);
        navigate("/");
        localStorage.setItem("token", data.token);
      }
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: data.user });
    } catch (error) {
      dispatch({ type: "USER_LOGIN_ERROR", payload: error.message });
    }
  };

  // -------------------- loadUser Data
  const loadUser = async () => {
    try {
      dispatch({ type: "USER_LOAD" });
      const res = await fetch(`${server}/user/loaduser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      dispatch({ type: "USER_LOAD_FAIL" });
      const data = await res.json();
      if (res.status === 400 || !data) {
        return console.log(data.message);
      } else {
        console.log(data.message);
      }
      dispatch({ type: "USER_LOAD_SUCCESS", payload: data.user });
    } catch (error) {
      dispatch({ type: "USER_LOAD_ERROR", payload: error.message });
    }
  };

  return (
    <UserContext.Provider value={{ ...state, LoginUser, loadUser }}>
      {children}
    </UserContext.Provider>
  );
};

const UseUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserContextProvider, UseUserContext };
