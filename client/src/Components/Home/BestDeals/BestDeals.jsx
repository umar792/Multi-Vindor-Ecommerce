import React, { useState } from "react";
import { productData } from "../../../DataStatic/Data";
import AllProductrView from "../../AllProductView/AllProductrView";
import "./BestDeals.css";

const BestDeals = () => {
  const d =
    productData && productData.sort((a, b) => b.total_sell - a.total_sell);
  const sliceData = d.slice(0, 5);
  return (
    <div className="BestDeals">
      <h2 className="BestDeals_heading">Best Deals</h2>
      <AllProductrView data={sliceData} />
    </div>
  );
};

export default BestDeals;
