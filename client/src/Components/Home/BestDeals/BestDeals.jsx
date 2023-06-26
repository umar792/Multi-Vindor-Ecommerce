import React, { useState } from "react";
import { productData } from "../../../DataStatic/Data";
import AllProductrView from "../../AllProductView/AllProductrView";
import "./BestDeals.css";
import { useSelector } from "react-redux";
import DashboardAllProductView from "../../SellerPages/SellerDashboard/DashboardAllProductView/DashboardAllProductView";

const BestDeals = () => {
  const AllProductsData = useSelector((state) => state.owner.AllProductsData);
  const sortedData =
    AllProductsData &&
    [...AllProductsData].sort((a, b) => b.sold_out - a.sold_out);
  const sliceData = sortedData && sortedData.slice(0, 5);
  return (
    <div className="BestDeals">
      <h2 className="BestDeals_heading">Best Deals</h2>
      {/* <AllProductrView data={sliceData && sliceData} /> */}
      <DashboardAllProductView data={sliceData} />
    </div>
  );
};

export default BestDeals;
