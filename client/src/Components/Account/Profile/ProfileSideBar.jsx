import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UseUserContext } from "../../../ContextAoi/Context/UserContext";
import {
  AiFillHome,
  AiFillProfile,
  AiFillWechat,
  AiOutlineLogout,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdPassword } from "react-icons/md";

const ProfileSideBar = ({ showProfiletoggle, setShowProfile }) => {
  const { Logout } = UseUserContext();
  const navigate = useNavigate();
  const logoutuser = () => {
    Logout(navigate);
  };
  return (
    <div className={"sidebar"}>
      <ul className="com_menu">
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
        <NavLink to="/user/change/password">
          <li>Change Password</li>
        </NavLink>
        {/* <li>Adress</li> */}
        <li onClick={logoutuser}>Logout</li>
        {/* <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li> */}
      </ul>
      {/* --------------------- mob menus  */}
      <ul className="mob_menu">
        <NavLink to="/">
          <AiFillHome />
        </NavLink>
        <NavLink to="/profile">
          <AiFillProfile />
        </NavLink>
        <NavLink to="/user/order">
          <BsFillBagCheckFill />
        </NavLink>
        <AiFillWechat />
        <NavLink to="/user/change/password">
          <MdPassword />{" "}
        </NavLink>
        {/* <li>Adress</li> */}
        <AiOutlineLogout onClick={logoutuser} />
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
