// ------ load User

import server from "../server";

export const LoadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });
    const res = await fetch(`${server}/user/loaduser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    dispatch({ type: "LoadUserFail" });
    const data = await res.json();
    if (res.status === 400 || !data) {
      return console.log(data.message);
    } else {
      console.log(data.message);
    }
    dispatch({ type: "LoadUserSuccess", payload: data.user });
  } catch (error) {
    dispatch({ type: "LoadUserError", payload: error.message });
  }
};
