import React, { useState } from "react";
import "./ShopContent.css";
import { UseShopContext } from "../../../../../ContextAoi/Context/ShopContext";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ShopProductView from "../ShopProductView/ShopProductView";
import EventCard from "../../../../Home/Events/EventCard";

const ShopContent = () => {
  const { ShopAuthanticated } = UseShopContext();
  const [select, setSelect] = useState(0);
  const owner = useSelector((state) => state.shop.SingelShopOwner);
  return (
    <div className="ShopContent">
      <div className="shopconetent_header">
        <div className="right_content_shop">
          <p
            onClick={() => setSelect(0)}
            style={select === 0 ? { color: "red" } : { color: "black" }}
          >
            Products
          </p>
          <p
            onClick={() => setSelect(1)}
            style={select === 1 ? { color: "red" } : { color: "black" }}
          >
            Events
          </p>
          <p
            onClick={() => setSelect(2)}
            style={select === 2 ? { color: "red" } : { color: "black" }}
          >
            Reviews
          </p>
        </div>
        <div className="left_content_shop">
          <NavLink to="/Shop/Owner/Dashboard">
            {ShopAuthanticated && <button>Dashboard</button>}
          </NavLink>
        </div>
      </div>
      {/* ------------------------ shop products  */}
      {select === 0 ? (
        owner && owner.products.length > 0 ? (
          <ShopProductView data={owner && owner} />
        ) : (
          <p className="p-4 bg-[gray] mt-4 text-white">
            This Shop has no products
          </p>
        )
      ) : null}
      {/* ----------------------------- events  */}
      {select === 1 ? (
        owner && owner.Events.length > 0 ? (
          owner.Events.map((item) => <EventCard data={item} days={30} />)
        ) : (
          <p className="p-4 bg-[gray] mt-4 text-white">
            This Shop has no Events
          </p>
        )
      ) : null}
    </div>
  );
};

export default ShopContent;
