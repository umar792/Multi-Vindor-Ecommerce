import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleShopOwner } from "../../../../redux/actions/ShopAction";
import { useParams } from "react-router-dom";
import ShopSidebar from "./ShopSidebar/ShopSidebar";
import ShopContent from "./ShopContent/ShopContent";
import "./Shop.css";

const Shop = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetSingleShopOwner(id));
  }, []);

  const owner = useSelector((state) => state.shop.SingelShopOwner);
  // console.log(owner);

  return (
    <div className="Shop">
      <div>
        <ShopSidebar />
      </div>
      <div>
        <ShopContent />
      </div>
    </div>
  );
};

export default Shop;
