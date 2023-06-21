import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UseUserContext } from "../../../ContextAoi/Context/UserContext";
import { RxCross1 } from "react-icons/rx";

const ProfileSideBar = ({ showProfiletoggle, setShowProfile }) => {
  const { Logout } = UseUserContext();
  const navigate = useNavigate();
  const logoutuser = () => {
    Logout(navigate);
  };
  return (
    <div className={showProfiletoggle ? "sidebar sidebar_mob" : "sidebar"}>
      <RxCross1 onClick={() => setShowProfile(false)} />
      <ul>
        <NavLink to="/">
          <button
            style={{
              marginBottom: "10px",
              backgroundColor: "black",
              color: "white",
              padding: "7px 30px",
            }}
          >
            Home
          </button>
        </NavLink>
        <NavLink to="/profile">
          <li>Account</li>
        </NavLink>
        <NavLink to="/user/order">
          <li>Orders</li>
        </NavLink>
        <li>Chat</li>
        {/* <li>Adress</li> */}
        <li onClick={logoutuser}>Logout</li>
        {/* <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li> */}
      </ul>
    </div>
  );
};

export default ProfileSideBar;
