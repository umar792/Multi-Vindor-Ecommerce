import React from "react";
import "./SellerDashBoardSidebar.css";
import { NavLink } from "react-router-dom";
import {
  MdCreateNewFolder,
  MdOutlineEmojiEvents,
  MdDashboard,
} from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { AiOutlineDropbox, AiOutlineSetting } from "react-icons/ai";
import { FaGifts } from "react-icons/fa";
import { AiFillHome, AiFillWechat } from "react-icons/ai";

const menus = [
  {
    id: 1,
    title: "Dashboard",
    path: "Shop/Owner/Dashboard",
    icon: <MdDashboard />,
  },
  {
    id: 2,
    title: "Create Product",
    path: "Shop/Owner/Dashboard/CreateProduct",
    icon: <MdCreateNewFolder />,
  },
  {
    id: 3,
    title: "All Products",
    path: "Shop/Owner/Dashboard/Allproducts",
    icon: <FiShoppingBag />,
  },
  {
    id: 4,
    title: "All Orders",
    path: "Shop/Owner/Dashboard/Allorders",
    icon: <AiOutlineDropbox />,
  },

  {
    id: 5,
    title: "All Events",
    path: "Shop/Owner/Dashboard/Allevents",
    icon: <MdOutlineEmojiEvents />,
  },
  {
    id: 6,
    title: "Create Event",
    path: "Shop/Owner/Dashboard/createevent",
    icon: <MdCreateNewFolder />,
  },
  {
    id: 7,
    title: "Dicounts Codes",
    path: "Shop/Owner/Dashboard/discountcodes",
    icon: <FaGifts />,
  },
  {
    id: 8,
    title: "Chat",
    path: "Shop/Owner/Dashboard/settings",
    icon: <AiFillWechat />,
  },
];

const SellerDashBoardSidebar = ({ select, setSelect }) => {
  return (
    <div className="SellerDashBoardSidebar">
      <NavLink to="/" className="flex align-middle home_dash">
        {/* <button>Home</button> */}
        <AiFillHome className="text-2xl ml-[10px] mb-3" />
        <span className="ml-2">Home</span>
      </NavLink>

      {/* ------------- menus  */}
      <ul>
        {menus.map((item, index) => {
          return (
            <div
              className="dashoard_menus"
              key={item.id}
              onClick={() => setSelect(index)}
            >
              <div
                className="dash_menus_item cursor-pointer"
                style={select === index ? { color: "red" } : { color: "black" }}
              >
                <p>{item.icon}</p>
                <li>{item.title}</li>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default SellerDashBoardSidebar;
