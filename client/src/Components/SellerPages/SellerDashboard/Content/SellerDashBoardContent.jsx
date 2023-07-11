import React, { useState } from "react";
import "./SellerDashBoardContent.css";
import { UseShopContext } from "../../../../ContextAoi/Context/ShopContext";
import { NavLink } from "react-router-dom";
import CreateProduct from "../CreateProduct/CreateProduct";
import OwnerAllProducts from "../OwnerAllProducts/OwnerAllProducts";
import CreaventEvents from "../CreateEvents/CreaventEvents";
import AllEvents from "../AllOwnerEvents/AllEvents";
import OwnerAllOrder from "../OwnerAllOrder/OwnerAllOrder";
import DashBoardOverView from "./DashBoardOverView/DashBoardOverView";
const SellerDashBoardContent = ({ select, setSelect }) => {
  const { ShopOwner } = UseShopContext();

  return (
    <div className="SellerDashBoardContent">
      <div className="SellerDashBoardContent_header">
        {/* --------- */}
        <h2>
          <p> Welcome to your Dashboard:</p>
          <font> {ShopOwner && ShopOwner.shopName}</font>
        </h2>
        {/* ---------- */}
        <NavLink to={`/shop/${ShopOwner && ShopOwner._id}`}>
          <img src={ShopOwner.avatar && ShopOwner.avatar.url} alt="" />
        </NavLink>
      </div>
      {/* ------------------------------------ dashboard  */}
      {select === 0 ? <DashBoardOverView /> : null}

      {/* ------------------ create Product  */}
      {select === 1 ? <CreateProduct /> : null}

      {/* ---------------------------- owner all products  */}
      {select === 2 ? (
        <OwnerAllProducts select={select} setSelect={setSelect} />
      ) : null}
      {/* ---------------------------- Create Events  */}
      {select === 5 ? (
        <CreaventEvents select={select} setSelect={setSelect} />
      ) : null}
      {/* --------------------------- dashboard all Event  */}
      {select === 4 ? <AllEvents /> : null}
      {/* ------------------ AllOrders  */}
      {select === 3 ? <OwnerAllOrder /> : null}
    </div>
  );
};

export default SellerDashBoardContent;
