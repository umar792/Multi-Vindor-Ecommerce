import React from "react";
import "./ShopSidebar.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UseShopContext } from "../../../../../ContextAoi/Context/ShopContext";

const ShopSidebar = () => {
  const owner = useSelector((state) => state.shop.SingelShopOwner);
  const { ShopAuthanticated } = UseShopContext();

  return (
    <div className="shopSidebar">
      <NavLink to="/">
        <button>Home</button>
      </NavLink>
      <div className="sidebar_conent">
        <img src={owner && owner.avatar && owner.avatar.url} alt="" />
        <p>
          Adress <span>{owner && owner.Adress}</span>
        </p>
        <p>
          Mobile Number <span>{owner && owner.number}</span>
        </p>
        <p>
          Total Products <span>{owner && owner.products.length}</span>
        </p>
        <p>
          Joined on <span>{owner && owner.createdAt.slice(0, 10)}</span>
        </p>
        {ShopAuthanticated && (
          <>
            <button className="shop_btn">Edit Shop</button>
            <button className="shop_btn">Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopSidebar;
