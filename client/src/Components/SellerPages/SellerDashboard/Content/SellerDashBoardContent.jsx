import React from "react";
import "./SellerDashBoardContent.css";
import { UseShopContext } from "../../../../ContextAoi/Context/ShopContext";
import { NavLink } from "react-router-dom";

const SellerDashBoardContent = () => {
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
    </div>
  );
};

export default SellerDashBoardContent;
