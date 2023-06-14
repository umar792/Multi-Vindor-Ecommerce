import React from "react";
import { productData } from "../../DataStatic/Data";
import AllProductrView from "../AllProductView/AllProductrView";

const BestSelling = () => {
  const SellingProducts = productData.filter((item) => {
    return item.total_sell > 30;
  });
  return (
    <>
      <h2 className="text-center font-bold text-3xl my-3">
        Best Selling Products
      </h2>
      <p>Total Prducts: {SellingProducts && SellingProducts.length}</p>
      <AllProductrView data={SellingProducts && SellingProducts} />
    </>
  );
};

export default BestSelling;
