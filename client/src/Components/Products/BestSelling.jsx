import React from "react";
import { productData } from "../../DataStatic/Data";
import AllProductrView from "../AllProductView/AllProductrView";
import { useSelector } from "react-redux";
import DashboardAllProductView from "../SellerPages/SellerDashboard/DashboardAllProductView/DashboardAllProductView";

const BestSelling = () => {
  const AllProductsData = useSelector((state) => state.owner.AllProductsData);
  const SellingProducts =
    AllProductsData &&
    AllProductsData.filter((item) => {
      return item.sold_out > 15;
    });

  console.log(AllProductsData);

  return (
    <>
      <h2 className="text-center font-bold text-3xl my-3">
        Best Selling Products
      </h2>
      <p>Total Prducts: {SellingProducts && SellingProducts.length}</p>
      <DashboardAllProductView data={SellingProducts && SellingProducts} />
    </>
  );
};

export default BestSelling;
