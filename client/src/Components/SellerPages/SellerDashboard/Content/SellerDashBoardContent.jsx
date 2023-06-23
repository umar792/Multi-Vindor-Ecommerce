import React from "react";
import "./SellerDashBoardContent.css";
import { UseShopContext } from "../../../../ContextAoi/Context/ShopContext";
import { NavLink } from "react-router-dom";
import CreateProduct from "../CreateProduct/CreateProduct";
import OwnerAllProducts from "../OwnerAllProducts/OwnerAllProducts";

const SellerDashBoardContent = ({ select, setSelect }) => {
  const { ShopOwner } = UseShopContext();
  return (
    <div className="SellerDashBoardContent">
      <div className="SellerDashBoardContent_header">
        {/* --------- */}
        <h2>
          Welcome to your Dashboard:
          <font> {ShopOwner && ShopOwner.shopName}</font>
        </h2>
        {/* ---------- */}
        <NavLink to={`/shop/${ShopOwner && ShopOwner._id}`}>
          <img src={ShopOwner.avatar && ShopOwner.avatar.url} alt="" />
        </NavLink>
      </div>
      {/* ------------------------------------ dashboard  */}
      {select === 0 ? "Dashboard" : null}

      {/* ------------------ create Product  */}
      {select === 1 ? <CreateProduct /> : null}

      {/* ---------------------------- owner all products  */}
      {select === 2 ? <OwnerAllProducts /> : null}
    </div>
  );
};

export default SellerDashBoardContent;
